package controllers

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type Results struct {
	ID                  string  `json:"id"`
	DisplayImage        string  `json:"display_image"`
	OrganizerName       *string `json:"organizer_name,omitempty"`       // Can be NULL in some queries
	BusinessName        *string `json:"business_name,omitempty"`        // For businesses
	Name                *string `json:"name,omitempty"`                 // For media
	Description         *string `json:"description,omitempty"`          // For media, businesses, resources
	DescriptionHeadline *string `json:"description_headline,omitempty"` // Headline version
	Location            *string `json:"location,omitempty"`             // Optional location
	Date                *string `json:"date,omitempty"`                 // Date can be NULL
	Time                *string `json:"time,omitempty"`                 // Time can be NULL
	Website             *string `json:"website,omitempty"`              // Optional website
	Type                *string `json:"type,omitempty"`                 // For events and resources
	Tag                 *string `json:"tag,omitempty"`                  // For media tag
	ServiceType         *string `json:"service_type,omitempty"`         // For businesses
	Email               *string `json:"email,omitempty"`                // Optional email
	PhoneNumber         *string `json:"phone_number,omitempty"`         // Optional phone number
	Rank                string  `json:"rank"`                           // Rank as a string
}

//search whole database

// http://localhost:3000/event/search?query=pride%20in%20cincinnati

func HomeSearch(c *gin.Context) {
	// should bind query

	queryParam := c.Query("query") //change event to something more default

	if err := c.ShouldBindQuery(queryParam); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"message": "Error Binding Query",
		})
		return
	}

	//open database connection
	pool, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal("Error opening database connection")
	}

	defer pool.Close()

	ctx := context.Background()

	var results Results

	query := `WITH events_query AS (
    SELECT
        id, 
        display_image::text, 
        organizer_name, 
        ts_headline(description, q) AS description_headline, 
        location, 
        date::text AS date,
        time::text AS time,
        website, 
        type,
        ts_rank(tsv, q)::text AS rank,
        NULL AS email,
        NULL AS phone_number
    FROM
        events, websearch_to_tsquery('` + queryParam + `') q
    WHERE
        tsv @@ q
    ORDER BY
        ts_rank(tsv, q) DESC
    LIMIT 
        10
),
media_query AS (
    SELECT
        id, 
        name,
        display_image::text,  
        ts_headline(description, q) AS description_headline, 
        website,
        description,
        tag, 
        NULL::text AS date,
        NULL::text AS date_2,
        NULL::text AS time,
        NULL::text AS time_2,
        ts_rank(tsv, q)::text AS rank
    FROM
        media, websearch_to_tsquery('` + queryParam + `') q
    WHERE
        tsv @@ q
    ORDER BY
        ts_rank(tsv, q) DESC
    LIMIT 
        10
),
businesses_query AS (
    SELECT
        id, 
        display_image::text,  
        business_name,
        ts_headline(description, q) AS description_headline, 
        location,
        website,
        service_type,
        email, 
        phone_number,
        NULL::text AS date,
        NULL::text AS time,
        ts_rank(tsv, q)::text AS rank
    FROM
        businesses, websearch_to_tsquery('` + queryParam + `') q
    WHERE
        tsv @@ q
    ORDER BY
        ts_rank(tsv, q) DESC
    LIMIT 
        10
),
resources_query AS (
    SELECT
        id, 
        display_image::text, 
        org_name AS organizer_name, 
        ts_headline(description, q) AS description_headline, 
        location, 
        NULL::text AS date,
        NULL::text AS time,
        website, 
        type,
        ts_rank(tsv, q)::text AS rank,
        email,
        phone_number
    FROM
        resources, websearch_to_tsquery('` + queryParam + `') q
    WHERE
        tsv @@ q
    ORDER BY
        ts_rank(tsv, q) DESC
    LIMIT 
        10
)
SELECT * FROM (
    SELECT * FROM events_query
    UNION ALL
    SELECT * FROM media_query
    UNION ALL
    SELECT * FROM businesses_query
    UNION ALL
    SELECT * FROM resources_query
) combined_results
ORDER BY rank::real DESC
LIMIT 10;`
	fmt.Println(query)

	row := pool.QueryRowContext(ctx, query)

	// map onto database
	err = row.Scan(&results.ID, &results.DisplayImage,
		&results.OrganizerName, &results.Description,
		&results.Location, &results.Website,
		&results.TSV, &results.Type)
	if err != nil {
		if err == sql.ErrNoRows {
			c.IndentedJSON(http.StatusNotFound, gin.H{
				"message": "No results found with this query",
			})
		} else {
			log.Printf("Error scanning row: %v", err)
			c.IndentedJSON(http.StatusInternalServerError, gin.H{
				"error": "Error retrieving result",
			})
		}
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{
		"Result Found": results,
	})
}

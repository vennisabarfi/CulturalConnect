package controllers

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

// omitempty will ensure null values can be accomodated
type Results struct {
	ID                  string         `json:"id"`
	DisplayImage        sql.NullString `json:"display_image"`
	OrganizerName       *string        `json:"organizer_name,omitempty"`
	Name                *string        `json:"name,omitempty"` // For media and businesses
	Description         *string        `json:"description,omitempty"`
	DescriptionHeadline *string        `json:"description_headline,omitempty"`
	Location            *string        `json:"location,omitempty"`
	Date                *string        `json:"date,omitempty"`
	Time                *string        `json:"time,omitempty"`
	Website             *string        `json:"website,omitempty"`
	Type                *string        `json:"type,omitempty"`
	Tag                 *string        `json:"tag,omitempty"`          // For media
	ServiceType         *string        `json:"service_type,omitempty"` // For businesses
	Email               *string        `json:"email,omitempty"`
	PhoneNumber         *string        `json:"phone_number,omitempty"`
	Rank                string         `json:"rank"` // Rank as a string
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

	// ctx := context.Background()

	query := `WITH events_query AS (
    SELECT
        id,
        display_image::text,
        organizer_name,
        description,
        ts_headline(description, q) AS description_headline,       
        location,
        date::text AS date,
        time::text AS time,
        website,
        type,
        ts_rank(tsv, q)::text AS rank,
        NULL AS email,
        NULL AS phone_number,
        NULL::text AS name,     -- Added to match other queries
        NULL::text AS tag,      -- Added to match media query
        NULL::text AS service_type -- Added to match businesses query
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
        display_image::text,
        NULL::text AS organizer_name,
        description,
        ts_headline(description, q) AS description_headline,       
        NULL::text AS location,
        NULL::text AS date,
        NULL::text AS time,
        website,
        NULL::text AS type,
        ts_rank(tsv, q)::text AS rank,
        NULL::text AS email,
        NULL::text AS phone_number,
        name,
        tag,
        NULL::text AS service_type -- Added to match businesses query
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
        NULL::text AS organizer_name,
        description,
        ts_headline(description, q) AS description_headline,       
        location,
        NULL::text AS date,
        NULL::text AS time,
        website,
        NULL::text AS type,
        ts_rank(tsv, q)::text AS rank,
        email,
        phone_number,
        business_name AS name,  -- Renamed to match other queries
        NULL::text AS tag,
        service_type
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
        description,
        ts_headline(description, q) AS description_headline,       
        location,
        NULL::text AS date,
        NULL::text AS time,
        website,
        type,
        ts_rank(tsv, q)::text AS rank,
        email,
        phone_number,
        NULL::text AS name,    -- Added to match other queries
        NULL::text AS tag,     -- Added to match media query
        NULL::text AS service_type -- Added to match businesses query
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
LIMIT 10;
`
	// fmt.Println(query)

	rows, err := pool.Query(query) //uses ctx internally

	if err != nil {
		print(err)
	}
	defer rows.Close()

	//initialize array of resources
	var results []Results

	// map onto database
	for rows.Next() {
		var result Results
		if err := rows.Scan(
			&result.ID,
			&result.DisplayImage,
			&result.OrganizerName,
			&result.Description,
			&result.DescriptionHeadline,
			&result.Location,
			&result.Date,
			&result.Time,
			&result.Website,
			&result.Type,
			&result.Rank,
			&result.Email,
			&result.PhoneNumber,
			&result.Name,
			&result.Tag,
			&result.ServiceType); err != nil {
			c.IndentedJSON(http.StatusBadRequest, gin.H{
				"Error retrieving results": err,
			})
			log.Print("Error retrieving results from database", err)
			return
		}
		results = append(results, result)
	}
	if err == sql.ErrNoRows {
		c.IndentedJSON(http.StatusNotFound, gin.H{
			"message": "No results found",
		})
	}
	c.IndentedJSON(http.StatusOK, gin.H{
		"Results Found": results,
	})
}

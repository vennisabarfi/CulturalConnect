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

	var event Events

	query := `SELECT 
    id, 
    display_image, 
    organizer_name, 
    ts_headline(description, q) AS description_headline, 
    location, 
    date, 
    time, 
    website, 
    type, 
    rank
FROM (
    SELECT
        id, 
        display_image, 
        organizer_name, 
        description, 
        location, 
        date, 
        time, 
        website, 
        ts_rank(tsv, q) AS rank, 
        type, 
        q
    FROM
        events, websearch_to_tsquery('` + queryParam + `') q
    WHERE
        tsv @@ q
    ORDER BY
        rank DESC
    LIMIT 
        10
) AS subquery;`
	fmt.Println(query)

	row := pool.QueryRowContext(ctx, query)

	// map onto database
	err = row.Scan(&event.ID, &event.DisplayImage,
		&event.OrganizerName, &event.Description,
		&event.Location, &event.Date, &event.Time, &event.Website,
		&event.TSV, &event.Type)
	if err != nil {
		if err == sql.ErrNoRows {
			c.IndentedJSON(http.StatusNotFound, gin.H{
				"message": "No event found with this query",
			})
		} else {
			log.Printf("Error scanning row: %v", err)
			c.IndentedJSON(http.StatusInternalServerError, gin.H{
				"error": "Error retrieving event",
			})
		}
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{
		"Event Found": event,
	})
}

package controllers

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
)

type Events struct {
	ID            int64          `json:"id"`
	DisplayImage  sql.NullString `json:"display_image"`
	OrganizerName string         `json:"organizer_name"`
	Description   string         `json:"description"`
	Location      string         `json:"location"`
	Date          string         `json:"date"`
	Time          string         `json:"time"`
	Website       string         `json:"website"`
	CreatedAt     string         `json: created_at`
	DeletedAt     string         `json: deleted_at`
	Type          string         `json: type`
	TSV           string         `json:tsv` //tsv vector for search
}

// var pool *sql.DB

// parse date handler for database format
func ParseDate(dateStr string) (time.Time, error) {
	return time.Parse("2006-01-02", dateStr)

}

// parse time handler for database format
func ParseTime(timeStr string) (time.Time, error) {
	return time.Parse("15:04", timeStr)

}

// insert an event
func InsertEvent(c *gin.Context) {
	var body struct {
		DisplayImage  sql.NullString `json:"display_image"`
		OrganizerName string         `json:"organizer_name" binding:"required"`
		Description   string         `json:"description" binding:"required"`
		Location      string         `json:"location" binding:"required"`
		Date          string         `json:"date" binding:"required"`
		Time          string         `json:"time" binding:"required"`
		Website       string         `json:"website"`
		Type          string         `json:"type"`
		TSV           string         `json:"tsv"`
	}

	// if error with fields

	if err := c.ShouldBindJSON(&body); err != nil {
		log.Fatal("Error binding data: ", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"Error Binding JSON Data": err,
		})
		return
	}

	event := Events{
		DisplayImage:  body.DisplayImage,
		OrganizerName: body.OrganizerName,
		Description:   body.Description,
		Location:      body.Location,
		Date:          body.Date,
		Time:          body.Time,
		Website:       body.Website,
		Type:          body.Type,
		TSV:           body.TSV,
	}

	//parse event date and time in correct format for postgres database
	parsedEventDate, err := ParseDate(body.Date)
	if err != nil {
		log.Fatal("Error parsing event date: ", err)
	}

	parsedEventTime, err := ParseTime(body.Time)
	if err != nil {
		log.Fatal("Error parsing event time: ", err)
	}

	//open database connection
	pool, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal("Error opening database connection")
	}

	defer pool.Close()

	ctx := context.Background()

	query := "INSERT INTO events (display_image, organizer_name, description, location, date, time, website) VALUES($1, $2, $3, $4, $5, $6, $7) Returning ID"

	err = pool.QueryRowContext(ctx, query, event.DisplayImage, event.OrganizerName, event.Description, event.Location, parsedEventDate, parsedEventTime, event.Website).Scan(&event.ID) //due to auto increment

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"Error inserting new event": err,
		})
		log.Print("Error inserting new event", err)
		return

	} else {
		fmt.Println("Inserting event information into database...")

		c.IndentedJSON(http.StatusOK, gin.H{
			"message":              "Resource added successfully",
			"resource information": event,
		})
	}
}

// view all events
func ViewEvent(c *gin.Context) {

	//open database connection
	pool, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal("Error opening database connection")
	}

	defer pool.Close()

	query := "SELECT * FROM events"

	rows, err := pool.Query(query) //uses ctx internally
	if err != nil {
		print(err)
	}
	defer rows.Close()

	//initialize array of events
	var events []Events

	// Loop through rows. finds memory address and map onto databases
	for rows.Next() {
		var event Events
		if err := rows.Scan(&event.ID, &event.DisplayImage,
			&event.OrganizerName, &event.Description,
			&event.Location, &event.Date, &event.Time, &event.Website,
			&event.CreatedAt,
			&event.DeletedAt, &event.Type, &event.TSV); err != nil {
			c.IndentedJSON(http.StatusBadRequest, gin.H{
				"Error retrieving events": err,
			})
			log.Print("Error retrieving events from database", err)
			return
		}
		events = append(events, event) // append results to events array
	}
	if err == sql.ErrNoRows {
		c.IndentedJSON(http.StatusNotFound, gin.H{
			"message": "No events found",
		})
	}
	c.IndentedJSON(http.StatusOK, gin.H{
		"Events Found": events,
	})

}

// home page event handler
func ViewTopEvent(c *gin.Context) {

	//open database connection
	pool, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal("Error opening database connection", err)
	}

	defer pool.Close()

	rows, err := pool.Query("SELECT * FROM events ORDER BY created_at DESC LIMIT 3") //uses ctx internally
	if err != nil {
		print(err)
	}
	defer rows.Close()

	//initialize array of events
	var events []Events

	// Loop through rows. finds memory address and map onto databases
	for rows.Next() {
		var event Events
		if err := rows.Scan(&event.ID, &event.DisplayImage,
			&event.OrganizerName, &event.Description,
			&event.Location, &event.Date, &event.Time, &event.Website,
			&event.CreatedAt,
			&event.DeletedAt, &event.Type, &event.TSV); err != nil {
			c.IndentedJSON(http.StatusBadRequest, gin.H{
				"Error retrieving events": err,
			})
			log.Print("Error retrieving events from database", err)
			return
		}
		events = append(events, event) // append results to events array
	}
	if err == sql.ErrNoRows {
		c.IndentedJSON(http.StatusNotFound, gin.H{
			"message": "No events found",
		})
	}
	c.IndentedJSON(http.StatusOK, gin.H{
		"Top Events Found": events,
	})

}

// Search for events
// http://localhost:3000/event/search?query=pride%20in%20cincinnati
func SearchEvent(c *gin.Context) {
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

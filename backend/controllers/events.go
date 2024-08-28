package controllers

import (
	"bytes"
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
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
			&event.DeletedAt); err != nil {
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

	ctx := context.Background()

	// begin transactions
	tx, err := pool.BeginTx(ctx, nil)
	if err != nil {
		log.Fatal("Error initializing transaction", err)
	}

	//defer rollback in case stuff fails
	defer tx.Rollback()

	//retrieve number of rows in events table
	query_1 := "SELECT COUNT(*) FROM events"
	var count int

	err = tx.QueryRow(query_1).Scan(&count) //uses ctx internally
	if err != nil {
		log.Fatal("Error retrieving number of rows: ", err)
	}

	fmt.Println("Number of rows: ", count)

	//top three ids (recent) -- make this more efficient.
	ID_1 := count
	ID_2 := count - 1
	ID_3 := count - 2

	println("ID Numbers", ID_1, ID_2, ID_3)

	//create a list of IDs
	IDS := []int{ID_1, ID_2, ID_3}
	fmt.Printf("%v", IDS)

	//concatenate list of IDS to sql query
	var buffer bytes.Buffer
	//begin query
	buffer.WriteString("SELECT * FROM events WHERE ID IN (")

	//loop over IDS and append to buffer
	for i, id := range IDS {
		if i > 0 {
			buffer.WriteString(",") //comma separator in array
		}
		buffer.WriteString(strconv.Itoa(id)) //convert string to int
	}

	//End of SQL query
	buffer.WriteString(")")

	// convert to string for database
	query_2 := buffer.String()

	fmt.Println(query_2)

	rows, err := pool.Query(query_2) //uses ctx internally
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
			&event.DeletedAt); err != nil {
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

	// c.IndentedJSON(http.StatusOK, gin.H{
	// 	"Number of rows:": count,
	// })

}

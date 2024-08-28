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
	Date          time.Time      `json:"date"`
	Time          time.Time      `json:"time"`
	Website       string         `json:"website"`
	CreatedAt     string         `json: created_at`
	DeletedAt     string         `json: deleted_at`
}

// var pool *sql.DB

func InsertEvent(c *gin.Context) {
	var body struct {
		DisplayImage  sql.NullString `json:"display_image"`
		OrganizerName string         `json:"organizer_name" binding:"required"`
		Description   string         `json:"description" binding:"required"`
		Location      string         `json:"location" binding:"required"`
		Date          time.Time      `json:"date" binding:"required"`
		Time          time.Time      `json:"time" binding:"required"`
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

	//open database connection
	pool, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal("Error opening database connection")
	}

	defer pool.Close()

	ctx := context.Background()

	query := "INSERT INTO events (display_image, organizer_name, description, location, date, time, website) VALUES($1, $2, $3, $4, $5, $6, $7) Returning ID"

	err = pool.QueryRowContext(ctx, query, event.DisplayImage, event.OrganizerName, event.Description, event.Location, event.Date, event.Time, event.Website).Scan(&event.ID) //due to auto increment

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

func ViewEvent(c *gin.Context) {

}

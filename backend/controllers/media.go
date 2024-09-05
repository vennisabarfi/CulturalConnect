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

type Media struct {
	ID           int64          `json:"id"`
	Name         string         `json:"name"`
	DisplayImage sql.NullString `json:"display_image"`
	Website      string         `json:"website"`
	Description  string         `json:"description"`
	Tag          string         `json:"tag"`
	CreatedAt    string         `json: created_at`
	DeletedAt    string         `json: deleted_at`
}

func InsertMedia(c *gin.Context) {
	var body struct {
		Name         string         `json:"name" binding:"required"`
		DisplayImage sql.NullString `json:"display_image"`
		Website      string         `json:"website" binding:"required"`
		Description  string         `json:"description" binding:"required"`
		Tag          string         `json:"tag" binding:"required"`
	}

	// if error with fields

	if err := c.ShouldBindJSON(&body); err != nil {
		log.Fatal("Error binding data: ", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"Error Binding JSON Data": err,
		})
		return
	}

	media := Media{
		Name:         body.Name,
		DisplayImage: body.DisplayImage,
		Website:      body.Website,
		Description:  body.Description,
		Tag:          body.Tag,
	}

	//open database connection
	pool, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal("Error opening database connection")
	}

	defer pool.Close()

	ctx := context.Background()

	query := "INSERT INTO media (name, display_image, website, description, tag) VALUES($1, $2, $3, $4, $5) Returning ID"

	err = pool.QueryRowContext(ctx, query, media.Name, media.DisplayImage, media.Website, media.Description, media.Tag).Scan(&media.ID) //due to auto increment

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"Error inserting new media": err,
		})
		log.Print("Error inserting new media", err)
		return

	} else {
		fmt.Println("Inserting media information into database...")

		c.IndentedJSON(http.StatusOK, gin.H{
			"message":           "media added successfully",
			"media information": media,
		})
	}
}

// view media by tag
//
//	link: http://localhost:3000/media/view/shows
//can also filter podcasts and movies

func ViewMediaByTag(c *gin.Context) {

	//tag parameter. add error handling
	tagParam := c.Param("tag")
	// if err != nil {
	// 	c.IndentedJSON(http.StatusBadRequest, gin.H{
	// 		"message": "Invalid media parameter/tag",
	// 	})
	// 	return
	// }

	//open database connection
	pool, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal("Error opening database connection")
	}

	defer pool.Close()

	query := "SELECT * FROM media WHERE tag = $1"

	// ctx := context.Background()

	rows, err := pool.Query(query, tagParam) //uses ctx internally
	if err != nil {
		print(err)
	}
	defer rows.Close()

	//initialize array of media (ignore the bad spelling lol)
	var medias []Media

	// Loop through rows. finds memory address and map onto databases
	for rows.Next() {
		var media Media
		if err := rows.Scan(&media.ID, &media.Name, &media.DisplayImage,
			&media.Website, &media.Description,
			&media.Tag, &media.CreatedAt,
			&media.DeletedAt); err != nil {
			c.IndentedJSON(http.StatusBadRequest, gin.H{
				"Error retrieving medias": err,
			})
			log.Print("Error retrieving medias from database", err)
			return
		}
		medias = append(medias, media) // append results to medias array
	}
	if err == sql.ErrNoRows {
		c.IndentedJSON(http.StatusNotFound, gin.H{
			"message": "No medias found",
		})
	}
	c.IndentedJSON(http.StatusOK, gin.H{
		"Media Found": medias,
	})
}

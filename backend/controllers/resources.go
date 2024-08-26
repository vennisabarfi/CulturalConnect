package controllers

import (
	"context"
	"database/sql"
	"fmt"
	"image"
	_ "image/png"
	"log"
	"net/http"
	"os"

	_ "github.com/lib/pq" // postgres driver

	"github.com/gin-gonic/gin"
)

type Resources struct {
	ID           int64       `json:"id"`
	DisplayImage image.Image `json:"display_image"`
	OrgName      string      `json:"org_name"`
	Description  string      `json:"description"`
	Location     string      `json:"location"`
	Website      string      `json:"website"`
	Type         string      `json:"type"`
	Email        string      `json:"email"`
	Phone        string      `json:"phone"`
	CreatedAt    string      `json: created_at`
	DeletedAt    string      `json: deleted_at`
}

var pool *sql.DB

func InsertResource(c *gin.Context) {
	var body struct {
		DisplayImage image.Image `json:"display_image"`
		OrgName      string      `json:"org_name" binding:"required"`
		Description  string      `json:"description" binding:"required"`
		Location     string      `json:"location"`
		Website      string      `json:"website"`
		Type         string      `json:"type" binding:"required"`
		Email        string      `json:"email" binding:"required"`
		Phone        string      `json:"phone"`
	}

	// if error with fields

	if err := c.ShouldBindJSON(&body); err != nil {
		log.Fatal("Error binding data: ", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"Error Binding JSON Data": err,
		})
		return
	}

	resource := Resources{
		DisplayImage: body.DisplayImage,
		OrgName:      body.OrgName,
		Description:  body.Description,
		Location:     body.Location,
		Website:      body.Website,
		Type:         body.Type,
		Email:        body.Email,
		Phone:        body.Phone,
	}

	//open database connection
	pool, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal("Error opening database connection")
	}

	defer pool.Close()

	ctx := context.Background()

	//database column is phone_number for phone

	query := "INSERT INTO resources (display_image, org_name, description, location, website, type, email, phone_number) VALUES($1, $2, $3, $4, $5, $6, $7, $8) Returning ID"

	err = pool.QueryRowContext(ctx, query, resource.DisplayImage, resource.OrgName, resource.Description, resource.Location, resource.Website, resource.Type, resource.Email, resource.Phone).Scan(&resource.ID) //due to auto increment

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"Error inserting new resource": err,
		})
		log.Print("Error inserting new resource", err)
		return

	} else {
		fmt.Println("Inserting resource information into database...")

		c.IndentedJSON(http.StatusOK, gin.H{
			"message":              "Resource added successfully",
			"resource information": resource,
		})
	}
}

// view all resources
func ViewResources(c *gin.Context) {
	//open database connection
	pool, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal("Error opening database connection")
	}

	defer pool.Close()

	query := "SELECT * FROM resources"

	rows, err := pool.Query(query) //uses ctx internally
	if err != nil {
		print(err)
	}
	defer rows.Close()

	//initialize array of resources
	var resources []Resources

	// Loop through rows. finds memory address and map onto databases
	for rows.Next() {
		var resource Resources
		if err := rows.Scan(&resource.ID, &resource.DisplayImage,
			&resource.OrgName, &resource.Description,
			&resource.Location, &resource.Website,
			&resource.Type, &resource.Email,
			&resource.Phone, &resource.CreatedAt,
			&resource.DeletedAt); err != nil {
			c.IndentedJSON(http.StatusBadRequest, gin.H{
				"Error retrieving resources": err,
			})
			log.Print("Error retrieving resources from database", err)
			return
		}
		resources = append(resources, resource) // append results to resources array
	}
	if err == sql.ErrNoRows {
		c.IndentedJSON(http.StatusNotFound, gin.H{
			"message": "No resources found",
		})
	}
	c.IndentedJSON(http.StatusOK, gin.H{
		"Resources Found": resources,
	})
}

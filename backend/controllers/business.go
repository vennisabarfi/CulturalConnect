package controllers

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type Business struct {
	ID           int64          `json:"id"`
	DisplayImage string         `json:"display_image"`
	BusinessName string         `json:"business_name"`
	Description  string         `json:"description"`
	Location     string         `json:"location"`
	Website      string         `json:"website"`
	ServiceType  string         `json:"service_type"`
	Email        string         `json:"email"`
	Phone        sql.NullString `json:"phone_number"`
	TSV          string         `json:"tsv"`
	CreatedAt    string         `json: created_at`
	DeletedAt    string         `json: deleted_at`
}

//insert business

func InsertBusiness(c *gin.Context) {

}

// business/view/planners for eg.
// view business by service_type
func ViewBusinessByType(c *gin.Context) {

	typeParam := c.Param("type")

	// Validate the parameter
	if typeParam == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Business Type Parameter is required"})
		return
	}

	//open database connection
	pool, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal("Error opening database connection")
	}

	defer pool.Close()

	query := "SELECT * FROM businesses WHERE service_type = $1"

	rows, err := pool.Query(query, typeParam) //uses ctx internally
	if err != nil {
		print("Error with SQL Request", err)
	}
	defer rows.Close()

	//initialize array of businesses
	var businesses []Business

	// Loop through rows. finds memory address and map onto databases
	for rows.Next() {
		var business Business
		if err := rows.Scan(&business.ID, &business.DisplayImage, &business.BusinessName, &business.Description,
			&business.Location, &business.Website,
			&business.ServiceType, &business.Email, &business.Phone, &business.TSV, &business.CreatedAt,
			&business.DeletedAt); err != nil {
			c.IndentedJSON(http.StatusBadRequest, gin.H{
				"Error retrieving businesss": err,
			})
			log.Print("Error retrieving businesses from database", err)
			return
		}
		businesses = append(businesses, business) // append results to businesss array
	}
	if err == sql.ErrNoRows {
		c.IndentedJSON(http.StatusNotFound, gin.H{
			"message": "No businesss found",
		})
	}
	c.IndentedJSON(http.StatusOK, gin.H{
		"Businesses Found": businesses,
	})

}

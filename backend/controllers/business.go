package controllers

import (
	"github.com/gin-gonic/gin"
)

type Business struct {
	ID           int64  `json:"id"`
	DisplayImage string `json:"display_image"`
	BusinessName string `json:"business_name"`
	Description  string `json:"description"`
	Location     string `json:"location"`
	Website      string `json:"website"`
	ServiceType  string `json:"service_type"`
	Email        string `json:"email"`
	Phone        string `json:"phone_number"`
	CreatedAt    string `json: created_at`
	DeletedAt    string `json: deleted_at`
}

//insert business

func InsertBusiness(c *gin.Context) {

}

// view business by service_type
func ViewBusinessByType(c *gin.Context) {

}

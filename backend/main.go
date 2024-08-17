package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

// load env file
func LoadEnv() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file.", err)
	}
	fmt.Println(".env file loaded successfully!")
}

func main() {

	LoadEnv()
	r := gin.Default()
	r.Use(cors.Default())
	// port := os.Getenv("PORT")

	r.GET("/home", func(c *gin.Context) {
		c.String(200, "Welcome to the Culture Connect API")
	})
	port := "localhost:" + os.Getenv("PORT")

	r.Run(port)
}

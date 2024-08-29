package main

import (
	"culture_app/controllers"
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq" // postgres driver
)

var pool *sql.DB

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

	// connect to database
	pool, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	// pool, err := sql.Open("postgres", "user=postgres password=PNeumono38%21 dbname=classic_movies_db sslmode=disable")
	if err != nil {
		log.Fatal("Error opening database connection", err)
	} else {
		fmt.Println("Database connection successful")
	}

	defer pool.Close()

	r.GET("/home", func(c *gin.Context) {
		c.String(200, "Welcome to the Culture Connect API")
	})

	// user handlers
	user := r.Group("/user-auth")
	{
		user.POST("/register", controllers.CreateUser)
		user.POST("/login", controllers.LoginUser)
		user.POST("/logout", controllers.LogoutUser)
	}

	//resource handlers
	resource := r.Group("/resource")

	{
		resource.POST("/create", controllers.InsertResource)
		resource.GET("/view", controllers.ViewResources)
	}

	//events handlers
	event := r.Group("/event")

	{
		event.POST("/create", controllers.InsertEvent)
		event.GET("/view", controllers.ViewEvent)
		event.GET("/view-top", controllers.ViewTopEvent) //view top event for home page
	}
	port := "localhost:" + os.Getenv("PORT")

	r.Run(port)
}

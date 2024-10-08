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

// // load env file
func LoadEnv() {
	// Get the current environment
	env := os.Getenv("ENV")

	// Load .env file only if not in production
	if env != "production" {
		err := godotenv.Load()
		if err != nil {
			log.Println("Error loading .env file")
		}
		log.Println("Environment: Development (loaded from .env file)")
	} else {
		log.Println("Environment: Production")
	}

}

func main() {

	LoadEnv()

	// r := gin.Default()
	// r.Use(cors.Default())

	r := gin.New()

	//specify cors
	r.Use(cors.Default())

	// connect to database
	pool, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))

	if err != nil {
		log.Fatal("Error opening database connection", err)
	} else {
		fmt.Println("Database connection successful")
	}

	defer pool.Close()

	// ping database
	pingErr := pool.Ping()
	if pingErr != nil {
		log.Fatal("Error pinging database", pingErr)
	} else {
		fmt.Println("Database pinged successfully")
	}

	// home handlers
	home := r.Group("/home")
	{
		home.GET("/search", controllers.HomeSearch) //main home search
	}

	// user handlers
	// user := r.Group("/user-auth")
	// {
	// 	user.POST("/register", controllers.CreateUser)
	// 	user.POST("/login", controllers.LoginUser)
	// 	user.POST("/logout", controllers.LogoutUser)
	// }

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
		event.GET("/search", controllers.SearchEvent)    //query search for events
	}

	//media handlers
	media := r.Group("/media")

	{
		media.POST("/create", controllers.InsertMedia)
		media.GET("/view/:tag", controllers.ViewMediaByTag) //view media by tag
	}

	//business handlers
	business := r.Group("/business")

	{
		business.POST("/create", controllers.InsertBusiness)
		business.GET("/view/:type", controllers.ViewBusinessByType) //view business by service type
	}

	// For all other routes, serve the index.html
	r.NoRoute(func(c *gin.Context) {
		c.File(".index.html")
	})

	port := "localhost:" + os.Getenv("PORT")

	r.Run(port)
}

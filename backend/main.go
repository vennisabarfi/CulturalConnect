package main

import (
	"culture_app/controllers"
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq" // postgres driver
)

var pool *sql.DB

func main() {

	r := gin.Default()
	r.Use(cors.Default())
	// port := os.Getenv("PORT")

	fmt.Println(os.Getenv("DATABASE_URL"))
	// connect to database
	pool, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))

	if err != nil {
		log.Fatal("Error opening database connection", err)
	} else {
		fmt.Println("Database connection successful")
	}

	defer pool.Close()

	fmt.Print("Hello I'm just here to ping")
	//ping database
	pingErr := pool.Ping()
	if pingErr != nil {
		log.Fatal("Error pinging database", pingErr)
	} else {
		fmt.Println("Database pinged successfully")
	}
	fmt.Println("Yep")
	// home handlers
	home := r.Group("/home")
	{
		home.GET("/search", controllers.HomeSearch) //main home search
	}

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
	port := "localhost:" + os.Getenv("PORT")

	r.Run(port)
}

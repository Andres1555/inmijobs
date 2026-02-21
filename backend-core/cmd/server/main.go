package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/api"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/core"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/database"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/repository"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/httprate"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

	db, err := database.NewDatabase()
	if err != nil {
		log.Fatalf("Fatal Error connecting to database: %v", err)
	}
	
	authRepository := repository.NewAuthRepository(*db)
	profileRepository := repository.NewProfileRepository(*db)
	jobRepository := repository.NewJobRepository(*db)
	connRepository := repository.NewConnectionRepository(*db)
	companyRepository := repository.NewCompanyRepository(*db)

	companyService := core.NewCompanyService(*companyRepository)
	authService := core.NewAuthService(*authRepository)
	profileService := core.NewProfileService(*profileRepository)
	jobService := core.NewJobService(*jobRepository)

	companyHandler := api.NewCompanyHandler(*companyService, *authService)
	pingHandler := api.NewPingHandler(*authService)
	profileHandler := api.NewProfileHandler(*profileService, *authService)
	jobHandler := api.NewJobHandler(*jobService, *authService)
	connHandler := api.NewConnectionHandler(connRepository, *authService)
	

	commentRepository := repository.NewCommentRepository(db)
	commentService := core.NewCommentService(*commentRepository)
	commentHandler := api.NewCommentHandler(*commentService, *authService)

	postRepository := repository.NewPostRepository(db)
	postService := core.NewPostService(postRepository)
	postHandler := api.NewPostHandler(postService)
	interactionRepository := repository.NewInteractionRepository(db)
    interactionService := core.NewInteractionService(interactionRepository)
    interactionHandler := api.NewInteractionHandler(interactionService)
	r := chi.NewRouter()
	

	r.Use(middleware.Recoverer)
	r.Use(middleware.Logger)
	r.Use(middleware.StripSlashes)
	r.Use(httprate.LimitByIP(100, time.Minute))

	r.Route("/api", func(r chi.Router) {
		r.Get("/ping", pingHandler.Ping)
		r.Put("/profiles/me", profileHandler.UpdateProfile)

		r.Route("/posts", func(r chi.Router) {
			r.Post("/", postHandler.CreatePost)
			r.Put("/{id}", postHandler.EditPost)
			r.Get("/{id}", postHandler.GetByID)
			r.Post("/{id}/reactions", interactionHandler.TogglePostReaction)
            r.Get("/{id}/reactions", interactionHandler.GetPostReactions)
		})

		r.Route("/comments", func(r chi.Router) {
			r.Post("/", commentHandler.Create)
			r.Get("/", commentHandler.List)
			r.Delete("/{id}", commentHandler.Delete)
			r.Put("/{id}", commentHandler.Update)
		})

		r.Route("/profiles", func(r chi.Router) {
			r.Put("/me", profileHandler.UpdateProfile)
			r.Get("/{id}", profileHandler.GetProfile)
		})

		r.Route("/jobs", func(r chi.Router) {
			r.Get("/", jobHandler.GetJobs)
			r.Get("/{id}", jobHandler.GetJobByID)
			r.Put("/{id}", jobHandler.UpdateJob)
			r.Delete("/{id}", jobHandler.DeleteJob)
			r.Post("/{id}/applications", jobHandler.CreateApplication)
			r.Get("/{id}/applications", jobHandler.GetJobApplications)
		})

		r.Route("/companies", func(r chi.Router) {
			r.Post("/", companyHandler.Create)
			r.Get("/{id}", companyHandler.GetByID)
			r.Put("/{id}", jobHandler.UpdateCompany)
		})

    r.Route("/connections", func(r chi.Router) {
        	r.Get("/test", connHandler.Ping)         
        	r.Post("/", connHandler.CreateConnection)      
        	r.Put("/{id}", connHandler.UpdateConnection)   
        	r.Delete("/{id}", connHandler.DeleteConnection)

    })
	})
	
	port := fmt.Sprintf(":%s", os.Getenv("PORT"))
	log.Printf("Server starting on port %s", port)
	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
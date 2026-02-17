package main

import (
	"fmt"
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

	authService := core.NewAuthService(*authRepository)
	profileService := core.NewProfileService(*profileRepository)
	jobService := core.NewJobService(*jobRepository)

	pingHandler := api.NewPingHandler(*authService)
	profileHandler := api.NewProfileHandler(*profileService, *authService)
	jobHandler := api.NewJobHandler(*jobService, *authService)

	r := chi.NewRouter()
	r.Use(middleware.Recoverer)
	r.Use(middleware.Logger)
	r.Use(middleware.StripSlashes)
	r.Use(httprate.LimitByIP(100, time.Minute))

	r.Route("/api", func(r chi.Router) {
		r.Get("/ping", pingHandler.Ping)

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
			r.Put("/{id}", jobHandler.UpdateCompany)
		})
	})

	port := fmt.Sprintf(":%s", os.Getenv("PORT"))
	log.Printf("Server starting on port %s", port)
	if err := http.ListenAndServe(port, r); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}

package main

import (
	"log"
	"net/http"
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

	authService := core.NewAuthService(*authRepository)
	profileService := core.NewProfileService(*profileRepository)

	pingHandler := api.NewPingHandler(*authService)
	profileHandler := api.NewProfileHandler(*profileService, *authService)

	jobRepository := repository.NewJobRepository(db)
	jobService := core.NewJobService(jobRepository)
	jobHandler := api.NewJobHandler(jobService)

	r := chi.NewRouter()

	r.Use(middleware.Recoverer)
	r.Use(middleware.Logger)
	r.Use(middleware.StripSlashes)
	r.Use(httprate.LimitByIP(100, time.Minute))

	r.Route("/api", func(r chi.Router) {
		r.Get("/ping", pingHandler.Ping)
		r.Put("/profiles/me", profileHandler.UpdateProfile)
		r.Route("/jobs/{id}", func(r chi.Router) {
			r.Get("/", jobHandler.GetJobByID)
			r.Put("/", jobHandler.UpdateJob)
		})
	})

	port := ":8080"
	log.Printf("Server starting on port %s", port)
	if err := http.ListenAndServe(port, r); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}

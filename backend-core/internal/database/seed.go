package database

import (
	"log/slog"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/model"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/utils"
	"github.com/brianvoe/gofakeit/v6"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func Seed(db *gorm.DB) {
	// Seed 5 Users, 3 Companies per user, 5 Jobs per company, and 10 Applications per job
	slog.Info("[Database] Seeding test data...")

	// Seed Users
	var seededUsers []model.User
	for i := 0; i < 5; i++ {
		user := model.User{
			ID:            utils.NewID(),
			Name:          gofakeit.Name(),
			Email:         gofakeit.Email(),
			EmailVerified: gofakeit.Bool(),
		}

		result := db.Clauses(clause.OnConflict{
			Columns:   []clause.Column{{Name: "id"}},
			DoNothing: true,
		}).Create(&user)

		if result.Error != nil {
			slog.Error("[Database] Failed to seed user", "error", result.Error)
		} else if result.RowsAffected > 0 {
			seededUsers = append(seededUsers, user)
		}
	}
	slog.Info("[Database] Seeded users", "count", len(seededUsers))

	// Seed Profiles for seeded users
	for _, user := range seededUsers {
		profile := model.Profile{
			ID:        utils.NewID(),
			UserID:    user.ID,
			Biography: toPtr(gofakeit.Sentence(10)),
			Location:  toPtr(gofakeit.Address().City + ", " + gofakeit.Address().Country),
		}

		result := db.Clauses(clause.OnConflict{
			Columns:   []clause.Column{{Name: "user_id"}},
			DoNothing: true,
		}).Create(&profile)

		if result.Error != nil {
			slog.Error("[Database] Failed to seed profile", "error", result.Error)
		}
	}
	slog.Info("[Database] Seeded profiles", "count", len(seededUsers))

	// Seed Companies
	var seededCompanies []model.Company
	for _, user := range seededUsers {
		for i := 0; i < 3; i++ {
			company := model.Company{
				ID:          utils.NewID(),
				Name:        gofakeit.Company(),
				Weblink:     gofakeit.URL(),
				LinkedinURL: gofakeit.URL(),
				Number:      gofakeit.Phone(),
				Description: gofakeit.Paragraph(2, 5, 10, ""),
				Sector:      gofakeit.RandomString([]string{"Technology", "Finance", "Healthcare", "Education", "Retail"}),
				Foundation:  gofakeit.Date().Format("2006-01-02"),
				Size:        gofakeit.RandomString([]string{"Small", "Medium", "Large", "Enterprise"}),
				Logo:        toPtr(gofakeit.ImageURL(100, 100)),
				Banner:      toPtr(gofakeit.ImageURL(800, 200)),
				UserID:      user.ID,
			}

			result := db.Clauses(clause.OnConflict{
				Columns:   []clause.Column{{Name: "id"}},
				DoNothing: true,
			}).Create(&company)

			if result.Error != nil {
				slog.Error("[Database] Failed to seed company", "error", result.Error)
			} else if result.RowsAffected > 0 {
				seededCompanies = append(seededCompanies, company)
			}
		}
	}
	slog.Info("[Database] Seeded companies", "count", len(seededCompanies))

	// Seed Jobs
	var seededJobs []model.Job
	employmentTypes := []string{"Full-time", "Part-time", "Contract", "Temporary", "Internship"}
	for _, company := range seededCompanies {
		for i := 0; i < 5; i++ {
			salaryMin := gofakeit.Number(30000, 60000)
			salaryMax := gofakeit.Number(salaryMin, 120000)

			job := model.Job{
				ID:             utils.NewID(),
				Title:          gofakeit.JobTitle(),
				Description:    gofakeit.Paragraph(3, 7, 15, ""),
				Location:       gofakeit.Address().City + ", " + gofakeit.Address().Country,
				SalaryMin:      toPtr(salaryMin),
				SalaryMax:      toPtr(salaryMax),
				EmploymentType: gofakeit.RandomString(employmentTypes),
				IsActive:       gofakeit.Bool(),
				CompanyID:      company.ID,
			}

			result := db.Clauses(clause.OnConflict{
				Columns:   []clause.Column{{Name: "id"}},
				DoNothing: true,
			}).Create(&job)

			if result.Error != nil {
				slog.Error("[Database] Failed to seed job", "error", result.Error)
			} else if result.RowsAffected > 0 {
				seededJobs = append(seededJobs, job)
			}
		}
	}
	slog.Info("[Database] Seeded jobs", "count", len(seededJobs))

	// Seed Applications
	for _, job := range seededJobs {
		// Get a random user for the application
		if len(seededUsers) == 0 {
			continue // Should not happen if users are seeded
		}
		randomUser := seededUsers[gofakeit.Number(0, len(seededUsers)-1)]

		for i := 0; i < 10; i++ {
			application := model.Application{
				ID:          utils.NewID(),
				CoverLetter: toPtr(gofakeit.Paragraph(1, 3, 5, "")),
				Status:      gofakeit.RandomString([]string{"pending", "reviewed", "accepted", "rejected"}),
				UserID:      randomUser.ID,
				JobID:       job.ID,
			}

			result := db.Clauses(clause.OnConflict{
				Columns:   []clause.Column{{Name: "id"}},
				DoNothing: true,
			}).Create(&application)

			if result.Error != nil {
				slog.Error("[Database] Failed to seed application", "error", result.Error)
			}
		}
	}

	slog.Info("[Database] Seeded applications", "count", len(seededJobs)*10)
}

func toPtr[T any](v T) *T {
	return &v
}

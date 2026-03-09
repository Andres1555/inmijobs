package dto

import "github.com/Gabo-div/bingo/inmijobs/backend-core/internal/model"

type UpdateJobRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`

	Latitude  *float64 `json:"latitude"`
	Longitude *float64 `json:"longitude"`

	SalaryMin      *int   `json:"salary_min"`
	SalaryMax      *int   `json:"salary_max"`
	EmploymentType string `json:"employment_type"`
	IsActive       bool   `json:"is_active"`
}

func (r *UpdateJobRequest) ToModel() *model.Job {
	job := &model.Job{
		Title:          r.Title,
		Description:    r.Description,
		SalaryMin:      r.SalaryMin,
		SalaryMax:      r.SalaryMax,
		EmploymentType: r.EmploymentType,
		IsActive:       r.IsActive,
	}

	if r.Latitude != nil || r.Longitude != nil {
		job.Location = &model.Location{
			Latitude:  r.Latitude,
			Longitude: r.Longitude,
		}
	}

	return job
}

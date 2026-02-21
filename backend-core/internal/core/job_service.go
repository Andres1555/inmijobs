package core

import (
	"context"
	"errors"
	"log/slog"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/model"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/repository"
	"github.com/google/uuid"
)

var (
	ErrJobNotFound        = errors.New("job not found")
	ErrUnauthorizedAccess = errors.New("unauthorized access")
	ErrDuplicateApp       = errors.New("already applied to this job")
	ErrCompanyNotFound    = errors.New("company not found")
)

type JobService struct {
	jobRepository repository.JobRepository
}

func NewJobService(jr repository.JobRepository) *JobService {
	return &JobService{
		jobRepository: jr,
	}
}

func (s *JobService) GetJobByID(ctx context.Context, jobID string) (*model.Job, error) {
	return s.jobRepository.GetJobByID(ctx, jobID)
}

func (s *JobService) UpdateJob(ctx context.Context, jobID string, job *model.Job) error {
	return s.jobRepository.UpdateJob(ctx, jobID, job)
}

func (s *JobService) GetAllJobs(ctx context.Context, filters repository.JobFilters, page, limit int) ([]model.Job, int64, error) {
	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 20
	}

	jobs, total, err := s.jobRepository.GetAllJobs(ctx, filters, page, limit)
	if err != nil {
		slog.Error("[JobService][GetAllJobs] failed to fetch jobs", "error", err)
		return nil, 0, err
	}

	slog.Info("[JobService][GetAllJobs] jobs fetched", "count", len(jobs), "total", total)
	return jobs, total, nil
}

func (s *JobService) CreateApplication(ctx context.Context, userID, jobID, coverLetter string) error {
	_, err := s.jobRepository.GetJobByID(ctx, jobID)
	if err != nil {
		slog.Error("[JobService][CreateApplication] job not found", "jobID", jobID, "error", err)
		return ErrJobNotFound
	}

	exists, err := s.jobRepository.CheckApplicationExists(ctx, userID, jobID)
	if err != nil {
		slog.Error("[JobService][CreateApplication] failed to check duplicate", "error", err)
		return err
	}
	if exists {
		slog.Warn("[JobService][CreateApplication] duplicate application", "userID", userID, "jobID", jobID)
		return ErrDuplicateApp
	}

	var coverLetterPtr *string
	if coverLetter != "" {
		coverLetterPtr = &coverLetter
	}

	application := &model.Application{
		ID:          uuid.New().String(),
		UserID:      userID,
		JobID:       jobID,
		CoverLetter: coverLetterPtr,
		Status:      "pending",
	}

	err = s.jobRepository.CreateApplication(ctx, application)
	if err != nil {
		slog.Error("[JobService][CreateApplication] failed to create", "error", err)
		return err
	}

	slog.Info("[JobService][CreateApplication] application created", "userID", userID, "jobID", jobID)
	return nil
}

func (s *JobService) DeleteJob(ctx context.Context, jobID, userID string) error {
	isOwner, err := s.jobRepository.CheckJobOwnership(ctx, jobID, userID)
	if err != nil {
		slog.Error("[JobService][DeleteJob] failed to check ownership", "error", err)
		return err
	}
	if !isOwner {
		slog.Warn("[JobService][DeleteJob] unauthorized attempt", "jobID", jobID, "userID", userID)
		return ErrUnauthorized
	}

	err = s.jobRepository.DeleteJob(ctx, jobID)
	if err != nil {
		slog.Error("[JobService][DeleteJob] failed to delete", "error", err)
		return err
	}

	slog.Info("[JobService][DeleteJob] job deleted", "jobID", jobID, "userID", userID)
	return nil
}

func (s *JobService) GetJobApplications(ctx context.Context, jobID, userID string) ([]model.Application, error) {
	isOwner, err := s.jobRepository.CheckJobOwnership(ctx, jobID, userID)
	if err != nil {
		slog.Error("[JobService][GetJobApplications] failed to check ownership", "error", err)
		return nil, err
	}
	if !isOwner {
		slog.Warn("[JobService][GetJobApplications] unauthorized attempt", "jobID", jobID, "userID", userID)
		return nil, ErrUnauthorized
	}

	applications, err := s.jobRepository.GetJobApplications(ctx, jobID)
	if err != nil {
		slog.Error("[JobService][GetJobApplications] failed to fetch", "error", err)
		return nil, err
	}

	slog.Info("[JobService][GetJobApplications] applications fetched", "jobID", jobID, "count", len(applications))
	return applications, nil
}

func (s *JobService) UpdateCompany(ctx context.Context, companyID, userID string, updates map[string]interface{}) error {
	isOwner, err := s.jobRepository.CheckCompanyOwnership(ctx, companyID, userID)
	if err != nil {
		slog.Error("[JobService][UpdateCompany] failed to check ownership", "error", err)
		return err
	}
	if !isOwner {
		slog.Warn("[JobService][UpdateCompany] unauthorized attempt", "companyID", companyID, "userID", userID)
		return ErrUnauthorizedAccess
	}

	company, err := s.jobRepository.GetCompanyById(ctx, companyID)
	if err != nil {
		slog.Error("[JobService][UpdateCompany] company not found", "error", err)
		return ErrCompanyNotFound
	}

	if name, ok := updates["name"].(string); ok {
		company.Name = name
	}
	if weblink, ok := updates["weblink"].(string); ok {
		company.Weblink = weblink
	}
	if linkedinURL, ok := updates["linkedinUrl"].(string); ok {
		company.LinkedinURL = linkedinURL
	}
	if number, ok := updates["number"].(string); ok {
		company.Number = number
	}
	if description, ok := updates["description"].(string); ok {
		company.Description = description
	}
	if sector, ok := updates["sector"].(string); ok {
		company.Sector = sector
	}
	if foundation, ok := updates["foundation"].(string); ok {
		company.Foundation = foundation
	}
	if size, ok := updates["size"].(string); ok {
		company.Size = size
	}
	if logo, ok := updates["logo"].(string); ok {
		company.Logo = &logo
	}
	if banner, ok := updates["banner"].(string); ok {
		company.Banner = &banner
	}

	err = s.jobRepository.UpdateCompany(ctx, company)
	if err != nil {
		slog.Error("[JobService][UpdateCompany] failed to update", "error", err)
		return err
	}

	slog.Info("[JobService][UpdateCompany] company updated", "companyID", companyID)
	return nil
}

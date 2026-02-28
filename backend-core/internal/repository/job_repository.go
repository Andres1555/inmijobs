package repository

import (
	"context"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/model"
	"gorm.io/gorm"
)

type JobRepository struct {
	db gorm.DB
}

func NewJobRepository(db gorm.DB) *JobRepository {
	return &JobRepository{
		db: db,
	}
}

func (r *JobRepository) GetJobByID(ctx context.Context, jobID string) (*model.Job, error) {
	var job model.Job
	if err := r.db.WithContext(ctx).Preload("Company").Preload("Company.Owner").First(&job, "id = ?", jobID).Error; err != nil {
		return nil, err
	}
	return &job, nil
}

func (r *JobRepository) UpdateJob(ctx context.Context, jobID string, job *model.Job) error {
	if err := r.db.WithContext(ctx).Model(&model.Job{}).Where("id = ?", jobID).Updates(job).Error; err != nil {
		return err
	}
	return nil
}

type JobFilters struct {
	Location       string
	EmploymentType string
	MinSalary      int
	MaxSalary      int
	Sector         string
	UserId         string
}

func (r *JobRepository) GetAllJobs(ctx context.Context, filters JobFilters, page, limit int) ([]model.Job, int64, error) {
	offset := (page - 1) * limit
	query := r.db.WithContext(ctx).Model(&model.Job{}).Where("is_active = ?", true)

	if filters.Location != "" {
		query = query.Where("location LIKE ?", "%"+filters.Location+"%")
	}
	if filters.UserId != "" {
		query = query.Where("recruiter_id = ?", filters.UserId)
	}
	if filters.EmploymentType != "" {
		query = query.Where("employment_type = ?", filters.EmploymentType)
	}
	if filters.MinSalary > 0 {
		query = query.Where("salary_max >= ?", filters.MinSalary)
	}
	if filters.MaxSalary > 0 {
		query = query.Where("salary_min <= ?", filters.MaxSalary)
	}
	if filters.Sector != "" {
		query = query.Joins("JOIN companies ON jobs.company_id = companies.id").
			Where("companies.sector = ?", filters.Sector)
	}

	var total int64
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	var jobs []model.Job
	err := query.
		Preload("Company").
		Order("created_at DESC").
		Limit(limit).
		Offset(offset).
		Find(&jobs).Error

	return jobs, total, err
}

func (r *JobRepository) CreateApplication(ctx context.Context, application *model.Application) error {
	return r.db.WithContext(ctx).Create(application).Error
}

func (r *JobRepository) CheckApplicationExists(ctx context.Context, userID, jobID string) (bool, error) {
	var count int64
	err := r.db.WithContext(ctx).
		Model(&model.Application{}).
		Where("user_id = ? AND job_id = ?", userID, jobID).
		Count(&count).Error
	return count > 0, err
}

func (r *JobRepository) DeleteJob(ctx context.Context, jobID string) error {
	return r.db.WithContext(ctx).Delete(&model.Job{}, "id = ?", jobID).Error
}

func (r *JobRepository) CheckJobOwnership(ctx context.Context, jobID, userID string) (bool, error) {
	var count int64
	err := r.db.WithContext(ctx).
		Model(&model.Job{}).
		Joins("JOIN companies ON jobs.company_id = companies.id").
		Where("jobs.id = ? AND companies.user_id = ?", jobID, userID).
		Count(&count).Error
	return count > 0, err
}

func (r *JobRepository) GetJobApplications(ctx context.Context, jobID string) ([]model.Application, error) {
	var applications []model.Application
	err := r.db.WithContext(ctx).
		Preload("User").
		Where("job_id = ?", jobID).
		Order("created_at DESC").
		Find(&applications).Error
	return applications, err
}

func (r *JobRepository) GetCompanyById(ctx context.Context, companyID string) (*model.Company, error) {
	var company model.Company
	if err := r.db.WithContext(ctx).First(&company, "id = ?", companyID).Error; err != nil {
		return nil, err
	}
	return &company, nil
}

func (r *JobRepository) UpdateCompany(ctx context.Context, company *model.Company) error {
	return r.db.WithContext(ctx).Save(company).Error
}

func (r *JobRepository) CheckCompanyOwnership(ctx context.Context, companyID, userID string) (bool, error) {
	var count int64
	err := r.db.WithContext(ctx).
		Model(&model.Company{}).
		Where("id = ? AND user_id = ?", companyID, userID).
		Count(&count).Error
	return count > 0, err
}

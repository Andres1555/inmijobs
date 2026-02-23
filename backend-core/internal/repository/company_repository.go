package repository

import (
	"context"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/dto"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/model"
	"gorm.io/gorm"
)

type CompanyRepository struct {
	db gorm.DB
}

func NewCompanyRepository(db gorm.DB) *CompanyRepository {
	return &CompanyRepository{db: db}
}

func (r *CompanyRepository) Create(company *model.Company) error {
	return r.db.Create(company).Error
}

func (r *CompanyRepository) GetByID(id string) (*model.Company, error) {
	var company model.Company
	err := r.db.Preload("Locations").First(&company, "id = ?", id).Error
	return &company, err
}

// CompanyFinder returns a list of jobs filtered by company/name/location
func (r *CompanyRepository) CompanyFinder(ctx context.Context, filter dto.CompanyFilterDto) ([]model.Job, int64, error) {
	offset := (filter.Page - 1) * filter.Limit

	// Start query on jobs and join companies for filtering by company fields
	query := r.db.WithContext(ctx).Model(&model.Job{}).Where("is_active = ?", true)

	if filter.Name != nil && *filter.Name != "" {
		q := "%" + *filter.Name + "%"
		query = query.Joins("JOIN companies ON jobs.company_id = companies.id").Where("companies.name LIKE ? OR jobs.location LIKE ?", q, q)
	}

	var total int64
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	var jobs []model.Job
	err := query.Preload("Company").Order("created_at DESC").Limit(filter.Limit).Offset(offset).Find(&jobs).Error
	return jobs, total, err
}

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

func (r *CompanyRepository) CompanyFinder(
	ctx context.Context,
	filter dto.CompanyFilterDto,
) ([]model.Company, int64, error) {

	if filter.Page < 1 {
		filter.Page = 1
	}
	if filter.Limit < 1 {
		filter.Limit = 10
	}
	offset := (filter.Page - 1) * filter.Limit

	var companies []model.Company
	var total int64

	baseQuery := r.db.WithContext(ctx).Model(&model.Company{}).Preload("Locations")

	if filter.Name != nil && *filter.Name != "" {
		search := "%" + *filter.Name + "%"
		baseQuery = baseQuery.Where("name LIKE ?", search)
	}

	if filter.UserId != nil && *filter.UserId != "" {
		baseQuery = baseQuery.Where("user_id = ?", *filter.UserId)
	}

	if err := baseQuery.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	if offset >= int(total) {
		offset = 0
	}

	err := baseQuery.
		Order("created_at DESC").
		Limit(filter.Limit).
		Offset(offset).
		Find(&companies).Error

	if err != nil {
		return nil, 0, err
	}

	return companies, total, nil
}

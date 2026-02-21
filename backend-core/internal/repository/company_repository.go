package repository

import (
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

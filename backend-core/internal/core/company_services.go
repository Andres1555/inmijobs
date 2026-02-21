package core

import (
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/dto"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/model"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/repository"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/utils"
)

type CompanyService struct {
	repo repository.CompanyRepository
}

func NewCompanyService(repo repository.CompanyRepository) *CompanyService {
	return &CompanyService{repo: repo}
}

func (s *CompanyService) CreateCompany(req dto.CreateCompanyRequest, userID string) (*dto.CompanyResponse, error) {

	companyID := utils.NewID()

	company := model.Company{
		ID:          companyID,
		Name:        req.Name,
		Weblink:     req.Weblink,
		LinkedinURL: req.LinkedinURL,
		Number:      req.Number,
		Description: req.Description,
		Sector:      req.Sector,
		Foundation:  req.Foundation,
		Size:        req.Size,
		UserID:      userID,
	}

	for _, l := range req.Locations {
		company.Locations = append(company.Locations, model.Location{
			ID:        utils.NewID(),
			Address:   l.Address,
			City:      l.City,
			Country:   l.Country,
			IsHQ:      l.IsHQ,
			CompanyID: companyID,
		})
	}

	if err := s.repo.Create(&company); err != nil {
		return nil, err
	}

	return s.GetCompany(companyID)
}

func (s *CompanyService) GetCompany(id string) (*dto.CompanyResponse, error) {
	m, err := s.repo.GetByID(id)
	if err != nil {
		return nil, err
	}

	res := &dto.CompanyResponse{
		ID:          m.ID,
		Name:        m.Name,
		Weblink:     m.Weblink,
		LinkedinURL: m.LinkedinURL,
		Number:      m.Number,
		Description: m.Description,
		Sector:      m.Sector,
		Foundation:  m.Foundation,
		Size:        m.Size,
		Logo:        m.Logo,
		Banner:      m.Banner,
		CreatedAt:   m.CreatedAt,
		UpdatedAt:   m.UpdatedAt,
		UserID:      m.UserID,
	}

	for _, l := range m.Locations {
		res.Locations = append(res.Locations, dto.LocationResponse{
			ID:      l.ID,
			Address: l.Address,
			City:    l.City,
			Country: l.Country,
			IsHQ:    l.IsHQ,
		})
	}

	return res, nil
}

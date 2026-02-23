package api

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/core"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/dto"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/utils"
	"github.com/go-chi/chi/v5"
)

type CompanyHandler struct {
	companyService core.CompanyService
	authService    core.AuthService
}

func NewCompanyHandler(cs core.CompanyService, as core.AuthService) *CompanyHandler {
	return &CompanyHandler{
		companyService: cs,
		authService:    as,
	}
}

func (h *CompanyHandler) Create(w http.ResponseWriter, r *http.Request) {
	// 1. Obtención segura del usuario desde el header
	user, err := h.authService.UserFromHeader(r.Context(), r.Header)
	if err != nil {
		utils.RespondError(w, http.StatusUnauthorized, "No autorizado")
		return
	}

	var req dto.CreateCompanyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.RespondError(w, http.StatusBadRequest, "El json esta mal formado")
		return
	}

	companyData, err := h.companyService.CreateCompany(req, user.ID)
	if err != nil {
		utils.RespondError(w, http.StatusInternalServerError, "Error al registrar la compañía")
		return
	}

	utils.RespondJSON(w, http.StatusCreated, companyData)
}

func (h *CompanyHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	res, err := h.companyService.GetCompany(id)
	if err != nil {
		utils.RespondError(w, http.StatusNotFound, "No se encontró la compañía")
		return
	}

	utils.RespondJSON(w, http.StatusOK, res)
}

func (h *CompanyHandler) CompanyFinder(w http.ResponseWriter, r *http.Request) {
	// Parse query params
	pageStr := r.URL.Query().Get("page")
	limitStr := r.URL.Query().Get("limit")
	name := r.URL.Query().Get("name")
	userID := r.URL.Query().Get("userId")
	page, _ := strconv.Atoi(pageStr)
	limit, _ := strconv.Atoi(limitStr)

	filters := dto.CompanyFilterDto{
		Page:   page,
		Limit:  limit,
		Name:   &name,
		UserId: &userID,
	}

	jobs, total, err := h.companyService.CompanyFinder(r.Context(), filters)
	if err != nil {
		utils.RespondError(w, http.StatusInternalServerError, "Failed to fetch jobs")
		return
	}

	jobDTOs := make([]dto.JobDTO, len(jobs))
	for i, job := range jobs {
		jobDTOs[i] = dto.JobDTO{
			ID:          job.ID,
			Title:       job.Title,
			Description: job.Description,
			Location:    job.Location,
			Company: dto.CompanyDTO{
				ID:          job.Company.ID,
				Name:        job.Company.Name,
				Sector:      job.Company.Sector,
				Description: job.Company.Description,
				Logo:        job.Company.Logo,
			},
			SalaryMin:      job.SalaryMin,
			SalaryMax:      job.SalaryMax,
			EmploymentType: job.EmploymentType,
			CreatedAt:      job.CreatedAt.Time().Unix(),
		}
	}

	if limit == 0 {
		limit = 20
	}
	totalPages := int(total) / limit
	if int(total)%limit != 0 {
		totalPages++
	}

	utils.RespondJSON(w, http.StatusOK, dto.PaginatedJobsResponse{
		Jobs:       jobDTOs,
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
	})
}

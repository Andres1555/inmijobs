package api

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/core"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/dto"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/repository"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/utils"
	"github.com/go-chi/chi/v5"
)

type JobHandler struct {
	jobService  core.JobService
	authService core.AuthService
}

func NewJobHandler(js core.JobService, as core.AuthService) *JobHandler {
	return &JobHandler{
		jobService:  js,
		authService: as,
	}
}

func (h *JobHandler) GetJobByID(w http.ResponseWriter, r *http.Request) {
	jobID := chi.URLParam(r, "id")

	job, err := h.jobService.GetJobByID(r.Context(), jobID)
	if err != nil {
		utils.RespondError(w, http.StatusNotFound, "Job not found")
		return
	}

	utils.RespondJSON(w, http.StatusOK, job)
}

func (h *JobHandler) UpdateJob(w http.ResponseWriter, r *http.Request) {
	jobID := chi.URLParam(r, "id")

	var req dto.UpdateJobRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.RespondError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	if err := h.jobService.UpdateJob(r.Context(), jobID, req.ToModel()); err != nil {
		utils.RespondError(w, http.StatusInternalServerError, "Failed to update job")
		return
	}

	utils.RespondJSON(w, http.StatusOK, map[string]string{"message": "Job updated successfully"})
}

func (h *JobHandler) GetJobs(w http.ResponseWriter, r *http.Request) {
	// Parse query params
	pageStr := r.URL.Query().Get("page")
	limitStr := r.URL.Query().Get("limit")
	location := r.URL.Query().Get("location")
	employmentType := r.URL.Query().Get("employmentType")
	minSalaryStr := r.URL.Query().Get("minSalary")
	maxSalaryStr := r.URL.Query().Get("maxSalary")
	sector := r.URL.Query().Get("sector")

	page, _ := strconv.Atoi(pageStr)
	limit, _ := strconv.Atoi(limitStr)
	minSalary, _ := strconv.Atoi(minSalaryStr)
	maxSalary, _ := strconv.Atoi(maxSalaryStr)

	filters := repository.JobFilters{
		Location:       location,
		EmploymentType: employmentType,
		MinSalary:      minSalary,
		MaxSalary:      maxSalary,
		Sector:         sector,
	}

	jobs, total, err := h.jobService.GetAllJobs(r.Context(), filters, page, limit)
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

func (h *JobHandler) CreateApplication(w http.ResponseWriter, r *http.Request) {
	user, err := h.authService.UserFromHeader(r.Context(), r.Header)
	if err == core.ErrUnauthorized {
		utils.RespondError(w, http.StatusUnauthorized, "Authentication required")
		return
	}
	if err != nil {
		utils.RespondError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	jobID := chi.URLParam(r, "id")

	var req dto.CreateApplicationRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.RespondError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	err = h.jobService.CreateApplication(r.Context(), user.ID, jobID, req.CoverLetter)
	if err == core.ErrJobNotFound {
		utils.RespondError(w, http.StatusNotFound, "Job not found")
		return
	}
	if err == core.ErrDuplicateApp {
		utils.RespondError(w, http.StatusConflict, "Already applied to this job")
		return
	}
	if err != nil {
		utils.RespondError(w, http.StatusInternalServerError, "Failed to create application")
		return
	}

	utils.RespondJSON(w, http.StatusCreated, dto.CreateApplicationResponse{
		Message: "Application submitted successfully",
	})
}

func (h *JobHandler) DeleteJob(w http.ResponseWriter, r *http.Request) {
	user, err := h.authService.UserFromHeader(r.Context(), r.Header)
	if err == core.ErrUnauthorized {
		utils.RespondError(w, http.StatusUnauthorized, "Authentication required")
		return
	}
	if err != nil {
		utils.RespondError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	jobID := chi.URLParam(r, "id")

	err = h.jobService.DeleteJob(r.Context(), jobID, user.ID)
	if err == core.ErrUnauthorizedAccess {
		utils.RespondError(w, http.StatusForbidden, "You don't have permission to delete this job")
		return
	}
	if err != nil {
		utils.RespondError(w, http.StatusInternalServerError, "Failed to delete job")
		return
	}

	utils.RespondJSON(w, http.StatusOK, map[string]string{"message": "Job deleted successfully"})
}

func (h *JobHandler) GetJobApplications(w http.ResponseWriter, r *http.Request) {
	user, err := h.authService.UserFromHeader(r.Context(), r.Header)
	if err == core.ErrUnauthorized {
		utils.RespondError(w, http.StatusUnauthorized, "Authentication required")
		return
	}
	if err != nil {
		utils.RespondError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	jobID := chi.URLParam(r, "id")

	applications, err := h.jobService.GetJobApplications(r.Context(), jobID, user.ID)
	if err == core.ErrUnauthorizedAccess {
		utils.RespondError(w, http.StatusForbidden, "You don't have permission to view applications for this job")
		return
	}
	if err != nil {
		utils.RespondError(w, http.StatusInternalServerError, "Failed to fetch applications")
		return
	}

	appDTOs := make([]dto.CompanyApplicationDTO, len(applications))
	for i, app := range applications {
		appDTOs[i] = dto.CompanyApplicationDTO{
			ID: app.ID,
			User: dto.UserDTO{
				ID:    app.User.ID,
				Name:  app.User.Name,
				Email: app.User.Email,
				Image: app.User.Image,
			},
			CoverLetter: app.CoverLetter,
			Status:      app.Status,
			CreatedAt:   app.CreatedAt.Time().Unix(),
		}
	}

	utils.RespondJSON(w, http.StatusOK, appDTOs)
}

func (h *JobHandler) UpdateCompany(w http.ResponseWriter, r *http.Request) {
	user, err := h.authService.UserFromHeader(r.Context(), r.Header)
	if err == core.ErrUnauthorized {
		utils.RespondError(w, http.StatusUnauthorized, "Authentication required")
		return
	}
	if err != nil {
		utils.RespondError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	companyID := chi.URLParam(r, "id")

	var req dto.UpdateCompanyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.RespondError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	updates := make(map[string]interface{})
	if req.Name != nil {
		updates["name"] = *req.Name
	}
	if req.Weblink != nil {
		updates["weblink"] = *req.Weblink
	}
	if req.LinkedinURL != nil {
		updates["linkedinUrl"] = *req.LinkedinURL
	}
	if req.Number != nil {
		updates["number"] = *req.Number
	}
	if req.Description != nil {
		updates["description"] = *req.Description
	}
	if req.Sector != nil {
		updates["sector"] = *req.Sector
	}
	if req.Foundation != nil {
		updates["foundation"] = *req.Foundation
	}
	if req.Size != nil {
		updates["size"] = *req.Size
	}
	if req.Logo != nil {
		updates["logo"] = *req.Logo
	}
	if req.Banner != nil {
		updates["banner"] = *req.Banner
	}

	if len(updates) == 0 {
		utils.RespondError(w, http.StatusBadRequest, "No fields to update")
		return
	}

	err = h.jobService.UpdateCompany(r.Context(), companyID, user.ID, updates)
	if err == core.ErrUnauthorizedAccess {
		utils.RespondError(w, http.StatusForbidden, "You don't have permission to update this company")
		return
	}
	if err == core.ErrCompanyNotFound {
		utils.RespondError(w, http.StatusNotFound, "Company not found")
		return
	}
	if err != nil {
		utils.RespondError(w, http.StatusInternalServerError, "Failed to update company")
		return
	}

	utils.RespondJSON(w, http.StatusOK, dto.UpdateCompanyResponse{
		Message: "Company updated successfully",
	})
}

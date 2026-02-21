package api

import (
	"encoding/json"
	"net/http"

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

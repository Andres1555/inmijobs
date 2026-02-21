package api

import (
	"encoding/json"
	"net/http"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/core"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/dto"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/utils"
	"github.com/go-chi/chi/v5"
)

type ProfileHandler struct {
	profileService core.ProfileService
	authService    core.AuthService
}

func NewProfileHandler(ps core.ProfileService, as core.AuthService) *ProfileHandler {
	return &ProfileHandler{
		profileService: ps,
		authService:    as,
	}
}

func (h ProfileHandler) UpdateProfile(w http.ResponseWriter, r *http.Request) {

	user, err := h.authService.UserFromHeader(r.Context(), r.Header)
	if err != nil {
		utils.RespondError(w, http.StatusUnauthorized, "Unauthorized")
		return
	}
	//user := struct{ ID string }{ID: "user_test_123"}
	var req dto.UpdateProfileRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.RespondError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	profile, err := h.profileService.UpdateProfile(r.Context(), user.ID, req)
	if err != nil {
		utils.RespondError(w, http.StatusInternalServerError, "Failed to update profile")
		return
	}

	utils.RespondJSON(w, http.StatusOK, dto.ProfileResponse{
		ID:        profile.ID,
		UserID:    profile.UserID,
		Biography: profile.Biography,
		Title:     profile.Title,
		Location:  profile.Location,
	})
}

func (h ProfileHandler) GetProfile(w http.ResponseWriter, r *http.Request) {
	
	targetID := chi.URLParam(r, "id")

	if targetID == "" {
			utils.RespondError(w, http.StatusBadRequest, "User ID is required")
			return
		}

	_, errAuth := h.authService.UserFromHeader(r.Context(), r.Header)
	
	isLogged := (errAuth == nil)

	user, profile, err := h.profileService.GetFullProfileData(r.Context(), targetID)
	if err != nil {
		utils.RespondError(w, http.StatusNotFound, "User not Found")
		return
	}

	res := dto.CombinedProfileResponse{
		Name:  user.Name,
		Image: user.Image,
	}

	if profile != nil {
		if isLogged {
			res.Location  = profile.Location
			res.Biography = profile.Biography
			res.Title     = profile.Title
		}
	}

	utils.RespondJSON(w, http.StatusOK, res)
}
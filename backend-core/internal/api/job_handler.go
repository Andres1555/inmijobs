package api

import (
	"encoding/json"
	"net/http"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/core"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/dto"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/utils"
	"github.com/go-chi/chi/v5"
)

type JobHandler struct {
	jobService *core.JobService
}

func NewJobHandler(js *core.JobService) *JobHandler {
	return &JobHandler{
		jobService: js,
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

package api

import (
	"net/http"
	"strconv"

	"encoding/json"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/core"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/dto"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/model"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/utils"
	"github.com/go-chi/chi/v5"
)

type PostHandler struct {
	svc core.PostService
}

func NewPostHandler(svc core.PostService) *PostHandler {
	return &PostHandler{
		svc: svc,
	}
}

func (h *PostHandler) EditPost(w http.ResponseWriter, r *http.Request) {

	var input model.Post
	id := chi.URLParam(r, "id")
	if id == "" {
		utils.RespondError(w, http.StatusBadRequest, "Missing post ID")
		return
	}

	Postid, err := strconv.Atoi(id)
	if err != nil {
		utils.RespondError(w, http.StatusBadRequest, "Invalid post ID format")
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		utils.RespondError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	updatedPost, err := h.svc.UpdatePost(r.Context(), uint(Postid), input)
	if err != nil {
		utils.RespondError(w, http.StatusInternalServerError, "Failed to create post: "+err.Error())
		return
	}

	utils.RespondJSON(w, http.StatusOK, updatedPost)
}

func (p PostHandler) CreatePost(w http.ResponseWriter, r *http.Request) {

	//Get user ID from the header
	// user, err := h.authService.UserFromHeader(r.Context(), r.Header)
	// if err != nil {
	// 	utils.RespondError(w, http.StatusUnauthorized, "Unauthorized")
	// 	return
	// }

	var req dto.CreatePostRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.RespondError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	// req.UserID = "user_test_123" --> remove later

	createdPost, err := p.svc.CreatePost(r.Context(), req)
	if err != nil {
		utils.RespondError(w, http.StatusInternalServerError, "Failed to create post")
		return
	}

	utils.RespondJSON(w, http.StatusOK, createdPost)
}

func (h *PostHandler) GetByID(w http.ResponseWriter, r *http.Request) {

	idParam := chi.URLParam(r, "id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		utils.RespondError(w, http.StatusBadRequest, "ID de post inválido")
		return
	}

	post, err := h.svc.GetByID(r.Context(), uint(id))
	if err != nil {

		if err.Error() == "el post solicitado no existe" {
			utils.RespondError(w, http.StatusNotFound, err.Error())
		} else {
			utils.RespondError(w, http.StatusInternalServerError, "Error interno al obtener el post")
		}
		return
	}

	utils.RespondJSON(w, http.StatusOK, post)
}

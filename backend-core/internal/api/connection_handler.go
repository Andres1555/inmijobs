package api

import (
    "encoding/json"
    "net/http"

    "github.com/Gabo-div/bingo/inmijobs/backend-core/internal/core"
    "github.com/Gabo-div/bingo/inmijobs/backend-core/internal/model"
    "github.com/Gabo-div/bingo/inmijobs/backend-core/internal/repository"
    "github.com/Gabo-div/bingo/inmijobs/backend-core/internal/utils"
    "github.com/go-chi/chi/v5"
)

type ConnectionHandler struct {
    repo        *repository.ConnectionRepository
    authService core.AuthService
}

func NewConnectionHandler(repo *repository.ConnectionRepository, auth core.AuthService) *ConnectionHandler {
    return &ConnectionHandler{
        repo:        repo,
        authService: auth,
    }
}

func (h *ConnectionHandler) CreateConnection(w http.ResponseWriter, r *http.Request) {

    user, err := h.authService.UserFromHeader(r.Context(), r.Header)
    if err != nil {
        utils.RespondError(w, http.StatusUnauthorized, "Unauthorized")
        return
    }

    var conn model.Connection
    if err := json.NewDecoder(r.Body).Decode(&conn); err != nil {
        utils.RespondError(w, http.StatusBadRequest, "Invalid request body")
        return
    }

    conn.UserID = user.ID 

    if err := h.repo.Create(&conn); err != nil {
        utils.RespondError(w, http.StatusInternalServerError, "Failed to create connection")
        return
    }
    utils.RespondJSON(w, http.StatusCreated, conn)
}

func (h *ConnectionHandler) UpdateConnection(w http.ResponseWriter, r *http.Request) {
    user, err := h.authService.UserFromHeader(r.Context(), r.Header)
    if err != nil {
        utils.RespondError(w, http.StatusUnauthorized, "Unauthorized")
        return
    }

    id := chi.URLParam(r, "id")
    var body struct {
        Status model.ConnectionStatus `json:"status"`
    }

    if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
        utils.RespondError(w, http.StatusBadRequest, "Invalid request body")
        return
    }

    if err := h.repo.UpdateStatus(id, user.ID, body.Status); err != nil {
        if err == gorm.ErrRecordNotFound {
            utils.RespondError(w, http.StatusNotFound, "Connection not found or unauthorized")
            return
        }
        utils.RespondError(w, http.StatusInternalServerError, "Failed to update")
        return
    }
    utils.RespondJSON(w, http.StatusOK, map[string]string{"status": string(body.Status)})
}

func (h *ConnectionHandler) DeleteConnection(w http.ResponseWriter, r *http.Request) {
    _, err := h.authService.UserFromHeader(r.Context(), r.Header)
    if err != nil {
        utils.RespondError(w, http.StatusUnauthorized, "Unauthorized")
        return
    }

    id := chi.URLParam(r, "id")
    if err := h.repo.Delete(id); err != nil {
        utils.RespondError(w, http.StatusInternalServerError, "Failed to delete connection")
        return
    }
    utils.RespondJSON(w, http.StatusNoContent, nil)
}
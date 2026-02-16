package api

import (
	"net/http"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/core"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/model"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/utils"
	"github.com/gin-gonic/gin"
)

type PostHandler struct {
	svc core.PostService
}

func NewPostHandler(svc core.PostService) *PostHandler {
	return &PostHandler{
		svc: svc,
	}
}

func (h *PostHandler) EditPost(c *gin.Context) {

	var input model.Post

	if err := c.ShouldBindJSON(&input); err != nil {
		utils.RespondError(c.Writer, http.StatusBadRequest, "Datos de entrada inválidos: "+err.Error())
		return
	}

	updatedPost, err := h.svc.UpdatePost(c, input)
	if err != nil {
		utils.RespondError(c.Writer, http.StatusInternalServerError, "Error al actualizar el post: "+err.Error())
		return
	}

	utils.RespondJSON(c.Writer, http.StatusOK, updatedPost)
}

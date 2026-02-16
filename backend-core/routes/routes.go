package posts

import (
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/api"
	"github.com/gin-gonic/gin"
)

func RegisterPostRoutes(r *gin.RouterGroup, postHandler *api.PostHandler) {
	r.POST("/")
	r.PUT("/:id", postHandler.EditPost)
	r.DELETE("/:id")
}

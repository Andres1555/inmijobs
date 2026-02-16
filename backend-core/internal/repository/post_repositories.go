package repository

import (
	"fmt"
	"strconv"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/model"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type PostRepo interface {
	EditPost(ctx gin.Context, p model.Post) (model.Post, error)
}

type postRepository struct {
	db *gorm.DB
}

func NewPostRepository(db *gorm.DB) *postRepository {
	return &postRepository{db: db}
}

func (r *postRepository) EditPost(ctx gin.Context, p model.Post) (model.Post, error) {
	var id = ctx.Param("id")
	postID, err := strconv.Atoi(id)

	if err != nil {
		return model.Post{}, fmt.Errorf("ID invalido: %v", err)
	}

	var editedPost model.Post

	r.db.Model(&editedPost).Updates(&p)

	if len(p.Comments) > 0 {
		r.db.Model(&editedPost).Association("Comment").Replace(p.Comments)
	}

	if len(p.Interactions) > 0 {
		r.db.Model(&editedPost).Association("Interaction").Replace(p.Interactions)
	}
	if len(p.Images) > 0 {
		r.db.Model(&editedPost).Association("Image").Replace(p.Images)
	}

	return editedPost, r.db.Preload("Comment").Preload("Interaction").Preload("Image").First(&editedPost, postID).Error

}

package core

import (
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/model"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/repository"
	"github.com/gin-gonic/gin"
)

type PostService interface {
	UpdatePost(ctx *gin.Context, input model.Post) (model.Post, error)
}

type postService struct {
	repo repository.PostRepo
}

func NewPostService(repo repository.PostRepo) PostService {
	return &postService{
		repo: repo,
	}
}

func (s *postService) UpdatePost(ctx *gin.Context, input model.Post) (model.Post, error) {

	updatedPost, err := s.repo.EditPost(*ctx, input)
	if err != nil {
		return model.Post{}, err
	}

	return updatedPost, nil
}

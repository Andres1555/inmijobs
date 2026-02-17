package core

import (
	"context"
	"errors"

	"log/slog"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/repository"
	"gorm.io/gorm"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/dto"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/model"
)

type PostService interface {
	UpdatePost(ctx context.Context, postID uint, input model.Post) (model.Post, error)
	CreatePost(ctx context.Context, req dto.CreatePostRequest) (*model.Post, error)
	GetByID(ctx context.Context, id uint) (*model.Post, error)
}

type postService struct {
	repo repository.PostRepo
}

func NewPostService(repo repository.PostRepo) PostService {
	return &postService{
		repo: repo,
	}
}

func (s *postService) CreatePost(ctx context.Context, req dto.CreatePostRequest) (*model.Post, error) {

	post := model.Post{

		Title:     req.Title,
		UserID:    req.UserID,
		JobID:     req.JobID,
		CompanyID: req.CompanyID,
		Content:   req.Content,
	}

	err := s.repo.CreatePost(ctx, &post)

	if err != nil {
		slog.Error("[PostService][CreatePost] unable create post", "error", err)
		return nil, err
	}
	return &post, nil
}

func (s *postService) UpdatePost(ctx context.Context, postID uint, p model.Post) (model.Post, error) {

	existingPost, err := s.repo.GetByID(ctx, postID)
	if err != nil {
		return model.Post{}, errors.New("post no encontrado")
	}

	p.UserID = existingPost.UserID
	p.CreatedAt = existingPost.CreatedAt

	return s.repo.EditPost(ctx, postID, p)
}

func (s *postService) GetByID(ctx context.Context, id uint) (*model.Post, error) {

	post, err := s.repo.GetByID(ctx, id)

	if err != nil {

		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("el post solicitado no existe")
		}

		return nil, err
	}

	return post, nil
}

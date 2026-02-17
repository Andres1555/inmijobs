package repository

import (
	"context"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/model"
	"gorm.io/gorm"
)

type PostRepo interface {
	EditPost(ctx context.Context, postID uint, p model.Post) (model.Post, error)
	CreatePost(ctx context.Context, post *model.Post) error
	GetByID(ctx context.Context, id uint) (*model.Post, error)
}

type postRepository struct {
	db *gorm.DB
}

func NewPostRepository(db *gorm.DB) PostRepo {
	return &postRepository{db: db}
}

func (r *postRepository) GetByID(ctx context.Context, id uint) (*model.Post, error) {
	var post model.Post

	err := r.db.WithContext(ctx).
		Preload("Images").
		Preload("Company").
		Preload("User").
		Preload("Job").
		Preload("Comments").Preload("Comments.User").
		Preload("Interactions").
		First(&post, id).Error
	return &post, err
}

func (r *postRepository) EditPost(ctx context.Context, postID uint, p model.Post) (model.Post, error) {
	var editedPost model.Post

	err := r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {

		if err := tx.First(&editedPost, postID).Error; err != nil {
			return err
		}

		if err := tx.Model(&editedPost).Updates(p).Error; err != nil {
			return err
		}

		if len(p.Images) > 0 {

			if err := tx.Model(&editedPost).Association("Images").Replace(p.Images); err != nil {
				return err
			}
		}

		if len(p.Comments) > 0 {
			if err := tx.Model(&editedPost).Association("Comments").Replace(p.Comments); err != nil {
				return err
			}
		}

		return nil
	})

	if err != nil {
		return model.Post{}, err
	}

	err = r.db.WithContext(ctx).
		Preload("Comments").
		Preload("Interactions").
		Preload("Images").
		First(&editedPost, postID).Error

	return editedPost, err
}
func (r *postRepository) CreatePost(ctx context.Context, post *model.Post) error {
	if err := r.db.WithContext(ctx).Create(post).Error; err != nil {
		return err
	}
	return nil
}

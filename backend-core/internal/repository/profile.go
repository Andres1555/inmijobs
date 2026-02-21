package repository

import (
	"context"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/model"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type ProfileRepository struct {
	db gorm.DB
}

func NewProfileRepository(db gorm.DB) *ProfileRepository {
	return &ProfileRepository{
		db: db,
	}
}

func (r ProfileRepository) UpsertProfile(ctx context.Context, profile *model.Profile) error {
	// Upsert based on UserID since it is unique
	// If ID is empty, GORM might try to insert.
	// We want to find by UserID first or use OnConflict.
	// Since UserID is unique index, we can use OnConflict.

	result := r.db.WithContext(ctx).Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "user_id"}},
		DoUpdates: clause.AssignmentColumns([]string{"biography", "title", "location", "updated_at"}),
	}).Create(profile)

	return result.Error
}

func (r ProfileRepository) GetProfileByUserID(ctx context.Context, userID string) (model.Profile, error) {
	var profile model.Profile
	result := r.db.WithContext(ctx).Where("user_id = ?", userID).First(&profile)
	return profile, result.Error
}

func (r ProfileRepository) GetUserByID(ctx context.Context, userID string) (model.User, error) {
	var user model.User
	err := r.db.WithContext(ctx).First(&user, "id = ?", userID).Error
	return user, err
}
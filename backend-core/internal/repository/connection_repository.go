package repository

import (
    "context"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/model"
	"gorm.io/gorm"
)

type ConnectionRepository struct {
	db gorm.DB
}

func NewConnectionRepository(db gorm.DB) *ConnectionRepository {
	return &ConnectionRepository{db: db}
}

func (r *ConnectionRepository) Create(conn *model.Connection) error {
	return r.db.Create(conn).Error
}

func (r *ConnectionRepository) UpdateStatus(id string, userID string, status model.ConnectionStatus) error {

    result := r.db.Model(&model.Connection{}).
        Where("id = ? AND user_id = ?", id, userID).
        Update("status", status)

    if result.Error != nil {
        return result.Error
    }

    if result.RowsAffected == 0 {
        return gorm.ErrRecordNotFound
    }

    return nil
}

func (r *ConnectionRepository) Delete(id string, userID string) error {
    result := r.db.Where("id = ? AND user_id = ?", id, userID).
        Delete(&model.Connection{})

    if result.Error != nil {
        return result.Error
    }

    if result.RowsAffected == 0 {
        return gorm.ErrRecordNotFound
    }

    return nil
}
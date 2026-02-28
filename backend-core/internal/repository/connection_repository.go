package repository

import (
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

func (r *ConnectionRepository) Delete(id string) error {
	result := r.db.Where("id = ?", id).
		Delete(&model.Connection{})

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}

	return nil
}

func (r *ConnectionRepository) GetConnections(userID string, status string, page int, limit int) ([]model.Connection, int64, error) {
	var connections []model.Connection
	var total int64

	query := r.db.Model(&model.Connection{}).
		Preload("Requester").
		Preload("Receiver").
		Where("requester_id = ? OR receiver_id = ?", userID, userID)

	if status != "" {
		query = query.Where("status = ?", status)
	}

	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	offset := (page - 1) * limit
	if err := query.Offset(offset).Limit(limit).Find(&connections).Error; err != nil {
		return nil, 0, err
	}

	return connections, total, nil
}

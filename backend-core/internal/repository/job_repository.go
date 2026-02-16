package repository

import (
	"context"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/model"
	"gorm.io/gorm"
)

type JobRepository struct {
	db *gorm.DB
}

func NewJobRepository(db *gorm.DB) *JobRepository {
	return &JobRepository{
		db: db,
	}
}

func (r *JobRepository) GetJobByID(ctx context.Context, jobID string) (*model.Job, error) {
	var job model.Job
	if err := r.db.WithContext(ctx).Preload("Company").Preload("Company.Owner").First(&job, "id = ?", jobID).Error; err != nil {
		return nil, err
	}
	return &job, nil
}

func (r *JobRepository) UpdateJob(ctx context.Context, jobID string, job *model.Job) error {
	if err := r.db.WithContext(ctx).Model(&model.Job{}).Where("id = ?", jobID).Updates(job).Error; err != nil {
		return err
	}
	return nil
}

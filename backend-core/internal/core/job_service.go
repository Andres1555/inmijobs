package core

import (
	"context"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/model"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/repository"
)

type JobService struct {
	jobRepository *repository.JobRepository
}

func NewJobService(jr *repository.JobRepository) *JobService {
	return &JobService{
		jobRepository: jr,
	}
}

func (s *JobService) GetJobByID(ctx context.Context, jobID string) (*model.Job, error) {
	return s.jobRepository.GetJobByID(ctx, jobID)
}

func (s *JobService) UpdateJob(ctx context.Context, jobID string, job *model.Job) error {
	return s.jobRepository.UpdateJob(ctx, jobID, job)
}

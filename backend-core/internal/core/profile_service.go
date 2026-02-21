package core

import (
	"context"
	"log/slog"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/dto"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/model"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/repository"
	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/utils"
)

type ProfileService struct {
	profileRepository repository.ProfileRepository
}

func NewProfileService(pr repository.ProfileRepository) *ProfileService {
	return &ProfileService{
		profileRepository: pr,
	}
}

func (s ProfileService) UpdateProfile(ctx context.Context, userID string, req dto.UpdateProfileRequest) (model.Profile, error) {
	// Check if profile exists
	profile, err := s.profileRepository.GetProfileByUserID(ctx, userID)
	if err != nil {
		// If not found, create new instance
		profile = model.Profile{
			ID:     utils.NewID(),
			UserID: userID,
		}
	}

	if req.Biography != nil {
		profile.Biography = req.Biography
	}
	if req.Title != nil {
		profile.Title = req.Title
	}
	if req.Location != nil {
		profile.Location = req.Location
	}

	err = s.profileRepository.UpsertProfile(ctx, &profile)
	if err != nil {
		slog.Error("[ProfileService][UpdateProfile] unable to upsert profile", "error", err)
		return model.Profile{}, err
	}

	return profile, nil
}

func (s ProfileService) GetProfile(ctx context.Context, userID string) (model.Profile, error) {
	return s.profileRepository.GetProfileByUserID(ctx, userID)
}

func (s ProfileService) GetFullProfileData(ctx context.Context, userID string) (model.User, *model.Profile, error) {

	user, err := s.profileRepository.GetUserByID(ctx, userID)
	if err != nil {
		return model.User{}, nil, err
	}

	profile, err := s.profileRepository.GetProfileByUserID(ctx, userID)
	if err != nil {
		return user, nil, nil
	}
	
	return user, &profile, nil
}
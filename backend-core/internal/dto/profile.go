package dto

type UpdateProfileRequest struct {
	Biography *string `json:"biography"`
	Title     *string `json:"title"`
	Location  *string `json:"location"`
}

type ProfileResponse struct {
	ID        string  `json:"id"`
	UserID    string  `json:"userId"`
	Biography *string `json:"biography,omitempty"`
	Title     *string `json:"title,omitempty"`
	Location  *string `json:"location,omitempty"`
}

type CombinedProfileResponse struct {
	Name      string  `json:"name"`
	Image     *string `json:"image"`
	Location  *string `json:"location,omitempty"`
	Biography *string `json:"biography,omitempty"`
	Title     *string `json:"title,omitempty"`
}
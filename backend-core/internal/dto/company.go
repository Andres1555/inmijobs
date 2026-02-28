package dto

type CreateLocationRequest struct {
	Address string `json:"address"`
	City    string `json:"city"`
	Country string `json:"country"`
	IsHQ    bool   `json:"is_hq"`
}

type CreateCompanyRequest struct {
	Name        string                  `json:"name"`
	Weblink     string                  `json:"weblink"`
	LinkedinURL string                  `json:"linkedin_url"`
	Number      string                  `json:"number"`
	Description string                  `json:"description"`
	Sector      string                  `json:"sector"`
	Foundation  string                  `json:"foundation"`
	Size        string                  `json:"size"`
	Locations   []CreateLocationRequest `json:"locations"`
	UserID      string                  `json:"user_id"`
}

type CompanyResponse struct {
	ID          string             `json:"id"`
	Name        string             `json:"name"`
	Weblink     string             `json:"weblink"`
	LinkedinURL string             `json:"linkedin_url"`
	Number      string             `json:"number"`
	Description string             `json:"description"`
	Sector      string             `json:"sector"`
	Foundation  string             `json:"foundation"`
	Size        string             `json:"size"`
	Logo        *string            `json:"logo"`
	Banner      *string            `json:"banner"`
	CreatedAt   int64              `json:"created_at"`
	UpdatedAt   int64              `json:"updated_at"`
	UserID      string             `json:"user_id"`
	Locations   []LocationResponse `json:"locations,omitempty"`
}

type PaginatedCompanyResponse struct {
	Companies  []CompanyResponse `json:"data"`
	Total      int64             `json:"total"`
	Page       int               `json:"page"`
	Limit      int               `json:"limit"`
	TotalPages int               `json:"totalPages"`
}

type LocationResponse struct {
	ID      string `json:"id"`
	Address string `json:"address"`
	City    string `json:"city"`
	Country string `json:"country"`
	IsHQ    bool   `json:"is_hq"`
}

type CompanyFilterDto struct {
	Page   int     `json:"page" form:"page,default=1"`
	Limit  int     `json:"limit" form:"limit,default=10"`
	Name   *string `json:"name" form:"name"`
	UserId *string `json:"user_id" form:"userId"`
}

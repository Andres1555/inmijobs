package dto

type JobDTO struct {
	ID             string     `json:"id"`
	Title          string     `json:"title"`
	Description    string     `json:"description"`
	Location       string     `json:"location"`
	Company        CompanyDTO `json:"company"`
	SalaryMin      *int       `json:"salaryMin,omitempty"`
	SalaryMax      *int       `json:"salaryMax,omitempty"`
	EmploymentType string     `json:"employmentType"`
	CreatedAt      int64      `json:"createdAt"`
}

type CompanyDTO struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Sector      string  `json:"sector"`
	Description string  `json:"description"`
	Logo        *string `json:"logo,omitempty"`
}

type PaginatedJobsResponse struct {
	Jobs       []JobDTO `json:"jobs"`
	Total      int64    `json:"total"`
	Page       int      `json:"page"`
	Limit      int      `json:"limit"`
	TotalPages int      `json:"totalPages"`
}

type CreateApplicationRequest struct {
	CoverLetter string `json:"coverLetter"`
}

type CreateApplicationResponse struct {
	Message string `json:"message"`
}

type UserDTO struct {
	ID    string  `json:"id"`
	Name  string  `json:"name"`
	Email string  `json:"email"`
	Image *string `json:"image,omitempty"`
}

type CompanyApplicationDTO struct {
	ID          string  `json:"id"`
	User        UserDTO `json:"user"`
	CoverLetter *string `json:"coverLetter,omitempty"`
	Status      string  `json:"status"`
	CreatedAt   int64   `json:"createdAt"`
}

type UpdateCompanyRequest struct {
	Name        *string `json:"name,omitempty"`
	Weblink     *string `json:"weblink,omitempty"`
	LinkedinURL *string `json:"linkedinUrl,omitempty"`
	Number      *string `json:"number,omitempty"`
	Description *string `json:"description,omitempty"`
	Sector      *string `json:"sector,omitempty"`
	Foundation  *string `json:"foundation,omitempty"`
	Size        *string `json:"size,omitempty"`
	Logo        *string `json:"logo,omitempty"`
	Banner      *string `json:"banner,omitempty"`
}

type UpdateCompanyResponse struct {
	Message string `json:"message"`
}

package model

type Status string

type Job struct {
	ID          string `gorm:"primaryKey"`
	Title       string `gorm:"not null"`
	Description string `gorm:"type:text;not null"`

	LocationID *string   `json:"location_id"`
	Location   *Location `gorm:"foreignKey:LocationID" json:"location"`

	SalaryMin      *int
	SalaryMax      *int
	EmploymentType string   `gorm:"not null"`
	IsActive       bool     `gorm:"default:true"`
	CreatedAt      UnixTime `gorm:"autoCreateTime"`
	UpdatedAt      UnixTime `gorm:"autoUpdateTime"`

	CompanyID string  `gorm:"not null;index"`
	Company   Company `gorm:"foreignKey:CompanyID"`

	Applications []Application `gorm:"foreignKey:JobID"`

	Status      string `gorm:"not null"`
	RecruiterID string `gorm:"not null" json:"recruiter_id"`
	Recruiter   User   `gorm:"foreignKey:RecruiterID"`

	Posts []Post `gorm:"foreignKey:JobID"`
}

type Application struct {
	ID          string   `gorm:"primaryKey"`
	CoverLetter *string  `gorm:"type:text"`
	Status      string   `gorm:"default:'pending'"`
	CreatedAt   UnixTime `gorm:"autoCreateTime"`
	UpdatedAt   UnixTime `gorm:"autoUpdateTime"`

	UserID string `gorm:"not null;index"`
	User   User   `gorm:"foreignKey:UserID"`

	JobID string `gorm:"not null;index"`
	Job   Job    `gorm:"foreignKey:JobID"`
}

package model

type Company struct {
	ID          string `gorm:"primaryKey"`
	Name        string `gorm:"not null;index"`
	Weblink     string `gorm:"not null"`
	LinkedinURL string `gorm:"uniqueIndex;not null"`
	Number      string `gorm:"size:20"`
	Description string `gorm:"type:text;not null"`
	Sector      string `gorm:"not null;index"`
	Foundation  string `gorm:"size:4"`
	Size        string `gorm:"not null"`
	Logo        *string
	Banner      *string
	CreatedAt   int64  `gorm:"not null;autoCreateTime"`
	UpdatedAt   int64  `gorm:"not null;autoUpdateTime"`
	UserID      string `gorm:"not null;index"`
	Owner       User   `gorm:"foreignKey:UserID;references:ID"`

	Locations []Location `gorm:"foreignKey:CompanyID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Posts     []Post     `gorm:"foreignKey:CompanyID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Jobs      []Job      `gorm:"foreignKey:CompanyID"`
}
type Location struct {
	ID      string `gorm:"primaryKey"`
	Address string `gorm:"not null"`
	City    string `gorm:"not null"`
	Country string `gorm:"not null"`
	IsHQ    bool   `gorm:"default:false"`

	CompanyID string `gorm:"not null;index"`
}

type Post struct {
	ID        string `gorm:"primaryKey"`
	Content   string `gorm:"type:text;not null"`
	CompanyID string `gorm:"not null;index"`
	CreatedAt int64  `gorm:"autoCreateTime"`
}

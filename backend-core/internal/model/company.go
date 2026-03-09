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

	Location string `gorm:"not null"`
	OwnerID  string `gorm:"index"`
}

type Location struct {
	ID        string   `gorm:"primaryKey"`
	Latitude  *float64 `gorm:"type:decimal(10,8)" json:"latitude"`  // Puntero para que sea opcional
	Longitude *float64 `gorm:"type:decimal(11,8)" json:"longitude"` // Puntero para que sea opcional
	IsHQ      bool     `gorm:"default:false"`
	CompanyID string   `gorm:"not null;index"`
}

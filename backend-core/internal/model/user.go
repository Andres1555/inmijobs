package model

type ConnectionStatus string

const (
	StatusPending  ConnectionStatus = "pending"
	StatusAccepted ConnectionStatus = "accepted"
	StatusBlocked  ConnectionStatus = "blocked"
)

type User struct {
	ID            string   `gorm:"primaryKey"`
	Name          string   `gorm:"not null"`
	Email         string   `gorm:"not null;uniqueIndex"`
	EmailVerified bool     `gorm:"not null;default:false"`
	Image         *string
	CreatedAt     UnixTime `gorm:"not null;autoCreateTime"`
	UpdatedAt     UnixTime `gorm:"not null;autoUpdateTime"`

	Sessions []Session `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Accounts []Account `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Profile  *Profile  `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`

	ConnectionsSent     []Connection `gorm:"foreignKey:RequesterID"`
	ConnectionsReceived []Connection `gorm:"foreignKey:ReceiverID"`
}

type Connection struct {
    ID          string  `gorm:"primaryKey" json:"id"`
    RequesterID string  `gorm:"not null;index" json:"requester_id"`
    Requester   User    `gorm:"foreignKey:RequesterID" json:"-"`
    ReceiverID  string  `gorm:"not null;index" json:"receiver_id"`
    Receiver    User             `gorm:"foreignKey:ReceiverID" json:"-"`
    Status      ConnectionStatus `gorm:"type:text;default:'pending'" json:"status"`
    CreatedAt   UnixTime         `gorm:"not null;autoCreateTime" json:"created_at"`
    UpdatedAt   UnixTime         `gorm:"not null;autoUpdateTime" json:"updated_at"`
	  Sessions  []Session `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	  Accounts  []Account `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	  Companies []Company `gorm:"foreignKey:UserID"`
	  Profile   *Profile  `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type Session struct {
	ID        string   `gorm:"primaryKey"`
	ExpiresAt UnixTime `gorm:"not null"`
	Token     string   `gorm:"not null;uniqueIndex"`
	CreatedAt UnixTime `gorm:"not null;autoCreateTime"`
	UpdatedAt UnixTime `gorm:"not null;autoUpdateTime"`
	IPAddress *string
	UserAgent *string

	UserID string `gorm:"not null"`
	User   User   `gorm:"foreignKey:UserID;references:ID"`
}

type Account struct {
	ID                    string `gorm:"primaryKey"`
	AccountID             string `gorm:"not null"`
	ProviderID            string `gorm:"not null"`
	AccessToken           *string
	RefreshToken          *string
	IDToken               *string
	AccessTokenExpiresAt  *UnixTime `gorm:"type:integer"`
	RefreshTokenExpiresAt *UnixTime `gorm:"type:integer"`
	Scope                 *string
	Password              *string
	CreatedAt             UnixTime `gorm:"not null;autoCreateTime"`
	UpdatedAt             UnixTime `gorm:"not null;autoUpdateTime"`

	UserID string `gorm:"not null"`
	User   User   `gorm:"foreignKey:UserID;references:ID"`
}

type Verification struct {
	ID         string   `gorm:"primaryKey"`
	Identifier string   `gorm:"not null"`
	Value      string   `gorm:"not null"`
	ExpiresAt  UnixTime `gorm:"not null"`
	CreatedAt  UnixTime `gorm:"autoCreateTime"`
	UpdatedAt  UnixTime `gorm:"autoUpdateTime"`
}

type Jwks struct {
	ID         string   `gorm:"primaryKey"`
	PublicKey  string   `gorm:"not null"`
	PrivateKey string   `gorm:"not null"`
	CreatedAt  UnixTime `gorm:"not null;autoCreateTime"`
}

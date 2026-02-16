package database

import (
	"database/sql"
	"log/slog"

	"github.com/Gabo-div/bingo/inmijobs/backend-core/internal/model"

	_ "github.com/tursodatabase/libsql-client-go/libsql"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func NewDatabase() (*gorm.DB, error) {
	db, err := sql.Open("libsql", "http://localhost:8787")

	gormDB, err := gorm.Open(sqlite.New(sqlite.Config{
		Conn: db,
	}), &gorm.Config{})

	if err != nil {
		return nil, err
	}

	gormDB.AutoMigrate(
		&model.User{},
		&model.Session{},
		&model.Account{},
		&model.Verification{},
		&model.Jwks{},
		&model.Profile{},
		&model.Job{},
		&model.Company{},
		&model.Application{},
	)
	slog.Info("[Database] Migrations completed")

	return gormDB, nil
}

package view_history_usecase

import (
	domain_view_history "travel-roadmap/backend/domain/view_history"

	"gorm.io/gorm"
)

type ViewHistoryRepository interface {
	Regist(*gorm.DB, int, int) error
	GetTotalCountByUserId(*gorm.DB, int) (int64, error)
	Get(*gorm.DB, int) ([]domain_view_history.Post, error)
}

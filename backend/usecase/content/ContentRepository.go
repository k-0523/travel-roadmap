package content_usecase

import (
	domain_content "travel-roadmap/backend/domain/content"

	"gorm.io/gorm"
)

type ContentRepository interface {
	Get(db *gorm.DB, post *domain_content.Post, posts *[]domain_content.Post) (err error)
	Search(db *gorm.DB, post *domain_content.Post, posts *[]domain_content.Post) (err error)
	SearchByUserId(*gorm.DB, int) ([]domain_content.Post, error)
}

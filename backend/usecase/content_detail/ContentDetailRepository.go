package content_detail_usecase

import (
	domain_content_detail "travel-roadmap/backend/domain/content_detail"

	"gorm.io/gorm"
)

type ContentDetailRepository interface {
	Create(db *gorm.DB, post *domain_content_detail.Post) (err error)
	Update(db *gorm.DB, post domain_content_detail.Post) (err error)
	Delete(db *gorm.DB, post domain_content_detail.RequestParam) (err error)
	Get(db *gorm.DB, post *domain_content_detail.Post, id int) (err error)
}

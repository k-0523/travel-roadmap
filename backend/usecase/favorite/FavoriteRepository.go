package favorite_usecase

import (
	domain_favorite "travel-roadmap/backend/domain/favorite"

	"gorm.io/gorm"
)

type FavoriteRepository interface {
	UpdateFavorite(*gorm.DB, domain_favorite.Favorite) (bool, error)
	GetStatus(*gorm.DB, int, int) (bool, error)
	GetCountFavorites(*gorm.DB, int) (int64, error)
	SearchWithContents(db *gorm.DB, userId int) ([]domain_favorite.FavoriteWithContents, error)
}

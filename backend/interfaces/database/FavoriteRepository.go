package database

import (
	"errors"
	domain_favorite "travel-roadmap/backend/domain/favorite"

	"gorm.io/gorm"
)

type FavoriteRepository struct{}

func (repo *FavoriteRepository) UpdateFavorite(db *gorm.DB, favorite domain_favorite.Favorite) (isFavorited bool, err error) {
	err = db.Table("favorites").
		Where("user_id = ? AND post_id = ?", favorite.UserID, favorite.PostID).
		First(&favorite).
		Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		db.Table("favorites").Create(&favorite)
		return true, nil
	}

	result := db.Table("favorites").
		Where("user_id = ? AND post_id = ?", favorite.UserID, favorite.PostID).
		Delete(&favorite)
	if result.Error != nil {
		return true, result.Error
	}
	return false, nil
}

func (repo *FavoriteRepository) GetCountFavorites(db *gorm.DB, postID int) (count int64, err error) {
	var cf int64
	result := db.Table("favorites").
		Where("post_id = ?", postID).
		Count(&cf)
	if result.Error != nil {
		return cf, result.Error
	}
	return cf, nil
}

func (repo *FavoriteRepository) GetStatus(db *gorm.DB, userID int, postID int) (isFavorited bool, err error) {
	err = db.Table("favorites").
		Where("user_id = ? AND post_id = ?", userID, postID).
		First(&domain_favorite.Favorite{}).
		Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return false, nil
	}
	return true, nil
}

func (repo *FavoriteRepository) SearchWithContents(db *gorm.DB, userId int) (result []domain_favorite.FavoriteWithContents, err error) {
	err = db.Debug().Model(domain_favorite.Favorite{}).
		Select("favorites.*,posts.image_path,posts.title").
		Joins("left join posts on posts.id = favorites.post_id").
		Where("favorites.user_id = ? ", userId).
		Find(&result).Error

	if err != nil {
		return result, err
	}
	return

}

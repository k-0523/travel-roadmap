package database

import (
	domain_view_history "travel-roadmap/backend/domain/view_history"

	"gorm.io/gorm"
)

type ViewHistoryRepository struct{}

func (repo *ViewHistoryRepository) Regist(db *gorm.DB, userID int, postID int) (err error) {
	result := db.Model(domain_view_history.ViewHistory{}).Create(&domain_view_history.ViewHistory{UserID: userID, PostID: postID})
	if result.Error != nil {
		return result.Error
	}
	return
}

func (repo *ViewHistoryRepository) GetTotalCountByUserId(db *gorm.DB, userId int) (count int64, err error) {
	if err := db.Model(domain_view_history.ViewHistory{}).Where("user_id = ?", userId).Count(&count).Error; err != nil {
		return count, err
	}
	return count, nil
}

func (repo *ViewHistoryRepository) Get(db *gorm.DB, userID int) (posts []domain_view_history.Post, err error) {
	var viewHistories []domain_view_history.ViewHistory
	db.Table("view_histories").Select([]string{"post_id"}).Where("user_id = ?", userID).Group("post_id").Find(&viewHistories)
	ids := []int{}
	for _, viewHistory := range viewHistories {
		ids = append(ids, viewHistory.PostID)
	}

	result := db.Table("posts").
		Preload("Favorites", "user_id = ?", userID).
		Preload("ViewHistories").
		Where("posts.id IN (?)", ids).
		Where("posts.data_status <> ?", 9).
		Order("posts.created_at desc").
		Find(&posts)

	if result.Error != nil {
		return nil, result.Error
	}
	return posts, nil
}

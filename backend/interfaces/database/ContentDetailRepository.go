package database

import (
	domain_content_detail "travel-roadmap/backend/domain/content_detail"

	"gorm.io/gorm"
)

type ContentDetailRepository struct{}

func (repo *ContentDetailRepository) Create(db *gorm.DB, post *domain_content_detail.Post) (err error) {
	result := db.Create(&post)
	if result.Error != nil {
		return result.Error
	}
	return
}

func (repo *ContentDetailRepository) Update(db *gorm.DB, post domain_content_detail.Post) (err error) {
	db.Delete(&domain_content_detail.PostTag{}, "post_id = ?", post.ID)
	result := db.Session(&gorm.Session{FullSaveAssociations: true}).Save(&post)
	if result.Error != nil {
		return result.Error
	}
	return
}

func (repo *ContentDetailRepository) Delete(db *gorm.DB, post domain_content_detail.RequestParam) (err error) {
	result := db.Table("posts").Where("id = ?", post.PostID).Update("data_status", 9)
	if result.Error != nil {
		return result.Error
	}
	return
}

func (repo *ContentDetailRepository) Get(db *gorm.DB, post *domain_content_detail.Post, id int) (err error) {
	result := db.Table("posts").
		Preload("Schedule").
		Preload("Schedule.ScheduleDetail", "data_status = ?", 0).
		Preload("Schedule.ScheduleDetail.ScheduleDetailImage").
		Preload("Schedule.TravelArea").
		Preload("User").
		Preload("User.UserProfile").
		Preload("Tag").
		Preload("Precaution").
		Preload("Buggage").
		Preload("ShoppingList").
		Preload("ViewHistories").
		Preload("Favorites").
		Preload("Comments").
		First(&post, id)
	if result.Error != nil {
		return result.Error
	}
	return
}

package database

import (
	domain_comment "travel-roadmap/backend/domain/comment"

	"gorm.io/gorm"
)

type CommentRepository struct{}

func (repo *CommentRepository) Create(db *gorm.DB, comment domain_comment.Comment) (err error) {
	result := db.Create(&comment)
	if result.Error != nil {
		return result.Error
	}
	return
}

func (repo *CommentRepository) GetCommentList(db *gorm.DB, comments *[]domain_comment.Comment, id string) (err error) {
	result := db.Where("post_id = ?", id).
		Preload("User").
		// Preload("Profile"). // TODO:アイコン表示するためにプロフィールも読み込む
		Order("created_at desc").
		Find(&comments)
	if result.Error != nil {
		return result.Error
	}
	return
}

func (repo *CommentRepository) GetCountComments(db *gorm.DB, postID int) (count int64, err error) {
	var cm int64
	result := db.Table("comments").
		Where("post_id = ?", postID).
		Count(&cm)
	if result.Error != nil {
		return cm, result.Error
	}
	return cm, nil
}

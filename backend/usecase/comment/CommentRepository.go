package comment_usecase

import (
	domain_comment "travel-roadmap/backend/domain/comment"

	"gorm.io/gorm"
)

type CommentRepository interface {
	Create(db *gorm.DB, comment domain_comment.Comment) (err error)
	GetCommentList(db *gorm.DB, comment *[]domain_comment.Comment, id string) (err error)
	GetCountComments(db *gorm.DB, postID int) (count int64, err error)
}

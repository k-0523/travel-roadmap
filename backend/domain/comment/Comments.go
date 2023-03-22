package domain_comment

import (
	"time"

	"github.com/golang-module/carbon/v2"
)

type Comment struct {
	ID        int    `gorm:"primaryKey"`
	UserID    int    `gorm:"json:"userID"`
	PostID    int    `json:"postID"`
	Comment   string `json:"comment"`
	User      User   `gorm:"joinForeignKey:UserID"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type User struct {
	UserID      int         `gorm:"primaryKey" json:"userID"`
	UserName    string      `json:"userName"`
	UserProfile UserProfile `gorm:"foreignKey:UserProfileID""`
}

type UserProfile struct {
	UserProfileID int `gorm:"primaryKey"`
	UserID        int
	Name          string `json:"name"`
	ImagePath     string `json:"imagePath"`
}

type ResponseComment struct {
	PostID    int    `json:"postID"`
	UserID    int    `json:"userID"`
	UserName  string `json:"userName"`
	ImagePath string `json:"imagePath"`
	Comment   string `json:"comment"`
	DaysAgo   int64  `json:"daysAgo"`
}

func (c *Comment) MakeResponse() ResponseComment {
	comment := ResponseComment{}
	comment.PostID = c.PostID
	comment.UserID = c.UserID
	comment.UserName = c.User.UserName
	comment.ImagePath = c.User.UserProfile.ImagePath
	comment.Comment = c.Comment

	// 何日前か計算
	comment.DaysAgo = carbon.Parse(carbon.Now().ToDateTimeString()).
		DiffInDaysWithAbs(carbon.Parse(carbon.Time2Carbon(c.CreatedAt).ToDateTimeString()))
	return comment
}

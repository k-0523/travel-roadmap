package domain_favorite

import "time"

type Favorite struct {
	ID        int `gorm:"primaryKey"`
	UserID    int `json:"userID"`
	PostID    int `json:"postID"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type FavoriteWithContents struct {
	ID        int    `gorm:"primaryKey"`
	UserID    int    `json:"userId"`
	PostID    int    `json:"postId"`
	Title     string `json:"title"`
	ImagePath string `json:"imagePath"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

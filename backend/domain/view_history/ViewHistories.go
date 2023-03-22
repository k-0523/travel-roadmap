package domain_view_history

import "time"

type ViewHistory struct {
	ID        int `gorm:"primaryKey"`
	UserID    int `json:"userID"`
	PostID    int `json:"postID"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Post struct {
	ID            int    `gorm:"primaryKey"`
	UserID        int    `json:"userID"`
	Title         string `json:"title"`
	ImagePath     string
	CreatedAt     time.Time
	Favorites     []Favorite    `gorm:"foreignKey:PostID"`
	ViewHistories []ViewHistory `gorm:"foreignKey:PostID"`
}

type Favorite struct {
	ID     int `gorm:"primaryKey"`
	UserID int
	PostID int
}

type ResponseViewHistory struct {
	ID          int       `json:"ID"`
	UserID      int       `json:"userID"`
	Title       string    `json:"title"`
	ImagePath   string    `json:"imagePath"`
	CreatedAt   time.Time `json:"createdAt"`
	IsFavorited bool      `json:"isFavorited"`
	CountViews  int       `json:"countViews"`
}

func (p *Post) MakeResponse() ResponseViewHistory {
	res := ResponseViewHistory{}
	res.ID = p.ID
	res.UserID = p.UserID
	res.Title = p.Title
	res.CreatedAt = p.CreatedAt
	res.IsFavorited = false
	if len(p.Favorites) > 0 {
		res.IsFavorited = true
	}
	res.CountViews = len(p.ViewHistories)
	res.ImagePath = p.ImagePath
	return res
}

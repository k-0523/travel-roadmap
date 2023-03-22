package domain_content

import (
	"time"
)

type Post struct {
	ID            int    `gorm:"primaryKey"`
	UserID        int    `json:"userID"`
	Title         string `json:"title"`
	ImagePath     string `json:"imagePath"`
	CreatedAt     time.Time
	Favorites     []Favorite    `gorm:"foreignKey:PostID"`
	ViewHistories []ViewHistory `gorm:"foreignKey:PostID"`
	SearchParam   SearchParam   `json:"searchParam" gorm:"-"`
}

type SearchParam struct {
	Keyword        string `json:"keyword" gorm:"-"`
	SortCreatedAt  string `json:"sortCreatedAt" gorm:"-"`
	Accompany      string `json:"accompany" gorm:"-"`
	NumberOfPerson string `json:"numberOfPerson" gorm:"-"`
	Month          string `json:"month" gorm:"-"`
	Nights         string `json:"nights" gorm:"-"`
	Days           string `json:"days" gorm:"-"`
	Currency       string `json:"currency" gorm:"-"`
	FromBudget     string `json:"fromBudget" gorm:"-"`
	ToBudget       string `json:"toBudget" gorm:"-"`
	Country        string `json:"country" gorm:"-"`
	Prefecture     string `json:"prefecture" gorm:"-"`
	City           string `json:"city" gorm:"-"`
}

type Favorite struct {
	ID     int `gorm:"primaryKey"`
	UserID int
	PostID int
}

type ViewHistory struct {
	ID     int `gorm:"primaryKey"`
	UserID int
	PostID int
}

type ResponseSearchedContent struct {
	ID          int       `json:"ID"`
	UserID      int       `json:"userID"`
	Title       string    `json:"title"`
	ImagePath   string    `json:"imagePath"`
	CreatedAt   time.Time `json:"createdAt"`
	IsFavorited bool      `json:"isFavorited"`
	CountViews  int       `json:"countViews"`
}

func (p *Post) MakeResponse() ResponseSearchedContent {
	res := ResponseSearchedContent{}
	res.ID = p.ID
	res.UserID = p.UserID
	res.Title = p.Title
	res.ImagePath = p.ImagePath
	res.CreatedAt = p.CreatedAt
	res.IsFavorited = false
	if len(p.Favorites) > 0 {
		res.IsFavorited = true
	}
	res.CountViews = len(p.ViewHistories)
	return res
}

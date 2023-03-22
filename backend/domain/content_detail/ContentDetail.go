package domain_content_detail

import (
	"time"
)

type Post struct {
	ID                      int       `json:"ID" gorm:"primaryKey"`
	UserID                  int       `json:"userID"`
	Title                   string    `json:"title" binding:"required"`
	ImagePath               string    `json:"thumbnail" binding:"-"`
	FromDate                string    `json:"fromDate" binding:"required"`
	ToDate                  string    `json:"toDate" binding:"required"`
	Nights                  int       `json:"nights" binding:"required"`
	Days                    int       `json:"days" binding:"required"`
	AccompanyPersonCategory int       `json:"accompanyPersonCategory" binding:"required"`
	NumberOfPerson          int       `json:"numberOfPerson" binding:"required"`
	Budget                  int       `json:"budget" binding:"required"`
	Currency                int       `json:"currency" binding:"required"`
	DepatureCountry         string    `json:"depatureCountry" binding:"required"`
	DepaturePrefecture      string    `json:"depaturePrefecture" binding:"required"`
	DepatureCity            string    `json:"depatureCity" binding:"required"`
	Thought                 string    `json:"thought"`
	DataStatus              int       `json:"dataStatus"`
	CreatedAt               time.Time `json:"createdAt"`
	UpdatedAt               time.Time
	User                    User           `gorm:"joinForeignKey:UserID"`
	Tag                     []Tag          `json:"tags" binding:"dive,required" gorm:"many2many:post_tags"`
	Schedule                []Schedule     `json:"schedules" binding:"dive" gorm:"foreignKey:PostID"`
	Precaution              []Precaution   `json:"precautions" binding:"dive" gorm:"foreignKey:PostID"`
	Buggage                 []Buggage      `json:"buggages" binding:"dive" gorm:"foreignKey:PostID"`
	ShoppingList            []ShoppingList `json:"shoppingLists" binding:"dive" gorm:"foreignKey:PostID"`
	Favorites               []Favorite     `gorm:"foreignKey:PostID"`
	ViewHistories           []ViewHistory  `gorm:"foreignKey:PostID"`
	Comments                []Comment      `gorm:"foreignKey:PostID"`
}

type User struct {
	UserID      int         `gorm:"primaryKey"`
	UserName    string      `json:"userName"`
	UserProfile UserProfile `gorm:"foreignKey:UserProfileID""`
}

type UserProfile struct {
	UserProfileID int `gorm:"primaryKey"`
	UserID        int
	Name          string `json:"name"`
	ImagePath     string `json:"imagePath"`
}

type PostTag struct {
	ID     int `gorm:"primaryKey"`
	PostID int
	TagID  int
}

type Tag struct {
	ID        int    `gorm:"primaryKey" json:"id"`
	Name      string `json:"name" binding:"required"`
	CreatedAt time.Time
	UpdatedAt time.Time
	Post      []Post `gorm:"many2many:post_tags"`
}

type Schedule struct {
	ID             int `gorm:"primaryKey" json:"id"`
	PostID         int `json:"postID"`
	Day            int `json:"day"`
	DataStatus     int
	CreatedAt      time.Time
	UpdatedAt      time.Time
	ScheduleDetail []ScheduleDetail `json:"scheduleDetails" binding:"dive" gorm:"foreignKey:ScheduleID"`
	TravelArea     []TravelArea     `json:"travelArea" binding:"dive" gorm:"foreignKey:ScheduleID"`
}

type Precaution struct {
	ID         int    `gorm:"primaryKey" json:"id"`
	PostID     int    `json:"postID"`
	Precaution string `json:"precaution"`
	DataStatus int
	CreatedAt  time.Time
	UpdatedAt  time.Time
}

type Buggage struct {
	ID         int    `gorm:"primaryKey" json:"id"`
	PostID     int    `json:"postID"`
	Name       string `json:"name"`
	DataStatus int
	CreatedAt  time.Time
	UpdatedAt  time.Time
}

type ShoppingList struct {
	ID         int    `gorm:"primaryKey" json:"id"`
	PostID     int    `json:"postID"`
	Name       string `json:"name"`
	Memo       string `json:"memo"`
	DataStatus int
	CreatedAt  time.Time
	UpdatedAt  time.Time
}

type ScheduleDetail struct {
	ID                  int    `gorm:"primaryKey" json:"id"`
	ScheduleID          int    `json:"scheduleID"`
	Time                string `json:"time" binding:"required"`
	Transportation      int    `json:"transportation" binding:"required"`
	Title               string `json:"title" binding:"required"`
	Place               string `json:"place" binding:"required"`
	Url                 string `json:"url"`
	Content             string `json:"content"`
	DataStatus          int    `json:"dataStatus"`
	CreatedAt           time.Time
	UpdatedAt           time.Time
	ScheduleDetailImage []ScheduleDetailImage `json:"scheduleDetailImages" binding:"dive" gorm:"foreignKey:ScheduleDetailID"`
}

type TravelArea struct {
	ID         int    `gorm:"primaryKey"`
	ScheduleID int    `json:"scheduleID"`
	Country    string `json:"country" binding:"required"`
	Prefecture string `json:"prefecture" binding:"required"`
	City       string `json:"city" binding:"required"`
}

type ScheduleDetailImage struct {
	ID               int `gorm:"primaryKey"`
	ScheduleDetailID int
	ImagePath        string `json:"imagePath"`
	SignedUrl        string `json:"signedUrl" gorm:"-"`
	DataStatus       int
	CreatedAt        time.Time
	UpdatedAt        time.Time
}

type TravelDestination struct {
	ID           int `gorm:"primaryKey"`
	ScheduleID   int
	GeographiyID int
	DataStatus   int
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

type Favorite struct {
	ID     int `gorm:"primaryKey"`
	PostID int
}

type ViewHistory struct {
	ID     int `gorm:"primaryKey"`
	PostID int
}

type Comment struct {
	ID     int `gorm:"primaryKey"`
	PostID int
}

type RequestParam struct {
	PostID int `json:"postID"`
	UserID int `json:"userID"`
}

type ResponseContentDetail struct {
	PostID                  int            `json:"ID"`
	UserID                  int            `json:"userID"`
	UserName                string         `json:"userName"`
	Title                   string         `json:"title"`
	ImagePath               string         `json:"thumbnail"`
	FromDate                string         `json:"fromDate"`
	ToDate                  string         `json:"toDate"`
	Nights                  int            `json:"nights"`
	Days                    int            `json:"days"`
	AccompanyPersonCategory int            `json:"accompanyPersonCategory"`
	NumberOfPerson          int            `json:"numberOfPerson"`
	Budget                  int            `json:"budget"`
	Currency                int            `json:"currency"`
	DepatureCountry         string         `json:"depatureCountry"`
	DepaturePrefecture      string         `json:"depaturePrefecture"`
	DepatureCity            string         `json:"depatureCity"`
	Thought                 string         `json:"thought"`
	CreatedAt               time.Time      `json:"createdAt"`
	Tag                     []Tag          `json:"tags"`
	Schedule                []Schedule     `json:"schedules"`
	Precaution              []Precaution   `json:"precautions"`
	Buggage                 []Buggage      `json:"buggages"`
	ShoppingList            []ShoppingList `json:"shoppingLists"`
	Name                    string         `json:"name"`
	ProfileImagePath        string         `json:"profileImagePath"`
	CountViews              int            `json:"countViews"`
	CountFavorites          int            `json:"countFavorites"`
	CountComments           int            `json:"countComments"`
	IsEnableEdit            bool           `json:"isEnableEdit"`
	IsFavorited             bool           `json:"isFavorited"`
}

func (p *Post) MakeResponse() ResponseContentDetail {
	rcd := ResponseContentDetail{}
	rcd.PostID = p.ID
	rcd.UserID = p.UserID
	rcd.UserName = p.User.UserName
	rcd.Title = p.Title
	rcd.ImagePath = p.ImagePath
	rcd.FromDate = p.FromDate
	rcd.ToDate = p.ToDate
	rcd.Nights = p.Nights
	rcd.Days = p.Days
	rcd.AccompanyPersonCategory = p.AccompanyPersonCategory
	rcd.NumberOfPerson = p.NumberOfPerson
	rcd.Budget = p.Budget
	rcd.Currency = p.Currency
	rcd.DepatureCountry = p.DepatureCountry
	rcd.DepaturePrefecture = p.DepaturePrefecture
	rcd.DepatureCity = p.DepatureCity
	rcd.Thought = p.Thought
	rcd.CreatedAt = p.CreatedAt
	rcd.Tag = p.Tag
	rcd.Schedule = p.Schedule
	rcd.Precaution = p.Precaution
	rcd.Buggage = p.Buggage
	rcd.ShoppingList = p.ShoppingList
	rcd.Name = p.User.UserProfile.Name
	rcd.ProfileImagePath = p.User.UserProfile.ImagePath
	rcd.CountViews = len(p.ViewHistories)
	rcd.CountFavorites = len(p.Favorites)
	rcd.CountComments = len(p.Comments)

	return rcd
}

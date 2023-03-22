package domain_follow

import "time"

type Follow struct {
	FollowUserId   int       `json:"followUserId"`
	FollowerUserId int       `json:"followerUserId"`
	CreatedAt      time.Time `json:"CreatedAt"`
	UpdatedAt      time.Time `json:"UpdatedAt"`
}

type FollowingUsers struct {
	UserId    int    `json:"userId"`
	Email     string `json:"email"`
	UserName  string `json:"userName"`
	ImagePath string `json:"imagePath"`
}

type Followers struct {
	UserId    int    `json:"userId"`
	Email     string `json:"email"`
	UserName  string `json:"userName"`
	ImagePath string `json:"imagePath"`
}

type FollowingUsersWithCount struct {
	UserId         int    `json:"userId"`
	FollowUserId   int    `json:"followUserId"`
	FollowerUserId int    `json:"followerUserId"`
	Email          string `json:"email"`
	UserName       string `json:"userName"`
	ImagePath      string `json:"imagePath"`
	Count          int    `json:"isFollowingCount" gorm:"column:count"`
}

type FollowerWithCount struct {
	UserId         int    `json:"userId"`
	FollowUserId   int    `json:"followUserId"`
	FollowerUserId int    `json:"followerUserId"`
	Email          string `json:"email"`
	UserName       string `json:"userName"`
	ImagePath      string `json:"imagePath"`
	Count          int    `json:"isFollowingCount" gorm:"column:count"`
}

package follow_usecase

import (
	domain_follow "travel-roadmap/backend/domain/follow"

	"gorm.io/gorm"
)

type FollowRepositroy interface {
	Create(*gorm.DB, domain_follow.Follow) error
	Delete(*gorm.DB, int, int) error
	Exists(*gorm.DB, int, int) (bool, error)
	SearchFollowingUsers(*gorm.DB, int) ([]domain_follow.FollowingUsersWithCount, error)
	SearchFollowingUsersWithCount(*gorm.DB, int, int) ([]domain_follow.FollowingUsersWithCount, error)
	SearchFollowerWithCount(*gorm.DB, int, int) ([]domain_follow.FollowerWithCount, error)
	SearchFollower(*gorm.DB, int) ([]domain_follow.Followers, error)
	GetFollowingUserCount(*gorm.DB, int) (int64, error)
	GetFollowerCount(*gorm.DB, int) (int64, error)
}

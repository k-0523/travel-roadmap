package user_profile_usecase

import (
	domain_user "travel-roadmap/backend/domain/user"

	"gorm.io/gorm"
)

type UserProfileRepository interface {
	UpdateOrCreate(*gorm.DB, *domain_user.UserProfile) error
}

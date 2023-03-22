package auth_usecase

import (
	domain_user_session "travel-roadmap/backend/domain/user_session"

	"gorm.io/gorm"
)

type AuthRepository interface {
	DeleteUserSession(*gorm.DB, domain_user_session.UserSession) error
}

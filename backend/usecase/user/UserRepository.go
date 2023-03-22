package user_usecase

import (
	domain_user "travel-roadmap/backend/domain/user"
	domain_user_session "travel-roadmap/backend/domain/user_session"

	"gorm.io/gorm"
)

type UserRepositroy interface {
	Create(*gorm.DB, *domain_user.User) error
	Delete(*gorm.DB, domain_user.User) error
	Find(*gorm.DB, int) (domain_user.User, error)
	FindByUUID(db *gorm.DB, user domain_user.User) (err error)
	FindForSignIn(db *gorm.DB, user domain_user.User) (domain_user.User, error)
	CreateSession(*gorm.DB, domain_user_session.UserSession) error
	FindSession(*gorm.DB, string) (domain_user_session.UserSession, error)
	Exists(*gorm.DB, int) (exists bool, err error)
	ExistsTmpUser(*gorm.DB, string) (exists bool, err error)
	ExistsPasswordToken(*gorm.DB, *domain_user.PasswordConfirm) (exists bool, err error)
	ConfirmTmpUser(*gorm.DB, string) error
	ConfirmNewEmail(*gorm.DB, string) error
	MatchHashedPassword(*gorm.DB, *domain_user.UpdateUserPassword) error
	UpdatePassowrd(*gorm.DB, *domain_user.UpdateUserPassword) error
	UpdateEmail(*gorm.DB, *domain_user.UpdateEmail) error
	UpdatePrivate(*gorm.DB, *domain_user.User, int) error
	PasswordConfirm(*gorm.DB, *domain_user.PasswordConfirm) error
	UpdateUserName(*gorm.DB, *domain_user.UpdateUserName) error
	ExistsUserName(*gorm.DB, *domain_user.UpdateUserName) (bool, error)
	ExistsEmail(*gorm.DB, *domain_user.UpdateEmail) (bool, error)
	ExistsTmpEmail(*gorm.DB, *domain_user.User) (bool, error)
	PasswordReset(*gorm.DB, *domain_user.PasswordSetting) error
}

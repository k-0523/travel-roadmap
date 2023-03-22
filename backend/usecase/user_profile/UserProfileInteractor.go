package user_profile_usecase

import (
	"log"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/usecase"
)

type UserProfileInteractor struct {
	DB          usecase.DBRepository
	UserProfile UserProfileRepository
}

func (interctor *UserProfileInteractor) UpdateOrCreate(user *domain_user.UserProfile) error {
	db := interctor.DB.Connect()
	// 重複チェック
	if err := interctor.UserProfile.UpdateOrCreate(db, user); err != nil {
		log.Print(user)
		log.Print(1)
		return err
	}

	return nil
}

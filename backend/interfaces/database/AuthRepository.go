package database

import (
	domain_user_session "travel-roadmap/backend/domain/user_session"

	"gorm.io/gorm"
)

/*********************************
* infrastructureに依存するレイヤー
* dbとやり取りするレイヤー
*********************************/
type AuthRepository struct {
}

func (*AuthRepository) DeleteUserSession(db *gorm.DB, session domain_user_session.UserSession) error {

	if result := db.Delete(&session); result.Error != nil {
		return result.Error
	}

	return nil
}

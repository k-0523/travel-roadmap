package database

import (
	domain_user "travel-roadmap/backend/domain/user"

	"gorm.io/gorm"
)

type UserProfileRepository struct{}

// infrastructure(DB)に依存するレイヤー
func (r *UserProfileRepository) UpdateOrCreate(db *gorm.DB, user *domain_user.UserProfile) (err error) {
	var count int64
	if db.Debug().Model(&user).Where("user_id = ?", user.UserId).Count(&count); count == 0 {
		if err := db.Model(&user).Create(&user).Error; err != nil {
			return err
		}
	} else {
		if err := db.Debug().Model(&user).Where("user_id = ?", user.UserId).Updates(&user).Error; err != nil {
			return err
		}
	}

	return nil
}

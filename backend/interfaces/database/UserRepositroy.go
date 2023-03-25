package database

import (
	"errors"
	"time"
	"travel-roadmap/backend/consts"
	domain_user "travel-roadmap/backend/domain/user"
	domain_user_session "travel-roadmap/backend/domain/user_session"

	"gorm.io/gorm"
)

type UserRepositroy struct{}

// infrastructureに依存するレイヤー
func (r *UserRepositroy) Delete(db *gorm.DB, user domain_user.User) error {
	if err := db.Debug().Delete(&user).Error; err != nil {
		return err
	}
	return nil
}

func (r *UserRepositroy) ExistsPasswordToken(db *gorm.DB, user *domain_user.PasswordConfirm) (exists bool, err error) {
	err = db.Model(domain_user.User{}).Debug().
		Where("password_token = ?", user.PasswordToken).
		First(&exists).
		Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return false, nil
		}
	}
	return true, nil
}

func (r *UserRepositroy) UpdatePassowrd(db *gorm.DB, user *domain_user.UpdateUserPassword) error {
	if err := db.Model(&domain_user.User{}).
		Where("user_id = ? ", user.UserId).
		Update("password", user.NewPassword).Error; err != nil {
		return err
	}
	return nil
}

func (r *UserRepositroy) UpdateUserName(db *gorm.DB, user *domain_user.UpdateUserName) error {
	if err := db.Model(&domain_user.User{}).
		Where("user_id = ? ", user.UserId).
		Update("UserName", user.UserName).Error; err != nil {
		return err
	}
	return nil
}

func (r *UserRepositroy) UpdateEmail(db *gorm.DB, user *domain_user.UpdateEmail) error {
	if err := db.Debug().Model(&domain_user.User{}).
		Where("user_id = ? ", user.UserId).
		Updates(map[string]interface{}{"new_email": user.NewEmail, "new_email_verify_token": user.NewEmailVerifyToken}).Error; err != nil {
		return err
	}
	return nil
}

func (r *UserRepositroy) PasswordConfirm(db *gorm.DB, user *domain_user.PasswordConfirm) error {
	if err := db.Debug().Model(&domain_user.User{}).
		Where("password_token = ? ", user.PasswordToken).
		Updates(map[string]interface{}{
			"password_token": gorm.Expr("NULL"),
			"password":       user.NewPassword,
		}).Error; err != nil {
		return err
	}

	return nil
}

func (r *UserRepositroy) UpdatePrivate(db *gorm.DB, user *domain_user.User, updateFlag int) error {
	if err := db.Debug().Model(&domain_user.User{}).
		Where("user_id = ? ", user.UserId).
		Update("IsPrivate", updateFlag).Error; err != nil {
		return err
	}
	return nil
}

func (r *UserRepositroy) ExistsUserName(db *gorm.DB, user *domain_user.UpdateUserName) (exists bool, err error) {
	err = db.Model(domain_user.User{}).Debug().
		Where("user_name = ? and user_id <> ?", user.UserName, user.UserId).
		First(&exists).
		Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return false, nil
		}
	}
	return true, nil
}

func (r *UserRepositroy) ExistsEmail(db *gorm.DB, user *domain_user.UpdateEmail) (exists bool, err error) {
	err = db.Model(domain_user.User{}).Debug().
		Where("email = ? or new_email = ? and user_id <> ?", user.NewEmail, user.NewEmail, user.UserId).
		First(&exists).
		Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return false, nil
		}
	}
	return true, nil
}

func (r *UserRepositroy) ExistsTmpEmail(db *gorm.DB, user *domain_user.User) (exists bool, err error) {
	err = db.Model(domain_user.User{}).Debug().
		Where("email = ? or new_email = ? ", user.Email, user.Email).
		First(&exists).
		Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return false, nil
		}
	}
	return true, nil
}

// ハッシュ化したパスワードとマッチ判定
func (r *UserRepositroy) MatchHashedPassword(db *gorm.DB, user *domain_user.UpdateUserPassword) error {
	var exists bool
	err := db.Model(domain_user.User{}).Debug().
		Where("user_id = ? and password = ?", user.UserId, user.Password).
		First(&exists).
		Error

	if err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}
	return nil
}

func (r *UserRepositroy) Create(db *gorm.DB, user *domain_user.User) (err error) {
	if err := db.Create(&user).Error; err != nil {
		return err
	}
	return nil
}

func (r *UserRepositroy) Find(db *gorm.DB, userId int) (user domain_user.User, err error) {
	if err := db.
		Joins("UserProfile").
		Find(&user, "users.user_id = ?", userId).Error; err != nil {
		return user, err
	}

	return user, nil
}

func (r *UserRepositroy) FindByUUID(db *gorm.DB, user domain_user.User) (err error) {
	// TODO: 検索
	if err := db.Create(&user).Error; err != nil {
		return err
	}

	return nil
}

func (r *UserRepositroy) FindForSignIn(db *gorm.DB, u domain_user.User) (domain_user.User, error) {
	if err := db.Model(domain_user.User{}).Where("email = ? AND user_status = ?", u.Email, consts.CODE_USER_STATUS_REGISTERD).First(&u).Error; err != nil {
		return u, err
	}

	return u, nil
}

// NOTE: ここに書くべきじゃない
func (r *UserRepositroy) CreateSession(db *gorm.DB, session domain_user_session.UserSession) error {
	if err := db.Create(&session).Error; err != nil {
		return err
	}

	return nil
}

// NOTE: ここに書くべきじゃない（ログアウト用）
func (r *UserRepositroy) DeleteSession(db *gorm.DB, session domain_user_session.UserSession) error {
	if err := db.Delete(&session).Error; err != nil {
		return err
	}

	return nil
}

// NOTE: ここに書くべきじゃない AuthRepository
func (r *UserRepositroy) FindSession(db *gorm.DB, sessionId string) (session domain_user_session.UserSession, err error) {
	if err := db.Where("session_id = ?", sessionId).First(&session).Error; err != nil {
		return session, err
	}
	return session, nil
}

func (r *UserRepositroy) Exists(db *gorm.DB, userId int) (exists bool, err error) {
	err = db.Model(domain_user.User{}).Debug().
		Where("user_id = ?", userId).
		First(&exists).
		Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return false, nil
		}
	}
	return true, nil
}

func (r *UserRepositroy) ExistsTmpUser(db *gorm.DB, uuid string) (exists bool, err error) {
	err = db.Model(domain_user.User{}).
		Where("tmp_register_uuid = ? AND user_status = ? ", uuid, consts.CODE_USER_STATUS_TMP).
		First(&exists).
		Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return false, nil
		}
	}

	return true, nil
}
func (r *UserRepositroy) ConfirmTmpUser(db *gorm.DB, uuid string) (err error) {
	if err := db.Model(&domain_user.User{}).
		Where("tmp_register_uuid = ? ", uuid).
		Updates(map[string]interface{}{
			"tmp_register_uuid": gorm.Expr("NULL"),
			"user_status":       consts.CODE_USER_STATUS_REGISTERD,
			"email_verified_at": time.Now(),
		}).Error; err != nil {
		return err
	}
	return nil
}

func (r *UserRepositroy) PasswordReset(db *gorm.DB, password *domain_user.PasswordSetting) (err error) {
	if err := db.Debug().Model(&domain_user.User{}).
		Where("email = ? ", password.Email).
		Update("PasswordToken", password.PasswordToken); err != nil && err.RowsAffected != 0 {
		return err.Error
	}

	return nil
}

func (r *UserRepositroy) ConfirmNewEmail(db *gorm.DB, uuid string) (err error) {
	if err := db.Model(&domain_user.User{}).
		Where("new_email_verify_token = ? ", uuid).
		Updates(map[string]interface{}{
			"new_email_verify_token": gorm.Expr("NULL"),
			"new_email":              gorm.Expr("NULL"),
			"email":                  gorm.Expr("new_email"),
			"email_verified_at":      time.Now(),
		}); err != nil && err.RowsAffected == 0 {
		return err.Error
	}
	return nil
}

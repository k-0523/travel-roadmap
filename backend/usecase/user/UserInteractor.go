package user_usecase

import (
	"travel-roadmap/backend/consts"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/usecase"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

/************************
* ビジネスロジック層
************************/

type UserInteractor struct {
	DB   usecase.DBRepository
	User UserRepositroy
}

func (interctor *UserInteractor) Withdrawal(user domain_user.User) error {
	db := interctor.DB.Connect()

	if err := interctor.User.Delete(db, user); err != nil {
		return err
	}
	return nil
}

func (interctor *UserInteractor) UpdatePassowrd(user *domain_user.UpdateUserPassword) error {
	db := interctor.DB.Connect()

	passowrd := []byte(user.NewPassword)
	hashed, err := bcrypt.GenerateFromPassword(passowrd, 10)
	if err != nil {
		return err
	}
	user.NewPassword = string(hashed)

	if err := interctor.User.UpdatePassowrd(db, user); err != nil {
		return err
	}
	return nil
}
func (interctor *UserInteractor) ExistsUserName(user *domain_user.UpdateUserName) bool {
	db := interctor.DB.Connect()

	// 対象ユーザー名の使用可否
	if exists, _ := interctor.User.ExistsUserName(db, user); exists {
		return true
	}
	return false
}

func (interctor *UserInteractor) ExistsEmail(user *domain_user.UpdateEmail) bool {
	db := interctor.DB.Connect()

	// 対象ユーザー名の使用可否
	if exists, _ := interctor.User.ExistsEmail(db, user); exists {
		return true
	}
	return false
}

func (interctor *UserInteractor) UpdateUserName(user *domain_user.UpdateUserName) error {
	db := interctor.DB.Connect()

	if err := interctor.User.UpdateUserName(db, user); err != nil {
		return err
	}
	return nil
}

func (interctor *UserInteractor) PasswordConfirm(user *domain_user.PasswordConfirm) error {
	db := interctor.DB.Connect()

	// todo: パスワードをハッシュ化
	passowrd := []byte(user.NewPassword)
	hashed, err := bcrypt.GenerateFromPassword(passowrd, 10)
	if err != nil {
		return err
	}
	user.NewPassword = string(hashed)
	if err := interctor.User.PasswordConfirm(db, user); err != nil {
		return err
	}
	return nil
}

func (interctor *UserInteractor) UpdateEmail(user *domain_user.UpdateEmail) error {
	db := interctor.DB.Connect()
	user.NewEmailVerifyToken = uuid.NewString()
	if err := interctor.User.UpdateEmail(db, user); err != nil {
		return err
	}
	return nil
}

func (interctor *UserInteractor) ExistsPasswordToken(user *domain_user.PasswordConfirm) bool {
	db := interctor.DB.Connect()

	// パスワードトークンの存在性検証
	if exists, _ := interctor.User.ExistsPasswordToken(db, user); exists {
		return true
	}
	return false
}

func (interctor *UserInteractor) PasswordReset(passowrd *domain_user.PasswordSetting) error {
	db := interctor.DB.Connect()
	passowrd.PasswordToken = uuid.NewString()
	if err := interctor.User.PasswordReset(db, passowrd); err != nil {
		return err
	}
	return nil
}

func (interctor *UserInteractor) UpdatePrivateSetting(user *domain_user.User) error {
	db := interctor.DB.Connect()

	var updatePrivateFlag int

	if user.IsPrivate == consts.CODE_USER_NOT_PRIVATE {
		updatePrivateFlag = consts.CODE_USER_PRIVATE
	} else if user.IsPrivate == consts.CODE_USER_PRIVATE {
		updatePrivateFlag = consts.CODE_USER_NOT_PRIVATE
	} else {
		updatePrivateFlag = consts.CODE_USER_PRIVATE
	}

	if err := interctor.User.UpdatePrivate(db, user, updatePrivateFlag); err != nil {
		return err
	}
	return nil
}

func (interctor *UserInteractor) MatchHashedPassword(userPassword *domain_user.UpdateUserPassword) error {
	db := interctor.DB.Connect()
	password := userPassword.Password

	user, err := interctor.User.Find(db, userPassword.UserId)
	if err != nil {
		return err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return err
	}

	return nil
}

func (interctor *UserInteractor) ExistsUser(userId int) (ok bool, err error) {
	db := interctor.DB.Connect()

	ok, err = interctor.User.Exists(db, userId)
	if err != nil {

		return ok, err
	}

	return ok, nil
}

func (interctor *UserInteractor) ExistsTmpUser(uuid string) (ok bool, err error) {
	db := interctor.DB.Connect()
	ok, err = interctor.User.ExistsTmpUser(db, uuid)
	if !ok {

		return false, err
	}

	return true, nil
}

// 仮会員⇒本登録
func (interctor *UserInteractor) ConfirmTmpUser(uuid string) (err error) {

	db := interctor.DB.Connect()
	if err := interctor.User.ConfirmTmpUser(db, uuid); err != nil {
		return err
	}
	return nil
}

func (interctor *UserInteractor) ConfirmNewEmail(uuid string) (err error) {

	db := interctor.DB.Connect()
	if err := interctor.User.ConfirmNewEmail(db, uuid); err != nil {
		return err
	}
	return nil
}

func (interctor *UserInteractor) FindWithProfile(userId int) (user domain_user.User, err error) {
	db := interctor.DB.Connect()
	if user, err = interctor.User.Find(db, userId); err != nil {
		return user, err
	}
	return
}

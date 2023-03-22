package auth_usecase

import (
	"time"
	"travel-roadmap/backend/consts"
	domain_user "travel-roadmap/backend/domain/user"
	domain_user_session "travel-roadmap/backend/domain/user_session"
	"travel-roadmap/backend/usecase"
	user_usecase "travel-roadmap/backend/usecase/user"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type SignUpInteractor struct {
	DB   usecase.DBRepository
	User user_usecase.UserRepositroy
}

func (interctor *SignUpInteractor) ExistsTmpEmail(user *domain_user.User) bool {
	db := interctor.DB.Connect()

	// 対象ユーザー名の使用可否
	if exists, _ := interctor.User.ExistsTmpEmail(db, user); exists {
		return true
	}
	return false
}

// 仮会員の作成
func (interctor *SignUpInteractor) CreateTmpUser(user *domain_user.User) (err error) {

	db := interctor.DB.Connect()
	// TODO: メール認証リミットの設定

	// UUIDの生成
	u, err := uuid.NewRandom()
	if err != nil {
		return err
	}
	user.TmpRegisterUUID = u.String()

	// passwordのハッシュ化
	passowrd := []byte(user.Password)
	hashed, err := bcrypt.GenerateFromPassword(passowrd, 10)
	if err != nil {
		return err
	}
	user.Password = string(hashed)
	user.UserStatus = consts.CODE_USER_STATUS_TMP
	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()
	if err := interctor.User.Create(db, user); err != nil {
		return err
	}

	return nil
}

// ログイン処理
func (interctor *SignUpInteractor) SignIn(user domain_user.User) (sessionID string, err error) {

	db := interctor.DB.Connect()
	password := user.Password

	user, err = interctor.User.FindForSignIn(db, user)
	if err != nil {
		return sessionID, err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return sessionID, err
	}

	// TODO: 有効期限の設定
	var session domain_user_session.UserSession
	u, _ := uuid.NewRandom()

	sessionID = u.String()
	session.SessionId = sessionID
	session.UserId = user.UserId

	if err := interctor.User.CreateSession(db, session); err != nil {
		return sessionID, err
	}

	return sessionID, nil
}

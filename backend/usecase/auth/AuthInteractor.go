package auth_usecase

import (
	domain_user_session "travel-roadmap/backend/domain/user_session"
	"travel-roadmap/backend/usecase"
)

/************************
* ビジネスロジック層
************************/
type AuthInteractor struct {
	DB   usecase.DBRepository
	Auth AuthRepository
}

func (interactor *AuthInteractor) LogOut(sessionId string) error {
	db := interactor.DB.Connect()

	var session domain_user_session.UserSession
	session.SessionId = sessionId

	if err := interactor.Auth.DeleteUserSession(db, session); err != nil {
		return err
	}
	return nil
}

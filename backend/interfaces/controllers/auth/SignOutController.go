package auth

import (
	"net/http"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	auth_usecase "travel-roadmap/backend/usecase/auth"
)

type SignOutController struct {
	Interactor auth_usecase.AuthInteractor
}

func NewSignOutController(db database.DB) *SignOutController {
	return &SignOutController{
		Interactor: auth_usecase.AuthInteractor{
			DB:   &database.DBRepository{DB: db},
			Auth: &database.AuthRepository{},
		},
	}
}

func (c *SignOutController) Exec(ctx controllers.Context) {

	sessionId, err := ctx.Cookie("user_travel_roadmap_auth")

	if err != nil {
		ctx.JSON(http.StatusUnauthorized, controllers.NewH(err.Error(), nil))
		return
	}
	// main logic
	if err := c.Interactor.LogOut(sessionId); err != nil {
		ctx.JSON(http.StatusUnauthorized, controllers.NewH(err.Error(), nil))
		return
	}
	// TODO: 共通化 cookie 削除
	ctx.SetSameSite(http.SameSiteLaxMode)
	ctx.SetCookie(
		"user_travel_roadmap_auth",
		sessionId,
		-1,
		"/",
		// TODO: 開発環境毎に環境変数設定
		"travel-roadmap.local",
		false,
		// javascriptからのアクセスを禁止
		true,
	)

	ctx.JSON(http.StatusOK, controllers.NewH("success", nil))
}

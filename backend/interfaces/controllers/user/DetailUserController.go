package user

import (
	"net/http"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	user_usecase "travel-roadmap/backend/usecase/user"
)

/*********************************
* 現在ログイン中のユーザー情報を返却
*********************************/
type DetailUserController struct {
	interactor user_usecase.UserInteractor
}

func NewDetailUserController(db database.DB) *DetailUserController {
	return &DetailUserController{
		interactor: user_usecase.UserInteractor{
			DB:   &database.DBRepository{DB: db},
			User: &database.UserRepositroy{},
		},
	}
}

func (c *DetailUserController) Exec(ctx controllers.Context) {
	user, ok := ctx.Get("loginUser")
	if !ok {
		ctx.JSON(http.StatusInternalServerError, controllers.NewH("認証情報が取得できません", nil))
		return
	}
	// todo:session情報の時間更新

	ctx.JSON(
		http.StatusOK,
		controllers.NewH("success", user),
	)
}

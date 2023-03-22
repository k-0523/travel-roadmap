package user

import (
	"log"
	"net/http"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	user_usecase "travel-roadmap/backend/usecase/user"
)

type UpdatePasswordController struct {
	Interactor user_usecase.UserInteractor
}

func NewUpdatePasswordController(db database.DB) *UpdatePasswordController {
	return &UpdatePasswordController{
		Interactor: user_usecase.UserInteractor{
			DB:   &database.DBRepository{DB: db},
			User: &database.UserRepositroy{},
		},
	}
}

/*-------------------------------
 パスワード更新
-------------------------------*/
func (c *UpdatePasswordController) Exec(ctx controllers.Context) {

	loginUser, _ := ctx.Get("loginUser")
	user, ok := loginUser.(domain_user.User)
	if !ok {
		ctx.JSON(http.StatusUnauthorized, controllers.NewH("認証情報が取得できません", nil))
		return
	}
	var userPassword domain_user.UpdateUserPassword
	userPassword.UserId = user.UserId

	if err := ctx.ShouldBindJSON(&userPassword); err != nil {
		log.Println(err.Error())
		ctx.JSON(http.StatusUnprocessableEntity, controllers.NewH(err.Error(), nil))
		return
	}
	log.Println(&userPassword)

	// パスワード判定
	if err := c.Interactor.MatchHashedPassword(&userPassword); err != nil {
		log.Print(err.Error())

		ctx.JSON(http.StatusUnprocessableEntity, controllers.NewH("現在のパスワードが違います。", nil))
		return
	}
	// パスワード更新処理
	if err := c.Interactor.UpdatePassowrd(&userPassword); err != nil {
		log.Print(err.Error())

		ctx.JSON(http.StatusInternalServerError, controllers.NewH("サーバーエラー", nil))
		return
	}

	ctx.JSON(
		http.StatusOK,
		controllers.NewH("success", nil),
	)
}

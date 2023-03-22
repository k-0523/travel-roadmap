package user

import (
	"log"
	"net/http"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	user_usecase "travel-roadmap/backend/usecase/user"
)

type PasswordConfirmController struct {
	Interactor user_usecase.UserInteractor
}

func NewPasswordConfirmController(db database.DB) *PasswordConfirmController {
	return &PasswordConfirmController{
		Interactor: user_usecase.UserInteractor{
			DB:   &database.DBRepository{DB: db},
			User: &database.UserRepositroy{},
		},
	}
}

/*-------------------------------
 パスワード再設定確認
-------------------------------*/
func (c *PasswordConfirmController) Exec(ctx controllers.Context) {

	uuId := ctx.Param("uuId")

	var password domain_user.PasswordConfirm
	password.PasswordToken = uuId

	if err := ctx.ShouldBindJSON(&password); err != nil {
		log.Println(err.Error())
		ctx.JSON(http.StatusUnprocessableEntity, controllers.NewH(err.Error(), nil))
		return
	}
	log.Println(&password)

	// uuIdが存在していなければ404
	if exists := c.Interactor.ExistsPasswordToken(&password); !exists {

		ctx.JSON(http.StatusUnprocessableEntity, controllers.NewH("無効なURLです", nil))
		return
	}
	// パスワード更新処理
	if err := c.Interactor.PasswordConfirm(&password); err != nil {
		log.Print(err.Error())

		ctx.JSON(http.StatusInternalServerError, controllers.NewH("サーバーエラー", nil))
		return
	}

	ctx.JSON(
		http.StatusOK,
		controllers.NewH("success", nil),
	)
}

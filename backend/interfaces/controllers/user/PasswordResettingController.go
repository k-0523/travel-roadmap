package user

import (
	"fmt"
	"log"
	"net/http"
	"os"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	user_usecase "travel-roadmap/backend/usecase/user"
	"travel-roadmap/backend/utils"
)

type PasswordResettingController struct {
	Interactor user_usecase.UserInteractor
}

func NewPasswordResettingController(db database.DB) *PasswordResettingController {
	return &PasswordResettingController{
		Interactor: user_usecase.UserInteractor{
			DB:   &database.DBRepository{DB: db},
			User: &database.UserRepositroy{},
		},
	}
}

/*-------------------------------
 パスワード再設定
-------------------------------*/
func (c *PasswordResettingController) Exec(ctx controllers.Context) {

	var password domain_user.PasswordSetting

	if err := ctx.ShouldBindJSON(&password); err != nil {
		log.Println(err.Error())
		ctx.JSON(http.StatusUnprocessableEntity, controllers.NewH(err.Error(), nil))
		return
	}

	// 対象のメアドが存在する場合、メール送信
	if err := c.Interactor.PasswordReset(&password); err != nil {
		log.Print(err.Error())

		ctx.JSON(http.StatusInternalServerError, controllers.NewH("サーバーエラー", nil))
		return
	}

	url := os.Getenv("APP_FULL_URL")
	fullUrl := fmt.Sprintf("%s/confirmation/password/%s", url, password.PasswordToken)

	titleContetnt := "パスワード再設定を完了してください。"
	body := fmt.Sprintf("以下URLをクリックして、パスワードを再設定してください。\n%s", fullUrl)
	if err := utils.SendEmail(password.Email, titleContetnt, body); err != nil {
		log.Println(err.Error())
	}

	ctx.JSON(
		http.StatusOK,
		controllers.NewH("success", nil),
	)
}

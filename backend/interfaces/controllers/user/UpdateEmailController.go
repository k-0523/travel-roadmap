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

type UpdateEmailController struct {
	Interactor user_usecase.UserInteractor
}

func NewUpdateEmailController(db database.DB) *UpdateEmailController {
	return &UpdateEmailController{
		Interactor: user_usecase.UserInteractor{
			DB:   &database.DBRepository{DB: db},
			User: &database.UserRepositroy{},
		},
	}
}

/*-------------------------------
 メアド変更
------------------------------*/
func (c *UpdateEmailController) Exec(ctx controllers.Context) {

	loginUser, _ := ctx.Get("loginUser")
	user, ok := loginUser.(domain_user.User)
	if !ok {
		ctx.JSON(http.StatusUnauthorized, controllers.NewH("認証情報が取得できません", nil))
		return
	}
	var userEmail domain_user.UpdateEmail
	userEmail.UserId = user.UserId

	if err := ctx.ShouldBindJSON(&userEmail); err != nil {
		log.Println(err.Error())
		ctx.JSON(http.StatusUnprocessableEntity, controllers.NewH(err.Error(), nil))
		return
	}

	if exists := c.Interactor.ExistsEmail(&userEmail); exists {

		ctx.JSON(http.StatusUnprocessableEntity, controllers.NewH("入力されたメールアドレスは使用できません。", nil))
		return
	}

	if err := c.Interactor.UpdateEmail(&userEmail); err != nil {
		log.Print(err.Error())

		ctx.JSON(http.StatusInternalServerError, controllers.NewH("サーバーエラー", nil))
		return
	}

	url := os.Getenv("APP_FULL_URL")
	fullUrl := fmt.Sprintf("%s/confirmation/email/%s", url, userEmail.NewEmailVerifyToken)

	titleContetnt := "メールアドレスの変更を完了してください。"
	body := fmt.Sprintf("以下URLをクリックして、メールアドレスの変更を完了してください。\n%s", fullUrl)
	if err := utils.SendEmail(userEmail.NewEmail, titleContetnt, body); err != nil {
		log.Println(err.Error())
	}

	ctx.JSON(
		http.StatusOK,
		controllers.NewH("success", nil),
	)
}

package auth

import (
	"fmt"
	"log"
	"net/http"
	"os"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	auth_usecase "travel-roadmap/backend/usecase/auth"
	"travel-roadmap/backend/utils"

	validation "github.com/go-ozzo/ozzo-validation/v4"
)

type SignUpController struct {
	Interactor auth_usecase.SignUpInteractor
}

func NewSignUpController(db database.DB) *SignUpController {
	return &SignUpController{
		Interactor: auth_usecase.SignUpInteractor{
			DB:   &database.DBRepository{DB: db},
			User: &database.UserRepositroy{},
		},
	}
}

func (c *SignUpController) Exec(ctx controllers.Context) {

	/* -----------------------------------
	* request bind
	----------------------------------- */
	var user domain_user.User
	if err := ctx.ShouldBindJSON(&user); err != nil {

		ctx.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}
	/* -----------------------------------
	* validation
	----------------------------------- */
	if err := user.Validate(); err != nil {
		errs := validation.Errors{}

		if es, ok := err.(validation.Errors); ok {
			for name, value := range es {
				errs[name] = value
			}
		}

		ctx.JSON(http.StatusUnprocessableEntity, controllers.NewErroMessagesH(errs, nil))
		return
	}

	if exists := c.Interactor.ExistsTmpEmail(&user); exists {
		ctx.JSON(http.StatusUnprocessableEntity, controllers.NewH("入力されたメールアドレスは使用できません。", nil))
		return
	}
	/* -----------------------------------
	* main_logic
	----------------------------------- */
	if err := c.Interactor.CreateTmpUser(&user); err != nil {
		ctx.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}
	/* -----------------------------------
	* success response
	----------------------------------- */
	ctx.JSON(
		http.StatusOK,
		controllers.NewH("success", user),
	)
	// TODO 別パッケージに書く
	url := os.Getenv("APP_FULL_URL")
	to := user.Email
	uuid := user.TmpRegisterUUID
	fullUrl := fmt.Sprintf("%s/confirmation/%s", url, uuid)
	log.Print(fullUrl)
	title := "［travel_roadmap］会員登録手続き"
	body := fmt.Sprintf("以下URLをクリックして、会員登録手続きを行ってください。\n%s", fullUrl)

	err := utils.SendEmail(to, title, body)
	if err != nil {
		log.Println(err.Error())
	}

}

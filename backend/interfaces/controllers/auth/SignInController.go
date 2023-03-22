package auth

import (
	"errors"
	"net/http"
	"os"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	auth_usecase "travel-roadmap/backend/usecase/auth"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type SignInController struct {
	Interactor auth_usecase.SignUpInteractor
}

func NewSignInController(db database.DB) *SignInController {
	return &SignInController{
		Interactor: auth_usecase.SignUpInteractor{
			DB:   &database.DBRepository{DB: db},
			User: &database.UserRepositroy{},
		},
	}
}

func (c *SignInController) Exec(ctx controllers.Context) {
	var user domain_user.User

	if err := ctx.ShouldBindJSON(&user); err != nil {

		ctx.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}

	// TODO: 共通化
	if err := user.ValidateLogin(); err != nil {
		errs := validation.Errors{}

		if es, ok := err.(validation.Errors); ok {
			for name, value := range es {
				errs[name] = value
			}
		}

		ctx.JSON(http.StatusUnprocessableEntity, controllers.NewErroMessagesH(errs, nil))
		return
	}
	// ログイン
	sessionID, err := c.Interactor.SignIn(user)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			ctx.JSON(http.StatusUnprocessableEntity, controllers.NewH("メールアドレスかパスワードが違います。", nil))
			return
		}
		if errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
			ctx.JSON(http.StatusUnprocessableEntity, controllers.NewH("メールアドレスかパスワードが違います。", nil))
			return
		}
		ctx.JSON(http.StatusInternalServerError, controllers.NewH("サーバーエラーが発生しました。", nil))
		return
	}

	url := os.Getenv("APP_DOMAIN")
	enviroment := os.Getenv("GO_ENV")
	var secureEnv bool
	if enviroment == "local" {
		secureEnv = false
		ctx.SetSameSite(http.SameSiteLaxMode)

	} else {
		secureEnv = true
		ctx.SetSameSite(http.SameSiteNoneMode)
	}

	ctx.SetCookie(
		"user_travel_roadmap_auth",
		sessionID,
		7200,
		"/",
		url,
		// secure属性
		secureEnv,
		// javascriptからのアクセスを禁止
		true,
	)

	ctx.JSON(
		http.StatusOK,
		controllers.NewH("success", nil),
	)
}

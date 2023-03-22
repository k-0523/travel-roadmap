package user

import (
	"log"
	"net/http"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	user_usecase "travel-roadmap/backend/usecase/user"
)

type WithdrawalController struct {
	Interactor user_usecase.UserInteractor
}

func NewWithdrawalController(db database.DB) *WithdrawalController {
	return &WithdrawalController{
		Interactor: user_usecase.UserInteractor{
			DB:   &database.DBRepository{DB: db},
			User: &database.UserRepositroy{},
		},
	}
}

/*-------------------------------
 退会
-------------------------------*/
func (c *WithdrawalController) Exec(ctx controllers.Context) {
	loginUser, _ := ctx.Get("loginUser")
	user, ok := loginUser.(domain_user.User)
	if !ok {
		ctx.JSON(http.StatusUnauthorized, controllers.NewH("認証情報が取得できません", nil))
		return
	}
	if err := c.Interactor.Withdrawal(user); err != nil {
		log.Print(err.Error())

		ctx.JSON(http.StatusInternalServerError, controllers.NewH("サーバーエラー", nil))
		return
	}

	ctx.JSON(
		http.StatusOK,
		controllers.NewH("success", nil),
	)
}

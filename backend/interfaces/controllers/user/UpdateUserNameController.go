package user

import (
	"log"
	"net/http"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	user_usecase "travel-roadmap/backend/usecase/user"
)

type UpdateUserNameController struct {
	Interactor user_usecase.UserInteractor
}

func NewUpdateUserNameController(db database.DB) *UpdateUserNameController {
	return &UpdateUserNameController{
		Interactor: user_usecase.UserInteractor{
			DB:   &database.DBRepository{DB: db},
			User: &database.UserRepositroy{},
		},
	}
}

/*-------------------------------
 パスワード更新
-------------------------------*/
func (c *UpdateUserNameController) Exec(ctx controllers.Context) {

	loginUser, _ := ctx.Get("loginUser")
	user, ok := loginUser.(domain_user.User)
	if !ok {
		ctx.JSON(http.StatusUnauthorized, controllers.NewH("認証情報が取得できません", nil))
		return
	}
	var userName domain_user.UpdateUserName
	userName.UserId = user.UserId

	if err := ctx.ShouldBindJSON(&userName); err != nil {
		log.Println(err.Error())
		ctx.JSON(http.StatusUnprocessableEntity, controllers.NewH(err.Error(), nil))
		return
	}
	log.Println(&userName)

	if exists := c.Interactor.ExistsUserName(&userName); exists {

		ctx.JSON(http.StatusUnprocessableEntity, controllers.NewH("入力されたユーザー名は使用できません。", nil))
		return
	}

	if err := c.Interactor.UpdateUserName(&userName); err != nil {
		log.Print(err.Error())

		ctx.JSON(http.StatusInternalServerError, controllers.NewH("サーバーエラー", nil))
		return
	}

	ctx.JSON(
		http.StatusOK,
		controllers.NewH("success", nil),
	)
}

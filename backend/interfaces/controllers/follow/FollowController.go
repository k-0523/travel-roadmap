package follow

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	follow_usecase "travel-roadmap/backend/usecase/follow"
)

/*********************************
* 現在ログイン中のユーザー情報を返却
*********************************/
type FollowController struct {
	interactor follow_usecase.FollowInteractor
}

func NewFollowController(db database.DB) *FollowController {
	return &FollowController{
		interactor: follow_usecase.FollowInteractor{
			DB:           &database.DBRepository{DB: db},
			Follow:       &database.FollowRepository{},
			Notification: &database.NotificationRepository{},
		},
	}
}

func (c *FollowController) Exec(ctx controllers.Context) {

	loginUser, _ := ctx.Get("loginUser")
	user, ok := loginUser.(domain_user.User)
	if !ok {
		ctx.JSON(http.StatusInternalServerError, controllers.NewH("認証情報が取得できません", nil))
		return
	}
	Id := ctx.Param("userId")
	userId, _ := strconv.Atoi(Id)

	/* -----------------------------------
	* validation
	----------------------------------- */
	if user.UserId == userId {
		ctx.JSON(http.StatusUnprocessableEntity, controllers.NewH("自分自身を選択できません。", nil))
		return
	}
	ok, err := c.interactor.FollowUserValidate(user, userId)

	if err != nil {
		fmt.Println(err.Error())
		log.Print("-------------")
		ctx.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}

	if !ok {
		ctx.JSON(http.StatusUnprocessableEntity, controllers.NewH("フォローできませんでした。", nil))
		return
	}

	/* -----------------------------------
	* main logic
	----------------------------------- */
	if err := c.interactor.FollowUser(user, userId); err != nil {
		ctx.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}

	ctx.JSON(
		http.StatusOK,
		controllers.NewH("success", nil),
	)
}

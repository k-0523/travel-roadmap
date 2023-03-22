package follow

import (
	"net/http"
	"strconv"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	follow_usecase "travel-roadmap/backend/usecase/follow"
)

/*********************************
* フォロー解除API
*********************************/
type UnFollowController struct {
	interactor follow_usecase.FollowInteractor
}

func NewUnFollowController(db database.DB) *UnFollowController {
	return &UnFollowController{
		interactor: follow_usecase.FollowInteractor{
			DB:           &database.DBRepository{DB: db},
			Follow:       &database.FollowRepository{},
			Notification: &database.NotificationRepository{},
		},
	}
}

func (c *UnFollowController) Exec(ctx controllers.Context) {
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
	ok, err := c.interactor.UnFollowUserValidate(user, userId)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}

	if !ok {
		ctx.JSON(http.StatusUnprocessableEntity, controllers.NewH("フォロー解除できませんでした。", nil))
		return
	}
	/* -----------------------------------
	* main logic
	----------------------------------- */
	if err := c.interactor.UnFollowUser(user, userId); err != nil {
		ctx.JSON(http.StatusInternalServerError, controllers.NewH("サーバーエラーが発生しました。", nil))
		return
	}
	/* -----------------------------------
	* response
	----------------------------------- */
	ctx.JSON(
		http.StatusOK,
		controllers.NewH("success", nil),
	)
}

package follow

import (
	"log"
	"net/http"
	"strconv"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	follow_usecase "travel-roadmap/backend/usecase/follow"
	user_usecase "travel-roadmap/backend/usecase/user"
)

/**************************************
* 対象ユーザーのフォロワーを取得
**************************************/

type ListFollowUsersController struct {
	interactor     follow_usecase.FollowInteractor
	userInteractor user_usecase.UserInteractor
}

func NewListFollowUsersController(db database.DB) *ListFollowUsersController {
	return &ListFollowUsersController{
		interactor: follow_usecase.FollowInteractor{
			DB:     &database.DBRepository{DB: db},
			Follow: &database.FollowRepository{},
		},
		userInteractor: user_usecase.UserInteractor{
			DB:   &database.DBRepository{DB: db},
			User: &database.UserRepositroy{},
		},
	}
}

func (c *ListFollowUsersController) Exec(ctx controllers.Context) {

	Id := ctx.Param("userId")
	userId, _ := strconv.Atoi(Id)

	loginUser, isLogin := ctx.Get("loginUser")
	user, _ := loginUser.(domain_user.User)

	/* -----------------------------------
	* validation
	----------------------------------- */
	if exists, err := c.userInteractor.ExistsUser(userId); err != nil || !exists {

		if !exists {
			ctx.JSON(http.StatusNotFound, controllers.NewH("404 not found", nil))
			return
		}
		if err != nil {
			log.Print(err.Error())
			ctx.JSON(http.StatusInternalServerError, controllers.NewH("internal server error", nil))
			return
		}
	}

	/* -----------------------------------
	* main logic
	----------------------------------- */
	// ログインしている場合、対象ユーザーがフォローしているユーザーをフォロー解除できるか判定
	if isLogin {

		// 対象ユーザーのフォロー中ユーザーを取得
		users, err := c.interactor.GetFollowUsersWithCount(userId, user.UserId)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
			return
		}
		ctx.JSON(
			http.StatusOK,
			controllers.NewH("success", users),
		)
		return
	}

	users, err := c.interactor.GetFollowUsers(userId)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}
	ctx.JSON(
		http.StatusOK,
		controllers.NewH("success", users),
	)

}

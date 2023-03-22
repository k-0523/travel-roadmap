package user

import (
	"log"
	"net/http"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	user_usecase "travel-roadmap/backend/usecase/user"
	user_profile_usecase "travel-roadmap/backend/usecase/user_profile"
)

/*********************************
* ログインユーザーのprofile情報の更新
*********************************/
type UpdateProfileController struct {
	userInteractor        user_usecase.UserInteractor
	userProfileInteractor user_profile_usecase.UserProfileInteractor
}

func NewUpdateProfileController(db database.DB) *UpdateProfileController {
	return &UpdateProfileController{
		userInteractor: user_usecase.UserInteractor{
			DB:   &database.DBRepository{DB: db},
			User: &database.UserRepositroy{},
		},
		userProfileInteractor: user_profile_usecase.UserProfileInteractor{
			DB:          &database.DBRepository{DB: db},
			UserProfile: &database.UserProfileRepository{},
		},
	}
}

func (c *UpdateProfileController) Exec(ctx controllers.Context) {

	/* -----------------------------------
	* set params
	----------------------------------- */
	loginUser, _ := ctx.Get("loginUser")
	user, ok := loginUser.(domain_user.User)

	if !ok {
		ctx.JSON(http.StatusUnauthorized, controllers.NewH("認証情報が取得できません", nil))
		return
	}
	var userProfile domain_user.UserProfile
	userProfile.UserId = user.UserId

	/* -----------------------------------
	* validation
	----------------------------------- */
	// - 対象ユーザーの存在性確認
	ok, err := c.userInteractor.ExistsUser(user.UserId)
	if err != nil {
		log.Print(err.Error())

		ctx.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}
	if !ok {
		ctx.JSON(http.StatusUnprocessableEntity, controllers.NewH("対象ユーザーが存在しません。", nil))
		return
	}

	if err := ctx.ShouldBindJSON(&userProfile); err != nil {
		log.Print(err.Error())
		log.Print(2)

		ctx.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}

	/* -----------------------------------
	* main_logic
	----------------------------------- */
	if err := c.userProfileInteractor.UpdateOrCreate(&userProfile); err != nil {
		log.Print(err.Error())
		log.Print(3)

		ctx.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}

	/* -----------------------------------
	* response
	----------------------------------- */
	ctx.JSON(
		http.StatusOK,
		controllers.NewH("success", userProfile),
	)
}

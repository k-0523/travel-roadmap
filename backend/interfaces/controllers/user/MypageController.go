package user

import (
	"log"
	"net/http"
	"strconv"
	"travel-roadmap/backend/consts"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	follow_usecase "travel-roadmap/backend/usecase/follow"
	user_usecase "travel-roadmap/backend/usecase/user"
	view_history_usecase "travel-roadmap/backend/usecase/view_history"
)

/***************************************
* 対象ユーザーのマイページ情報をレスポンス
****************************************/
type MypageController struct {
	userInteractor        user_usecase.UserInteractor
	followInteracotr      follow_usecase.FollowInteractor
	viewHistoryInteractor view_history_usecase.ViewHistoryInteractor
}

func NewMypageController(db database.DB) *MypageController {
	return &MypageController{
		userInteractor: user_usecase.UserInteractor{
			DB:   &database.DBRepository{DB: db},
			User: &database.UserRepositroy{},
		},
		followInteracotr: follow_usecase.FollowInteractor{
			DB:     &database.DBRepository{DB: db},
			Follow: &database.FollowRepository{},
		},
		viewHistoryInteractor: view_history_usecase.ViewHistoryInteractor{
			DB:          &database.DBRepository{DB: db},
			ViewHistory: &database.ViewHistoryRepository{},
		},
	}
}

func (c *MypageController) Exec(ctx controllers.Context) {
	loginUser, ok := ctx.Get("loginUser")
	log.Print(loginUser)
	user, ok := loginUser.(domain_user.User)
	log.Print(&user)
	Id := ctx.Param("userId")
	targetUserId, _ := strconv.Atoi(Id)

	/* -----------------------------------
	* validation
	----------------------------------- */

	var canFollow bool
	var isOwn bool
	if !ok {
		canFollow = false
	}

	if targetUserId == user.UserId {
		canFollow = false
		isOwn = true

	}
	log.Print(targetUserId)
	log.Print(1)
	log.Print(user.UserId)
	log.Print(2)

	// 存在性確認
	if ok, err := c.userInteractor.ExistsUser(targetUserId); !ok || err != nil {

		if !ok {
			ctx.JSON(
				http.StatusNotFound,
				controllers.NewH("not found", nil),
			)
			return
		}
		log.Print(err.Error())
		ctx.JSON(
			http.StatusInternalServerError,
			controllers.NewH("サーバーエラーが発生しました", nil),
		)
		return
	}

	// todo: 既にフォローしているか判定
	if !isOwn {

		exists, err := c.followInteracotr.Exists(user, targetUserId)
		if !exists {
			canFollow = true
		}
		if err != nil {
			log.Print(err.Error())
			ctx.JSON(
				http.StatusInternalServerError,
				controllers.NewH("サーバーエラーが発生しました", nil),
			)
			return
		}
	}
	/* -----------------------------------
	* main logic
	----------------------------------- */
	// todo : 本当は全部結合して取得したい
	targetUser, err := c.userInteractor.FindWithProfile(targetUserId)
	log.Print(&targetUser)
	if err != nil {
		log.Print(err.Error())

		ctx.JSON(
			http.StatusInternalServerError,
			controllers.NewH("サーバーエラーが発生しました", nil),
		)
	}

	followingCount, err := c.followInteracotr.GetFollowUserCount(targetUserId)
	if err != nil {
		log.Print(err.Error())

		ctx.JSON(
			http.StatusInternalServerError,
			controllers.NewH("サーバーエラーが発生しました", nil),
		)
		return
	}
	followerCount, err := c.followInteracotr.GetFollowerCount(targetUserId)
	if err != nil {
		log.Print(err.Error())

		ctx.JSON(
			http.StatusInternalServerError,
			controllers.NewH("サーバーエラーが発生しました", nil),
		)
		return

	}
	// 閲覧総数の取得
	totalViewCount, err := c.viewHistoryInteractor.GetTotalCountByUserId(targetUserId)
	if err != nil {
		log.Print(err.Error())

		ctx.JSON(
			http.StatusInternalServerError,
			controllers.NewH("サーバーエラーが発生しました", nil),
		)
		return

	}
	var isPrivate bool
	// 9は非公開設定
	if isOwn {
		isPrivate = false
	} else if targetUser.IsPrivate == consts.CODE_USER_PRIVATE {
		isPrivate = true
	}

	// 対象ユーザーに紐づく情報を返却
	mypageUser := domain_user.Mypage{
		UserId:           targetUserId,
		UserName:         &targetUser.UserName,
		Name:             targetUser.UserProfile.Name,
		Url:              targetUser.UserProfile.Url,
		Introduce:        targetUser.UserProfile.Introduce,
		ProfileImagePath: targetUser.UserProfile.ImagePath,
		CanFollow:        canFollow,
		IsOwn:            isOwn,
		TotalViewCount:   totalViewCount,
		FollowingCount:   followingCount,
		FollowerCount:    followerCount,
		IsPrivate:        isPrivate,
	}
	ctx.JSON(
		http.StatusOK,
		controllers.NewH("success", mypageUser),
	)
}

package notification

import (
	"fmt"
	"log"
	"net/http"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	"travel-roadmap/backend/usecase/notification"
)

type NotificationListController struct {
	Interactor notification.NotificationInteractor
}

func NewNotificationListController(db database.DB) *NotificationListController {
	return &NotificationListController{
		Interactor: notification.NotificationInteractor{
			DB:           &database.DBRepository{DB: db},
			Notification: &database.NotificationRepository{},
		},
	}
}

func (c *NotificationListController) Exec(ctx controllers.Context) {

	/* -----------------------------------
	* 認証情報の取得
	----------------------------------- */
	loginUser, _ := ctx.Get("loginUser")
	user, ok := loginUser.(domain_user.User)
	if !ok {
		ctx.JSON(http.StatusUnauthorized, controllers.NewH("認証情報が取得できません", nil))
		return
	}
	fmt.Println(user)

	/* -----------------------------------
	* 対象ユーザーの通知一覧を取得
	----------------------------------- */
	notifications, err := c.Interactor.ListNotifications(&user)
	if err != nil {
		log.Print(err.Error())
		ctx.JSON(
			http.StatusNotFound,
			controllers.NewH("サーバーエラーが発生しました", nil),
		)
		return
	}
	/* -----------------------------------
	* response
	----------------------------------- */
	ctx.JSON(
		http.StatusOK,
		controllers.NewH("success", notifications),
	)
}

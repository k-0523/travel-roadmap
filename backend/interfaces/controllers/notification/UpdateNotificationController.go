package notification

import (
	"log"
	"net/http"
	"strconv"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	"travel-roadmap/backend/usecase/notification"
)

type UpdatenotifcationController struct {
	Interactor notification.NotificationInteractor
}

func NewUpdatenotifcationController(db database.DB) *UpdatenotifcationController {
	return &UpdatenotifcationController{
		Interactor: notification.NotificationInteractor{
			DB:           &database.DBRepository{DB: db},
			Notification: &database.NotificationRepository{},
		},
	}
}

/*-------------------------------
 既読API
------------------------------*/
func (c *UpdatenotifcationController) Exec(ctx controllers.Context) {

	Id := ctx.Param("notificationId")
	notificationId, _ := strconv.Atoi(Id)

	loginUser, _ := ctx.Get("loginUser")
	user, ok := loginUser.(domain_user.User)
	if !ok {
		ctx.JSON(http.StatusUnauthorized, controllers.NewH("認証情報が取得できません", nil))
		return
	}

	if err := c.Interactor.UpdateNotification(notificationId, &user); err != nil {
		log.Print(err.Error())

		ctx.JSON(http.StatusInternalServerError, controllers.NewH("サーバーエラー", nil))
		return
	}

	ctx.JSON(
		http.StatusOK,
		controllers.NewH("success", nil),
	)
}

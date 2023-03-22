package user

import (
	"log"
	"net/http"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	user_usecase "travel-roadmap/backend/usecase/user"
)

type ConfirmEmailController struct {
	Interactor user_usecase.UserInteractor
}

func NewConfirmEmailController(db database.DB) *ConfirmEmailController {
	return &ConfirmEmailController{
		Interactor: user_usecase.UserInteractor{
			DB:   &database.DBRepository{DB: db},
			User: &database.UserRepositroy{},
		},
	}
}

func (c *ConfirmEmailController) Exec(ctx controllers.Context) {

	/* -----------------------------------
	* set params
	----------------------------------- */
	uuid := ctx.Param("uuid")

	/* -----------------------------------
	* main logic
	----------------------------------- */
	if err := c.Interactor.ConfirmNewEmail(uuid); err != nil {
		log.Print(err.Error())
		ctx.JSON(
			http.StatusNotFound,
			controllers.NewH("無効なURLです。", nil),
		)
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

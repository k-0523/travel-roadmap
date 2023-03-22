package auth

import (
	"log"
	"net/http"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	user_usecase "travel-roadmap/backend/usecase/user"
)

type ConfirmUserController struct {
	Interactor user_usecase.UserInteractor
}

func NewConfirmUserController(db database.DB) *ConfirmUserController {
	return &ConfirmUserController{
		Interactor: user_usecase.UserInteractor{
			DB:   &database.DBRepository{DB: db},
			User: &database.UserRepositroy{},
		},
	}
}

func (c *ConfirmUserController) Exec(ctx controllers.Context) {

	/* -----------------------------------
	* set params
	----------------------------------- */
	uuid := ctx.Param("uuid")

	/* -----------------------------------
	* validation
	----------------------------------- */
	ok, err := c.Interactor.ExistsTmpUser(uuid)

	if !ok {
		ctx.JSON(
			http.StatusNotFound,
			controllers.NewH("既に本登録済みです。", nil),
		)
		return
	}
	if err != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			controllers.NewH(err.Error(), nil),
		)
		return
	}
	/* -----------------------------------
	* main logic
	----------------------------------- */
	if err := c.Interactor.ConfirmTmpUser(uuid); err != nil {
		log.Print(err.Error())
		ctx.JSON(
			http.StatusInternalServerError,
			controllers.NewH(err.Error(), nil),
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

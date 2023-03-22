package view_history

import (
	"net/http"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	view_history_usecase "travel-roadmap/backend/usecase/view_history"
)

type ViewHistoryController struct {
	Interactor view_history_usecase.ViewHistoryInteractor
}

func NewViewHistoryController(db database.DB) *ViewHistoryController {
	return &ViewHistoryController{
		Interactor: view_history_usecase.ViewHistoryInteractor{
			DB:          &database.DBRepository{DB: db},
			ViewHistory: &database.ViewHistoryRepository{},
		},
	}
}

func (controller *ViewHistoryController) Get(c controllers.Context) {
	loginUser, _ := c.Get("loginUser")
	user, _ := loginUser.(domain_user.User)

	res, err := controller.Interactor.Get(user.UserId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}
	c.JSON(http.StatusOK, controllers.NewH("success", res))
}

package content

import (
	"net/http"
	"strconv"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	content_usecase "travel-roadmap/backend/usecase/content"
)

type ListUserContentController struct {
	Interactor content_usecase.ContentInteractor
}

func NewListUserContentController(db database.DB) *ListUserContentController {
	return &ListUserContentController{
		Interactor: content_usecase.ContentInteractor{
			DB:      &database.DBRepository{DB: db},
			Content: &database.ContentRepository{},
		},
	}
}

func (controller *ListUserContentController) Exec(c controllers.Context) {

	Id := c.Param("userId")
	userId, _ := strconv.Atoi(Id)

	/* -----------------------------------
	* main logic
	----------------------------------- */
	posts, err := controller.Interactor.SearchByUserId(userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}
	c.JSON(http.StatusOK, controllers.NewH("success", posts))
}

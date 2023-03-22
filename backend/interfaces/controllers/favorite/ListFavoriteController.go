package favorite

import (
	"net/http"
	"strconv"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	favorite_usecase "travel-roadmap/backend/usecase/favorite"
)

type listFavoriteController struct {
	Interactor favorite_usecase.FavoriteInteractor
}

func NewListFavoriteController(db database.DB) *listFavoriteController {
	return &listFavoriteController{
		Interactor: favorite_usecase.FavoriteInteractor{
			DB:       &database.DBRepository{DB: db},
			Favorite: &database.FavoriteRepository{},
		},
	}
}

func (controller *listFavoriteController) Exec(c controllers.Context) {
	Id := c.Param("userId")
	userId, err := strconv.Atoi(Id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}

	result, err := controller.Interactor.SearchWithContents(userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}

	c.JSON(http.StatusOK, controllers.NewH("success", result))
}

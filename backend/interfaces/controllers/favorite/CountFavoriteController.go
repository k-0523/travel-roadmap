package favorite

import (
	"net/http"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	favorite_usecase "travel-roadmap/backend/usecase/favorite"
)

type CountFavoriteController struct {
	Interactor favorite_usecase.FavoriteInteractor
}

type RequestFavorite struct {
	PostID int `json:"postID"`
}

func NewCountFavoriteController(db database.DB) *CountFavoriteController {
	return &CountFavoriteController{
		Interactor: favorite_usecase.FavoriteInteractor{
			DB:       &database.DBRepository{DB: db},
			Favorite: &database.FavoriteRepository{},
		},
	}
}

// いいね数取得
func (controller *CountFavoriteController) Exec(c controllers.Context) {
	var rf RequestFavorite
	if err := c.ShouldBindJSON(&rf); err != nil {
		c.JSON(http.StatusUnprocessableEntity, controllers.NewH(err.Error(), nil))
		return
	}
	count, err := controller.Interactor.GetCountFavorites(rf.PostID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}
	c.JSON(http.StatusOK, controllers.NewH("success", count))
}

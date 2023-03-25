package favorite

import (
	"net/http"
	domain_favorite "travel-roadmap/backend/domain/favorite"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	favorite_usecase "travel-roadmap/backend/usecase/favorite"
)

type FavoriteController struct {
	Interactor favorite_usecase.FavoriteInteractor
}

type ResponseFavorite struct {
	PostID int   `json:"postID"`
	Status bool  `json:"status"`
	Count  int64 `json:"count"`
}

func NewFavoriteController(db database.DB) *FavoriteController {
	return &FavoriteController{
		Interactor: favorite_usecase.FavoriteInteractor{
			DB:       &database.DBRepository{DB: db},
			Favorite: &database.FavoriteRepository{},
		},
	}
}

// いいね
func (controller *FavoriteController) Exec(c controllers.Context) {
	loginUser, _ := c.Get("loginUser")
	user, _ := loginUser.(domain_user.User)
	var favorite domain_favorite.Favorite

	if err := c.ShouldBindJSON(&favorite); err != nil {
		c.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}

	favorite.UserID = user.UserId
	result, err := controller.Interactor.UpdateFavorite(favorite)
	if err != nil {
		c.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}

	count, err := controller.Interactor.GetCountFavorites(favorite.PostID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}
	c.JSON(http.StatusOK, controllers.NewH("success", ResponseFavorite{favorite.PostID, result, count}))
}

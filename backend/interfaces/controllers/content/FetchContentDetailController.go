package content

import (
	"net/http"
	domain_content_detail "travel-roadmap/backend/domain/content_detail"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	content_detail_usecase "travel-roadmap/backend/usecase/content_detail"
	favorite_usecase "travel-roadmap/backend/usecase/favorite"
	view_history_usecase "travel-roadmap/backend/usecase/view_history"
)

type FetchContentDetailController struct {
	Interactor            content_detail_usecase.ContentDetailInteractor
	viewHistoryInteractor view_history_usecase.ViewHistoryInteractor
	favoriteInteractor    favorite_usecase.FavoriteInteractor
}

func NewFetchContentDetailController(db database.DB) *FetchContentDetailController {
	return &FetchContentDetailController{
		Interactor: content_detail_usecase.ContentDetailInteractor{
			DB:      &database.DBRepository{DB: db},
			Content: &database.ContentDetailRepository{},
		},
		viewHistoryInteractor: view_history_usecase.ViewHistoryInteractor{
			DB:          &database.DBRepository{DB: db},
			ViewHistory: &database.ViewHistoryRepository{},
		},
		favoriteInteractor: favorite_usecase.FavoriteInteractor{
			DB:       &database.DBRepository{DB: db},
			Favorite: &database.FavoriteRepository{},
		},
	}
}

// 投稿詳細取得
func (controller *FetchContentDetailController) Exec(c controllers.Context) {
	loginUser, _ := c.Get("loginUser")
	user, _ := loginUser.(domain_user.User)

	var post domain_content_detail.Post
	var rp domain_content_detail.RequestParam
	if err := c.ShouldBindJSON(&rp); err != nil {
		c.JSON(http.StatusUnprocessableEntity, controllers.NewH(err.Error(), nil))
		return
	}

	// 閲覧履歴を残す
	if err := controller.viewHistoryInteractor.Regist(user.UserId, rp.PostID); err != nil {
		c.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}

	res, err := controller.Interactor.Get(&post, user.UserId, rp.PostID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}

	// 閲覧しているコンテンツをいいねしているかどうか
	isFavorited, err := controller.favoriteInteractor.GetStatus(user.UserId, rp.PostID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}
	res.IsFavorited = isFavorited

	c.JSON(http.StatusOK, controllers.NewH("success", res))
}

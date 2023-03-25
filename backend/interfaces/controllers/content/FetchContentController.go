package content

import (
	"net/http"
	domain_content "travel-roadmap/backend/domain/content"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	content_usecase "travel-roadmap/backend/usecase/content"
)

type FetchContentController struct {
	Interactor content_usecase.ContentInteractor
}

func NewFetchContentController(db database.DB) *FetchContentController {
	return &FetchContentController{
		Interactor: content_usecase.ContentInteractor{
			DB:      &database.DBRepository{DB: db},
			Content: &database.ContentRepository{},
		},
	}
}

// 投稿一覧を取得
func (controller *FetchContentController) Exec(c controllers.Context) {
	var post domain_content.Post
	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusUnprocessableEntity, controllers.NewH(err.Error(), nil))
		return
	}

	res, err := controller.Interactor.Get(&post)
	if err != nil {
		c.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}
	c.JSON(http.StatusOK, controllers.NewH("success", res))
}

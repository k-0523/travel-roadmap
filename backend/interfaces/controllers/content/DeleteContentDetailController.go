package content

import (
	"net/http"
	domain_content_detail "travel-roadmap/backend/domain/content_detail"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	content_detail_usecase "travel-roadmap/backend/usecase/content_detail"
)

type DeleteContentDetailController struct {
	Interactor content_detail_usecase.ContentDetailInteractor
}

func NewDeleteContentDetailController(db database.DB) *DeleteContentDetailController {
	return &DeleteContentDetailController{
		Interactor: content_detail_usecase.ContentDetailInteractor{
			DB:      &database.DBRepository{DB: db},
			Content: &database.ContentDetailRepository{},
		},
	}
}

// 投稿の削除
func (controller *DeleteContentDetailController) Exec(c controllers.Context) {
	var post domain_content_detail.RequestParam
	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusUnprocessableEntity, controllers.NewH(err.Error(), nil))
		return
	}
	if err := controller.Interactor.Delete(post); err != nil {
		c.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}
	c.JSON(http.StatusOK, controllers.NewH("success", post))
}

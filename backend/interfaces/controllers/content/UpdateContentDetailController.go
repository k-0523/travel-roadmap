package content

import (
	"net/http"
	domain_content_detail "travel-roadmap/backend/domain/content_detail"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	content_detail_usecase "travel-roadmap/backend/usecase/content_detail"

	"github.com/go-playground/validator/v10"
)

type UpdateContentDetailController struct {
	Interactor content_detail_usecase.ContentDetailInteractor
}

func NewUpdateContentDetailController(db database.DB) *UpdateContentDetailController {
	return &UpdateContentDetailController{
		Interactor: content_detail_usecase.ContentDetailInteractor{
			DB:      &database.DBRepository{DB: db},
			Content: &database.ContentDetailRepository{},
		},
	}
}

// 投稿を更新
func (controller *UpdateContentDetailController) Exec(c controllers.Context) {
	var post domain_content_detail.Post
	/* -----------------------------------
	* validation
	----------------------------------- */
	if err := c.ShouldBindJSON(&post); err != nil {
		errors := err.(validator.ValidationErrors)
		arr := make(map[string]string)
		for _, err := range errors {
			arr[err.Namespace()[5:]] = msgForTag(err)
		}
		c.JSON(http.StatusUnprocessableEntity, controllers.NewH(err.Error(), arr))
		return
	}

	if err := controller.Interactor.Update(post); err != nil {
		c.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}

	c.JSON(http.StatusOK, controllers.NewH("success", nil))
}

func msgForTag(fe validator.FieldError) string {
	switch fe.Tag() {
	case "required":
		return "必須項目です。"
	}
	return fe.Error()
}

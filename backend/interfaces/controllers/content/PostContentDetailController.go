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

	"github.com/go-playground/validator/v10"
)

type PostContentDetailController struct {
	Interactor            content_detail_usecase.ContentDetailInteractor
	viewHistoryInteractor view_history_usecase.ViewHistoryInteractor
	favoriteInteractor    favorite_usecase.FavoriteInteractor
}

func NewPostContentDetailController(db database.DB) *PostContentDetailController {
	return &PostContentDetailController{
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

// 投稿
func (controller *PostContentDetailController) Exec(c controllers.Context) {
	loginUser, _ := c.Get("loginUser")
	user, _ := loginUser.(domain_user.User)

	var post domain_content_detail.Post
	if err := c.ShouldBindJSON(&post); err != nil {
		errors := err.(validator.ValidationErrors)
		arr := make(map[string]string)
		for _, err := range errors {
			arr[err.Namespace()[5:]] = msgForTag(err)
		}
		c.JSON(http.StatusUnprocessableEntity, controllers.NewH(err.Error(), arr))
		return
	}

	post.UserID = user.UserId
	if err := controller.Interactor.Create(&post); err != nil {
		c.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}

	c.JSON(http.StatusOK, controllers.NewH("success", post))
}

func msgForTag(fe validator.FieldError) string {
	switch fe.Tag() {
	case "required":
		return "必須項目です。"
	}
	return fe.Error()
}

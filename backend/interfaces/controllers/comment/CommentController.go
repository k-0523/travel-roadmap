package comment

import (
	"net/http"
	domain_comment "travel-roadmap/backend/domain/comment"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	comment_usecase "travel-roadmap/backend/usecase/comment"

	"github.com/go-playground/validator/v10"
)

type CommentController struct {
	Interactor comment_usecase.CommentInteractor
}

type RequestComment struct {
	PostID int `json:"postID"`
}

func NewCommentController(db database.DB) *CommentController {
	return &CommentController{
		Interactor: comment_usecase.CommentInteractor{
			DB:      &database.DBRepository{DB: db},
			Comment: &database.CommentRepository{},
		},
	}
}

func (controller *CommentController) Create(c controllers.Context) {
	loginUser, _ := c.Get("loginUser")
	user, _ := loginUser.(domain_user.User)

	var comment domain_comment.Comment
	if err := c.ShouldBindJSON(&comment); err != nil {
		errors := err.(validator.ValidationErrors)
		arr := make(map[string]string)
		for _, err := range errors {
			arr[err.Namespace()[5:]] = msgForTag(err)
		}
		c.JSON(http.StatusUnprocessableEntity, controllers.NewH(err.Error(), arr))
		return
	}

	comment.UserID = user.UserId
	if err := controller.Interactor.Create(comment); err != nil {
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

// コメント一覧取得
func (controller *CommentController) GetCommentList(c controllers.Context) {
	var comments []domain_comment.Comment
	res, err := controller.Interactor.GetCommentList(&comments, c.Query("post_id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}
	c.JSON(http.StatusOK, controllers.NewH("success", res))
}

// コメント数取得
func (controller *CommentController) GetCountComments(c controllers.Context) {
	var rc RequestComment
	if err := c.ShouldBindJSON(&rc); err != nil {
		c.JSON(http.StatusUnprocessableEntity, controllers.NewH(err.Error(), nil))
		return
	}
	count, err := controller.Interactor.GetCountComments(rc.PostID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}
	c.JSON(http.StatusOK, controllers.NewH("success", count))
}

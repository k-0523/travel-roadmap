package comment

import (
	"net/http"
	domain_comment "travel-roadmap/backend/domain/comment"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	comment_usecase "travel-roadmap/backend/usecase/comment"
)

type FetchCommentController struct {
	Interactor comment_usecase.CommentInteractor
}

func NewFetchCommentController(db database.DB) *FetchCommentController {
	return &FetchCommentController{
		Interactor: comment_usecase.CommentInteractor{
			DB:      &database.DBRepository{DB: db},
			Comment: &database.CommentRepository{},
		},
	}
}

// コメント一覧取得
func (controller *FetchCommentController) Exec(c controllers.Context) {
	var comments []domain_comment.Comment
	res, err := controller.Interactor.GetCommentList(&comments, c.Query("post_id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, controllers.NewH(err.Error(), nil))
		return
	}
	c.JSON(http.StatusOK, controllers.NewH("success", res))
}

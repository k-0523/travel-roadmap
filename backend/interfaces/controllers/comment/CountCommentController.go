package comment

import (
	"net/http"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"
	comment_usecase "travel-roadmap/backend/usecase/comment"
)

type CountCommentController struct {
	Interactor comment_usecase.CommentInteractor
}

type RequestComment struct {
	PostID int `json:"postID"`
}

func NewCountCommentController(db database.DB) *CountCommentController {
	return &CountCommentController{
		Interactor: comment_usecase.CommentInteractor{
			DB:      &database.DBRepository{DB: db},
			Comment: &database.CommentRepository{},
		},
	}
}

// コメント数取得
func (controller *CountCommentController) Exec(c controllers.Context) {
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

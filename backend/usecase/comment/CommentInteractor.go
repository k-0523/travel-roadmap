package comment_usecase

import (
	domain_comment "travel-roadmap/backend/domain/comment"
	usecase "travel-roadmap/backend/usecase"
)

type CommentInteractor struct {
	DB      usecase.DBRepository
	Comment CommentRepository
}

func (interactor *CommentInteractor) Create(comment domain_comment.Comment) (err error) {
	db := interactor.DB.Connect()

	if err := interactor.Comment.Create(db, comment); err != nil {
		return err
	}
	return
}

func (interactor *CommentInteractor) GetCommentList(comments *[]domain_comment.Comment, id string) (
	response []domain_comment.ResponseComment,
	err error,
) {
	db := interactor.DB.Connect()

	if err := interactor.Comment.GetCommentList(db, comments, id); err != nil {
		return nil, err
	}

	var res = []domain_comment.ResponseComment{}
	for _, comment := range *comments {
		res = append(res, comment.MakeResponse())
	}
	return res, nil
}

func (interactor *CommentInteractor) GetCountComments(postID int) (count int64, err error) {
	db := interactor.DB.Connect()

	count, err = interactor.Comment.GetCountComments(db, postID)
	if err != nil {
		return count, err
	}
	return count, nil
}

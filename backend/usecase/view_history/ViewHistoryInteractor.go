package view_history_usecase

import (
	domain_view_history "travel-roadmap/backend/domain/view_history"
	"travel-roadmap/backend/usecase"
)

/************************
* ビジネスロジック層
************************/
type ViewHistoryInteractor struct {
	DB          usecase.DBRepository
	ViewHistory ViewHistoryRepository
}

func (interactor *ViewHistoryInteractor) Regist(userID int, postID int) (err error) {
	db := interactor.DB.Connect()
	if err := interactor.ViewHistory.Regist(db, userID, postID); err != nil {
		return err
	}
	return
}

func (interactor *ViewHistoryInteractor) GetTotalCountByUserId(UserId int) (count int64, err error) {
	db := interactor.DB.Connect()

	if count, err = interactor.ViewHistory.GetTotalCountByUserId(db, UserId); err != nil {
		return count, err
	}
	return count, nil
}

func (interactor *ViewHistoryInteractor) Get(userID int) (response []domain_view_history.ResponseViewHistory, err error) {
	db := interactor.DB.Connect()
	posts, err := interactor.ViewHistory.Get(db, userID)
	if err != nil {
		return nil, err
	}

	// awsS3 := utils.NewAwsS3()
	var res = []domain_view_history.ResponseViewHistory{}
	for _, post := range posts {
		res = append(res, post.MakeResponse())
		// res[i].ImagePath, _ = awsS3.Get(res[i].ImagePath)
	}
	return res, nil
}

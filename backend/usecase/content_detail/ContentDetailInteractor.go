package content_detail_usecase

import (
	domain_content_detail "travel-roadmap/backend/domain/content_detail"
	usecase "travel-roadmap/backend/usecase"
)

type ContentDetailInteractor struct {
	DB      usecase.DBRepository
	Content ContentDetailRepository
}

func (interactor *ContentDetailInteractor) Create(post *domain_content_detail.Post) (err error) {
	db := interactor.DB.Connect()

	if err := interactor.Content.Create(db, post); err != nil {
		return err
	}
	return
}

func (interactor *ContentDetailInteractor) Update(post domain_content_detail.Post) (err error) {
	db := interactor.DB.Connect()

	if err := interactor.Content.Update(db, post); err != nil {
		return err
	}
	return
}

func (interactor *ContentDetailInteractor) Delete(post domain_content_detail.RequestParam) (err error) {
	db := interactor.DB.Connect()

	if err := interactor.Content.Delete(db, post); err != nil {
		return err
	}
	return
}

func (interactor *ContentDetailInteractor) Get(
	post *domain_content_detail.Post,
	userID int,
	postID int,
) (
	response *domain_content_detail.ResponseContentDetail,
	err error,
) {
	db := interactor.DB.Connect()

	if err := interactor.Content.Get(db, post, postID); err != nil {
		return nil, err
	}

	res := post.MakeResponse()
	res.IsEnableEdit = false
	if res.UserID == userID {
		res.IsEnableEdit = true
	}

	// S3が使えないためコメントアウト
	// awsS3 := utils.NewAwsS3()
	// res.ImagePath, _ = awsS3.Get(res.ImagePath)

	// イメージパスを署名付きURLにする
	// TODO: なんとかしたい
	// for si, _ := range res.Schedule {
	// 	for di, _ := range res.Schedule[si].ScheduleDetail {
	// 		for ii, _ := range res.Schedule[si].ScheduleDetail[di].ScheduleDetailImage {
	// 			res.Schedule[si].ScheduleDetail[di].ScheduleDetailImage[ii].SignedUrl, _ = awsS3.Get(res.Schedule[si].ScheduleDetail[di].ScheduleDetailImage[ii].ImagePath)
	// 		}
	// 	}
	// }

	return &res, nil
}

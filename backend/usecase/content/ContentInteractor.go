package content_usecase

import (
	domain_content "travel-roadmap/backend/domain/content"
	usecase "travel-roadmap/backend/usecase"
)

/************************
* ビジネスロジック層
************************/
type ContentInteractor struct {
	DB      usecase.DBRepository
	Content ContentRepository
}

func (interactor *ContentInteractor) Get(post *domain_content.Post) (
	response []domain_content.ResponseSearchedContent,
	err error,
) {
	db := interactor.DB.Connect()

	var posts []domain_content.Post

	if err := interactor.Content.Get(db, post, &posts); err != nil {
		return nil, err
	}

	// S3が使えないためコメントアウト
	// awsS3 := utils.NewAwsS3()
	var res = []domain_content.ResponseSearchedContent{}
	for _, post := range posts {
		res = append(res, post.MakeResponse())
		// res[i].ImagePath, _ = awsS3.Get(res[i].ImagePath)
	}

	return res, nil
}

func (interactor *ContentInteractor) Search(post *domain_content.Post) (
	response []domain_content.ResponseSearchedContent,
	err error,
) {
	db := interactor.DB.Connect()

	var posts []domain_content.Post

	if err := interactor.Content.Search(db, post, &posts); err != nil {
		return nil, err
	}

	// awsS3 := utils.NewAwsS3()
	var res = []domain_content.ResponseSearchedContent{}
	for _, post := range posts {
		res = append(res, post.MakeResponse())
		// res[i].ImagePath, _ = awsS3.Get(res[i].ImagePath)
	}
	return res, nil
}

func (interactor *ContentInteractor) SearchByUserId(userId int) (posts []domain_content.Post, err error) {
	db := interactor.DB.Connect()

	posts, err = interactor.Content.SearchByUserId(db, userId)

	if err != nil {
		return posts, err
	}

	return
}

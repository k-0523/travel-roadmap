package favorite_usecase

import (
	domain_favorite "travel-roadmap/backend/domain/favorite"
	usecase "travel-roadmap/backend/usecase"
)

/************************
* ビジネスロジック層
************************/
type FavoriteInteractor struct {
	DB       usecase.DBRepository
	Favorite FavoriteRepository
}

func (interactor *FavoriteInteractor) UpdateFavorite(favorite domain_favorite.Favorite) (isFavorited bool, err error) {
	db := interactor.DB.Connect()

	result, err := interactor.Favorite.UpdateFavorite(db, favorite)
	if err != nil {
		return false, err
	}
	return result, nil
}

func (interactor *FavoriteInteractor) GetCountFavorites(postID int) (count int64, err error) {
	db := interactor.DB.Connect()

	count, err = interactor.Favorite.GetCountFavorites(db, postID)
	if err != nil {
		return count, err
	}
	return count, nil
}
func (interactor *FavoriteInteractor) GetStatus(userID int, postID int) (isFavorited bool, err error) {
	db := interactor.DB.Connect()

	result, err := interactor.Favorite.GetStatus(db, userID, postID)
	if err != nil {
		return false, err
	}
	return result, nil
}

func (interactor *FavoriteInteractor) SearchWithContents(userId int) (result []domain_favorite.FavoriteWithContents, err error) {
	db := interactor.DB.Connect()

	result, err = interactor.Favorite.SearchWithContents(db, userId)
	if err != nil {
		return result, err
	}
	return result, nil
}

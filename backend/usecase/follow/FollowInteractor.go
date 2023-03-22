package follow_usecase

import (
	"log"
	"time"
	domain_follow "travel-roadmap/backend/domain/follow"
	domain_notification "travel-roadmap/backend/domain/notification"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/usecase"
	"travel-roadmap/backend/usecase/notification"
	user_usecase "travel-roadmap/backend/usecase/user"
)

/************************
* ビジネスロジック層
************************/
type FollowInteractor struct {
	DB           usecase.DBRepository
	Follow       FollowRepositroy
	Notification notification.NotificationRepository
	User         user_usecase.UserRepositroy
}

func (interctor *FollowInteractor) FollowUser(loginUser domain_user.User, userId int) error {
	db := interctor.DB.Connect()

	user := domain_follow.Follow{
		FollowUserId:   loginUser.UserId,
		FollowerUserId: userId,
		CreatedAt:      time.Now(),
		UpdatedAt:      time.Now(),
	}
	if err := interctor.Follow.Create(db, user); err != nil {
		return err
	}

	notification := domain_notification.Notification{
		ActionName:     "follow",
		VisitedId:      userId,
		VisiterId:      loginUser.UserId,
		FollowUserId:   loginUser.UserId,
		FollowerUserId: userId,
	}
	// 通知レコードのインサート
	if err := interctor.Notification.Create(db, &notification); err != nil {
		log.Println(err.Error())
		return err
	}
	return nil
}

func (interctor *FollowInteractor) UnFollowUser(loginUser domain_user.User, userId int) error {
	db := interctor.DB.Connect()

	if err := interctor.Follow.Delete(db, loginUser.UserId, userId); err != nil {
		return err
	}
	// フォローユーザーIDとフォロワーユーザーIDを使用して通知削除
	if err := interctor.Notification.DeleteByUnFollow(db, loginUser.UserId, userId); err != nil {
		log.Println(err.Error())
		return err
	}
	return nil
}

func (interctor *FollowInteractor) GetFollowUsers(userId int) (users []domain_follow.FollowingUsersWithCount, err error) {
	db := interctor.DB.Connect()

	users, err = interctor.Follow.SearchFollowingUsers(db, userId)
	if err != nil {
		return users, err
	}
	return users, nil
}

func (interctor *FollowInteractor) GetFollowUsersWithCount(userId int, loginUserId int) (users []domain_follow.FollowingUsersWithCount, err error) {
	db := interctor.DB.Connect()

	users, err = interctor.Follow.SearchFollowingUsersWithCount(db, userId, loginUserId)
	if err != nil {
		return users, err
	}
	return users, nil
}

func (interctor *FollowInteractor) GetFollowerWithCount(userId int, loginUserId int) (users []domain_follow.FollowerWithCount, err error) {
	db := interctor.DB.Connect()

	users, err = interctor.Follow.SearchFollowerWithCount(db, userId, loginUserId)
	if err != nil {
		return users, err
	}
	return users, nil
}

func (interctor *FollowInteractor) GetFollower(userId int) (users []domain_follow.Followers, err error) {
	db := interctor.DB.Connect()

	users, err = interctor.Follow.SearchFollower(db, userId)
	if err != nil {
		return users, err
	}
	return users, nil
}

func (interctor *FollowInteractor) FollowUserValidate(loginUser domain_user.User, userId int) (ok bool, err error) {
	db := interctor.DB.Connect()
	// 既にフォローしている場合はバリデーションNG
	if ok, err := interctor.Follow.Exists(db, loginUser.UserId, userId); err != nil || ok {

		return false, err
	}

	return true, nil
}

func (interctor *FollowInteractor) Exists(loginUser domain_user.User, userId int) (exists bool, err error) {
	db := interctor.DB.Connect()

	// 既にフォローしている場合
	if exists, err := interctor.Follow.Exists(db, loginUser.UserId, userId); err != nil || !exists {

		return false, err
	}

	return true, nil
}

func (interctor *FollowInteractor) UnFollowUserValidate(loginUser domain_user.User, userId int) (ok bool, err error) {
	db := interctor.DB.Connect()
	// 重複チェック
	if ok, err := interctor.Follow.Exists(db, loginUser.UserId, userId); err != nil || !ok {

		return false, err
	}

	return true, nil
}

// 対象ユーザーのフォローユーザー数を取得
func (interctor *FollowInteractor) GetFollowUserCount(userId int) (count int64, err error) {
	db := interctor.DB.Connect()

	count, err = interctor.Follow.GetFollowingUserCount(db, userId)
	if err != nil {
		return count, err
	}
	return
}

// 対象ユーザーのフォロワー数を取得
func (interctor *FollowInteractor) GetFollowerCount(userId int) (count int64, err error) {
	db := interctor.DB.Connect()

	count, err = interctor.Follow.GetFollowerCount(db, userId)
	if err != nil {
		return count, err
	}
	return
}

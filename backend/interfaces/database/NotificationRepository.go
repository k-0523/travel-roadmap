package database

import (
	"travel-roadmap/backend/consts"
	domain_notification "travel-roadmap/backend/domain/notification"
	domain_user "travel-roadmap/backend/domain/user"

	"gorm.io/gorm"
)

type NotificationRepository struct {
}

func (r *NotificationRepository) Create(db *gorm.DB, user *domain_notification.Notification) error {

	if err := db.Debug().Select("ActionName", "VisiterId", "VisitedId", "FollowUserId", "FollowerUserId").Create(&user).Error; err != nil {
		return err
	}
	return nil
}
func (r *NotificationRepository) Search(db *gorm.DB, user *domain_user.User) (notifications []domain_notification.Notification, err error) {

	err = db.Debug().Model(&domain_notification.Notification{}).
		Select("notifications.*, follows.follow_user_id,follows.follower_user_id,users.user_name").
		Joins("join follows on follows.follower_user_id = notifications.follower_user_id join users on users.user_id = notifications.follow_user_id").
		Where("visited_id = ? and checked <> ?", user.UserId, consts.CODE_NOTIFICATION_CHECKED).Group("notification_id").
		Scan(&notifications).
		Error

	if err != nil {
		return notifications, err
	}
	return notifications, nil
}

func (r *NotificationRepository) Update(db *gorm.DB, notification_id int, user *domain_user.User) error {

	if err := db.Model(&domain_notification.Notification{}).
		Where("notification_id = ? and visited_id = ?", notification_id, user.UserId).
		Update("Checked", 1).Error; err != nil {
		return err
	}
	return nil
}

func (r *NotificationRepository) DeleteByUnFollow(db *gorm.DB, follow_user_id int, follower_user_id int) error {

	if err := db.
		Where("follow_user_id = ? and follower_user_id = ?", follow_user_id, follower_user_id).
		Delete(&domain_notification.Notification{}).Error; err != nil {
		return err
	}
	return nil
}

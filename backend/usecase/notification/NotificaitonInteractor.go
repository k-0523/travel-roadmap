package notification

import (
	domain_notification "travel-roadmap/backend/domain/notification"
	domain_user "travel-roadmap/backend/domain/user"
	"travel-roadmap/backend/usecase"
)

type NotificationInteractor struct {
	DB           usecase.DBRepository
	Notification NotificationRepository
}

func (interactor *NotificationInteractor) ListNotifications(user *domain_user.User) ([]domain_notification.Notification, error) {
	db := interactor.DB.Connect()

	notifications, err := interactor.Notification.Search(db, user)
	if err != nil {
		return notifications, err
	}

	return notifications, nil
}

func (interactor *NotificationInteractor) UpdateNotification(notificationId int, user *domain_user.User) error {
	db := interactor.DB.Connect()

	if err := interactor.Notification.Update(db, notificationId, user); err != nil {
		return err
	}

	return nil
}

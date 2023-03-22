package notification

import (
	domain_notification "travel-roadmap/backend/domain/notification"
	domain_user "travel-roadmap/backend/domain/user"

	"gorm.io/gorm"
)

type NotificationRepository interface {
	Create(*gorm.DB, *domain_notification.Notification) error
	Search(*gorm.DB, *domain_user.User) ([]domain_notification.Notification, error)
	Update(*gorm.DB, int, *domain_user.User) error
	DeleteByUnFollow(*gorm.DB, int, int) error
}

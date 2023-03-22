package domain_notification

type Notification struct {
	NotificationId int    `json:"notificationId" gorm:"primaryKey"`
	ActionName     string `json:"actionName" gorm:"column:action_name"`
	UserName       string `json:"userName" gorm:"column:user_name"`
	VisiterId      int    `json:"visiterId"`
	VisitedId      int    `json:"visitedId"`
	PostId         int    `json:"postId"`
	FollowUserId   int    `json:"followUserId"`
	FollowerUserId int    `json:"followerUserId"`
	Checked        int    `json:"checked"`
	CommentId      int    `json:"commentId"`
}

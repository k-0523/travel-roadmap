package domain_user_session

type UserSession struct {
	SessionId string `json:"sessionId" gorm:"primaryKey"`
	UserId    int    `json:"userId"`
}

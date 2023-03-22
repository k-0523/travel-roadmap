package domain_user

import (
	"time"

	validation "github.com/go-ozzo/ozzo-validation/v4"
)

type User struct {
	UserId          int         `json:"userId" gorm:"primaryKey"`
	UserName        string      `json:"userName"`
	Email           string      `json:"email"`
	TmpRegisterUUID string      `json:"tmpUUID"`
	Password        string      `json:"password"`
	UserStatus      int         `json:"userStatus"`
	PasswordToken   string      `json:"passwordToken"`
	EmailVerifiedAt time.Time   `json:"emailVerifiedAt"`
	IsPrivate       int         `json:"isPrivate"`
	CreatedAt       time.Time   `json:"createdAt"`
	UpdatedAt       time.Time   `json:"updatedAt"`
	UserProfile     UserProfile `json:"userProfile" gorm:"foreignkey:UserId"`
}

type UpdateUserPassword struct {
	UserId       int    `json:"userId" gorm:"primaryKey"`
	Password     string `json:"password" binding:"required"`
	NewPassword  string `json:"newPassword" binding:"required"`
	NewPassword2 string `json:"newPassword2" binding:"required"`
}
type PasswordConfirm struct {
	PasswordToken string `json:"passwordToken"`
	NewPassword   string `json:"newPassword" binding:"required"`
	NewPassword2  string `json:"newPassword2" binding:"required"`
}
type UpdateUserName struct {
	UserId   int    `json:"userId" gorm:"primaryKey"`
	UserName string `json:"userName" binding:"required"`
}
type UpdateEmail struct {
	UserId              int    `json:"userId" gorm:"primaryKey"`
	NewEmail            string `json:"newEmail" binding:"required"`
	NewEmailVerifyToken string `json:"newEmailVerifyToken"`
}

type PasswordSetting struct {
	Email         string `json:"email" binding:"required"`
	PasswordToken string `json:"passwordToken"`
}

type UserProfile struct {
	UserId    int     `json:"userId"`
	Introduce *string `json:"introduce"`
	Name      *string `json:"name"`
	Url       *string `json:"url"`
	ImagePath *string `json:"imagePath"`
}

type Mypage struct {
	UserId           int     `json:"userId"`
	UserName         *string `json:"userName"`
	Name             *string `json:"name"`
	Url              *string `json:"url"`
	Introduce        *string `json:"introduce"`
	ProfileImagePath *string `json:"imagePath"`
	CanFollow        bool    `json:"canFollow"`
	IsOwn            bool    `json:"isOwn"`
	TotalViewCount   int64   `json:"totalViewCount"`
	FollowingCount   int64   `json:"followingCount"`
	FollowerCount    int64   `json:"followerCount"`
	IsPrivate        bool    `json:"isPrivate"`
}

// TODO: 別パッケージ化
func (u User) Validate() error {
	return validation.ValidateStruct(&u,
		validation.Field(
			&u.Email,
			validation.Required.Error("名前は必須入力です"),
		),
		validation.Field(
			&u.Password,
			validation.Required.Error("パスワードは必須入力です"),
		),
		// validation.Field(
		// 	&u.UserName,
		// 	validation.Required.Error("ユーザー名は必須入力です"),
		// ),
	)
}

func (u UserProfile) Validate() error {
	return validation.ValidateStruct(&u,
		validation.Field(
			&u.Introduce,
			validation.Required.Error("自己紹介は必須入力です"),
		),
		validation.Field(
			&u.Name,
			validation.Required.Error("名前は必須入力です"),
		),
		validation.Field(
			&u.Url,
			validation.Required.Error("URLは必須入力です"),
		),
	)
}

// TODO: 別パッケージ化
func (u UserProfile) ValidateUpdateProfile() error {
	return validation.ValidateStruct(&u,
		validation.Field(
			&u.Introduce,
			validation.Required.Error("自己紹介は必須入力です"),
		),
		validation.Field(
			&u.Name,
			validation.Required.Error("名前は必須入力です"),
		),
		validation.Field(
			&u.Url,
			validation.Required.Error("URLは必須入力です"),
		),
	)
}

// TODO: 別パッケージ化
func (u User) ValidateLogin() error {
	return validation.ValidateStruct(&u,
		validation.Field(
			&u.Email,
			validation.Required.Error("名前は必須入力です"),
		),
		validation.Field(
			&u.Password,
			validation.Required.Error("パスワードは必須入力です"),
		),
	)
}

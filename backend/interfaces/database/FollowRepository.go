package database

import (
	"errors"
	"fmt"
	domain_follow "travel-roadmap/backend/domain/follow"

	"gorm.io/gorm"
)

type FollowRepository struct{}

func (r *FollowRepository) Create(db *gorm.DB, user domain_follow.Follow) error {

	if err := db.Create(&user).Error; err != nil {
		return err
	}
	return nil
}

func (r *FollowRepository) Delete(db *gorm.DB, followUserId int, followerUserId int) error {

	if err := db.
		Where("follow_user_id = ? AND follower_user_id = ? ", followUserId, followerUserId).
		Delete(domain_follow.Follow{}).
		Error; err != nil {
		return err
	}
	return nil
}

func (r *FollowRepository) Exists(db *gorm.DB, followUserId int, followerUserId int) (exists bool, err error) {

	err = db.Model(domain_follow.Follow{}).
		Where("follow_user_id = ? AND follower_user_id = ? ", followUserId, followerUserId).
		First(&exists).
		Error

	if err != nil {

		if errors.Is(err, gorm.ErrRecordNotFound) {
			return false, nil
		}
	}
	return true, nil
}
func (r *FollowRepository) SearchFollowingUsers(db *gorm.DB, userId int) (users []domain_follow.FollowingUsersWithCount, err error) {

	// todo:paging
	err = db.Debug().Model(&domain_follow.Follow{}).
		Select("follows.follow_user_id,follows.follower_user_id,users.user_id,user_profiles.image_path, users.email,users.user_name").
		Where("follow_user_id = ? ", userId).
		Joins("join users on users.user_id = follows.follower_user_id").
		Joins("join user_profiles on user_profiles.user_id = follows.follower_user_id").
		Scan(&users).
		Error

	if err != nil {
		return users, err
	}
	return users, nil
}

func (r *FollowRepository) SearchFollowingUsersWithCount(db *gorm.DB, userId int, loginUserId int) (users []domain_follow.FollowingUsersWithCount, err error) {
	err = db.Debug().Table("follows as f").
		Select(fmt.Sprintf(`f.follow_user_id,f.follower_user_id,users.user_id,user_profiles.image_path, users.email,users.user_name ,(
			select
				count(*)
			from
				follows 
			where
				follower_user_id = f.follower_user_id
			and follow_user_id = %d
		) as count`, loginUserId)).
		Where("f.follow_user_id = ? ", userId).
		Joins("join users on users.user_id = f.follower_user_id").
		Joins("join user_profiles on user_profiles.user_id = f.follower_user_id").
		Scan(&users).
		Error

	if err != nil {
		return users, err
	}
	return users, nil
}

func (r *FollowRepository) SearchFollowerWithCount(db *gorm.DB, userId int, loginUserId int) (users []domain_follow.FollowerWithCount, err error) {

	// todo:paging
	err = db.Debug().Table("follows as f").
		Select(fmt.Sprintf(`f.follow_user_id,f.follower_user_id,user_profiles.image_path,users.user_id, users.email,users.user_name ,(
			select
				count(*)
			from
				follows
			where
				follower_user_id = f.follow_user_id
			and follow_user_id = %d
		) as count`, loginUserId)).
		Where("f.follower_user_id = ? ", userId).
		Joins("join users on users.user_id = f.follow_user_id").
		Joins("join user_profiles on user_profiles.user_id = f.follow_user_id").
		Scan(&users).
		Error

	/*

		select
			f.follow_user_id,
			f.follower_user_id,
			users.email,
			users.user_name,
			(
				select
					count(*)
				from
					follows
				where
					follower_user_id = f.follow_user_id
				and follow_user_id = 1
			) as count
		from
			follows as f
			JOIN
				users
			ON  users.user_id = f.follower_user_id
		where
			f.follower_user_id = 2
		;

	*/
	if err != nil {
		return users, err
	}
	return users, nil
}

func (r *FollowRepository) SearchFollower(db *gorm.DB, userId int) (users []domain_follow.Followers, err error) {

	// todo:paging
	err = db.Model(&domain_follow.Follow{}).
		Select("users.user_id, users.email,users.user_name").
		Where("follower_user_id = ? ", userId).
		Joins("join users on users.user_id = follows.follower_user_id").
		Scan(&users).
		Error

	if err != nil {
		return users, err
	}
	return users, nil
}

func (r *FollowRepository) GetFollowingUserCount(db *gorm.DB, userId int) (count int64, err error) {

	if err := db.Debug().Model(&domain_follow.Follow{}).Where("follow_user_id = ? ", userId).Count(&count).Error; err != nil {
		return count, err
	}

	return count, nil
}

func (r *FollowRepository) GetFollowerCount(db *gorm.DB, userId int) (count int64, err error) {

	if err := db.Debug().Model(&domain_follow.Follow{}).Where("follower_user_id = ? ", userId).Count(&count).Error; err != nil {
		return count, err
	}

	return count, nil
}

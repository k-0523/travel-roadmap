package database

import (
	"strconv"
	domain_content "travel-roadmap/backend/domain/content"

	"gorm.io/gorm"
)

type ContentRepository struct{}

func (repo *ContentRepository) Get(
	db *gorm.DB,
	post *domain_content.Post,
	posts *[]domain_content.Post,
) (err error) {
	result := db.Table("posts").
		Where("data_status <> ?", 9)

	// 投稿日
	if post.SearchParam.SortCreatedAt != "" {
		if post.SearchParam.SortCreatedAt == "desc" {
			result = result.Order("created_at desc")
		}
		if post.SearchParam.SortCreatedAt == "asc" {
			result = result.Order("created_at asc")
		}
	}

	// 同行者
	if post.SearchParam.Accompany != "" {
		a, _ := strconv.Atoi(post.SearchParam.Accompany)
		result = result.Where("accompany_person_category = ?", a)
	}

	// 人数
	if post.SearchParam.NumberOfPerson != "" {
		nop, _ := strconv.Atoi(post.SearchParam.NumberOfPerson)
		result = result.Where("number_of_person = ?", nop)
	}

	// 旅行する月
	if post.SearchParam.Month != "" {
		m, _ := strconv.Atoi(post.SearchParam.Month)
		result = result.Where("DATE_FORMAT(`from_date`, '%m' ) = ?", m).
			Where("DATE_FORMAT(`to_date`, '%m' ) = ?", m)
	}

	// 泊
	if post.SearchParam.Nights != "" {
		n, _ := strconv.Atoi(post.SearchParam.Nights)
		result = result.Where("nights = ?", n)
	}

	// 日
	if post.SearchParam.Days != "" {
		d, _ := strconv.Atoi(post.SearchParam.Days)
		result = result.Where("days = ?", d)
	}

	// 通貨
	if post.SearchParam.Currency != "" {
		c, _ := strconv.Atoi(post.SearchParam.Currency)
		result = result.Where("currency = ?", c)
	}

	// 予算
	if post.SearchParam.FromBudget != "" && post.SearchParam.ToBudget != "" {
		fb, _ := strconv.Atoi(post.SearchParam.FromBudget)
		tb, _ := strconv.Atoi(post.SearchParam.ToBudget)
		result = result.Where("budget >= ?", fb).
			Where("budget < ?", tb)
	}

	// 出発国
	if post.SearchParam.Country != "" {
		result = result.Where("depature_country = ?", post.SearchParam.Country)
	}

	// 出発都道府県
	if post.SearchParam.Prefecture != "" {
		result = result.Where("depature_prefecture = ?", post.SearchParam.Prefecture)
	}

	// 出発都市
	if post.SearchParam.City != "" {
		result = result.Where("depature_city = ?", post.SearchParam.City)
	}

	result = result.Find(&posts)
	if result.Error != nil {
		return result.Error
	}
	return
}

func (repo *ContentRepository) Search(
	db *gorm.DB,
	post *domain_content.Post,
	posts *[]domain_content.Post,
) (err error) {
	result := db.Table("posts").
		Preload("Favorites", "user_id = ?", post.UserID).
		Preload("ViewHistories").
		Where("posts.data_status <> ?", 9).
		Where("title LIKE ?", "%"+post.SearchParam.Keyword+"%").
		Find(&posts)
	if result.Error != nil {
		return err
	}

	return
}

func (repo *ContentRepository) SearchByUserId(db *gorm.DB, userId int) (posts []domain_content.Post, err error) {
	result := db.Table("posts").
		Where("posts.data_status <> ? and user_id = ? ", 9, userId).
		Find(&posts)
	if result.Error != nil {
		return posts, err
	}
	return posts, nil
}

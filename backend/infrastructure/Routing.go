package infrastructure

import (
	"os"
	"time"
	"travel-roadmap/backend/interfaces/controllers/auth"
	"travel-roadmap/backend/interfaces/controllers/aws"
	"travel-roadmap/backend/interfaces/controllers/comment"
	"travel-roadmap/backend/interfaces/controllers/content"
	"travel-roadmap/backend/interfaces/controllers/favorite"
	"travel-roadmap/backend/interfaces/controllers/follow"
	"travel-roadmap/backend/interfaces/controllers/notification"
	"travel-roadmap/backend/interfaces/controllers/user"
	"travel-roadmap/backend/interfaces/controllers/view_history"

	"travel-roadmap/backend/infrastructure/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Routing struct {
	DB   *DB
	Gin  *gin.Engine
	Port string
}

func NewRouting(db *DB) *Routing {
	rc := NewRoutingConfig()
	r := &Routing{
		DB:   db,
		Gin:  gin.Default(),
		Port: rc.Port,
	}

	r.Gin.Use(gin.Logger())
	r.Gin.Use(gin.Recovery())

	env := os.Getenv("GO_ENV")
	if env != "local" {
		fullUrl := os.Getenv("APP_FULL_URL")

		r.Gin.Use(cors.New(
			cors.Config{
				AllowOrigins: []string{
					fullUrl,
				},
				AllowMethods: []string{
					"POST",
					"GET",
					"OPTIONS",
					"PUT",
					"PATCH",
					"DELETE",
				},
				AllowHeaders: []string{
					"Content-Type",
					"Access-Control-Allow-Headers",
					"access-control-allow-origin",
					"Access-Control-Allow-Credentials",
					"Access-Control-Allow-Methods",
				},
				AllowCredentials: true,
				MaxAge:           24 * time.Hour,
			},
		))

	}
	r.setRouting()

	return r
}

func (r *Routing) setRouting() {

	v1 := r.Gin.Group("/api/v1")
	{
		v1.GET("/health", func(ctx *gin.Context) { ctx.JSON(200, gin.H{"message": "ok"}) })

		signUpController := auth.NewSignUpController(r.DB)
		v1.POST("/signup", func(ctx *gin.Context) { signUpController.Exec(ctx) })
		signInController := auth.NewSignInController(r.DB)
		v1.POST("/signin", func(ctx *gin.Context) { signInController.Exec(ctx) })

		// 仮会員⇒本登録API
		confimrUserController := auth.NewConfirmUserController(r.DB)
		v1.POST("/confirmation/:uuid", func(ctx *gin.Context) { confimrUserController.Exec(ctx) })

		confimrNewEmailC := user.NewConfirmEmailController(r.DB)
		v1.POST("/confirmation/email/:uuid", func(ctx *gin.Context) { confimrNewEmailC.Exec(ctx) })

		sendPass := user.NewPasswordResettingController(r.DB)
		v1.POST("/password", func(ctx *gin.Context) { sendPass.Exec(ctx) })

		confirmPass := user.NewPasswordConfirmController(r.DB)
		v1.POST("/password/:uuId", func(ctx *gin.Context) { confirmPass.Exec(ctx) })

	}

	/*------------------------------
	* 要認証API
	------------------------------*/
	uAuth := r.Gin.Group("/api/v1", middleware.LoginCheckMiddleware(r.DB))
	{
		mypageController := user.NewMypageController(r.DB)
		uAuth.GET("/mypage/:userId", func(ctx *gin.Context) { mypageController.Exec(ctx) })

		// フォローユーザー、フォロワー取得API
		listFollowUsersController := follow.NewListFollowUsersController(r.DB)
		uAuth.GET("/following/:userId", func(ctx *gin.Context) { listFollowUsersController.Exec(ctx) })
		listFollowerController := follow.NewListFollowerController(r.DB)
		uAuth.GET("/follower/:userId", func(ctx *gin.Context) { listFollowerController.Exec(ctx) })

		fileController := aws.NewFileController()
		uAuth.POST("/file/upload", func(c *gin.Context) { fileController.Upload(c) })

		// 投稿一覧
		contentController := content.NewContentController(r.DB)
		uAuth.POST("/content/list", func(c *gin.Context) { contentController.Get(c) })
		uAuth.POST("/content/search", func(c *gin.Context) { contentController.Search(c) })

		// ユーザーIDをもとに投稿を取得
		listUserContentController := content.NewListUserContentController(r.DB)
		uAuth.GET("/content/:userId", func(c *gin.Context) { listUserContentController.Exec(c) })

		// 投稿のCRUD
		contentDetailController := content.NewContentDetailController(r.DB)
		uAuth.POST("/content-detail/create", func(c *gin.Context) { contentDetailController.Create(c) })
		uAuth.POST("/content-detail/view", func(c *gin.Context) { contentDetailController.Get(c) })
		uAuth.POST("/content-detail/update", func(c *gin.Context) { contentDetailController.Update(c) })
		uAuth.POST("/content-detail/delete", func(c *gin.Context) { contentDetailController.Delete(c) })

		commentController := comment.NewCommentController(r.DB)
		uAuth.POST("/comment/create", func(c *gin.Context) { commentController.Create(c) })
		uAuth.GET("/comment/list", func(c *gin.Context) { commentController.GetCommentList(c) })
		uAuth.POST("/comment/count", func(c *gin.Context) { commentController.GetCountComments(c) })

		// いいね機能
		favoriteController := favorite.NewFavoriteController(r.DB)
		uAuth.POST("/favorite/update", func(c *gin.Context) { favoriteController.UpdateFavorite(c) })
		uAuth.POST("/favorite/count", func(c *gin.Context) { favoriteController.GetCountFavorites(c) })
		listFavoriteController := favorite.NewListFavoriteController(r.DB)
		uAuth.GET("/favoriete/:userId/contents", func(c *gin.Context) { listFavoriteController.Exec(c) })

		// 閲覧履歴
		viewHistoryController := view_history.NewViewHistoryController(r.DB)
		uAuth.GET("/view-history/list", func(c *gin.Context) { viewHistoryController.Get(c) })
		// ログアウトAPI
		signOutController := auth.NewSignOutController(r.DB)
		uAuth.POST("/signout", func(ctx *gin.Context) { signOutController.Exec(ctx) })

		// ログインユーザー情報取得API
		detailUserController := user.NewDetailUserController(r.DB)
		uAuth.GET("/user", func(ctx *gin.Context) { detailUserController.Exec(ctx) })

		// プロフィール情報更新API
		updateUserProfileController := user.NewUpdateProfileController(r.DB)
		uAuth.PUT("/user", func(ctx *gin.Context) { updateUserProfileController.Exec(ctx) })

		// フォロー、フォロー解除API
		followController := follow.NewFollowController(r.DB)
		uAuth.POST("/following/:userId", func(ctx *gin.Context) { followController.Exec(ctx) })
		unFollowController := follow.NewUnFollowController(r.DB)
		uAuth.DELETE("/following/:userId", func(ctx *gin.Context) { unFollowController.Exec(ctx) })

		withdrawalController := user.NewWithdrawalController(r.DB)
		uAuth.DELETE("/user", func(ctx *gin.Context) { withdrawalController.Exec(ctx) })
		updatePasswordController := user.NewUpdatePasswordController(r.DB)
		uAuth.PUT("/user/password", func(ctx *gin.Context) { updatePasswordController.Exec(ctx) })

		updateUserNameC := user.NewUpdateUserNameController(r.DB)
		uAuth.PUT("/user/username", func(ctx *gin.Context) { updateUserNameC.Exec(ctx) })

		updatEmailC := user.NewUpdateEmailController(r.DB)
		uAuth.PUT("/user/email", func(ctx *gin.Context) { updatEmailC.Exec(ctx) })

		privateC := user.NewPrivateSettingController(r.DB)
		uAuth.PUT("/user/private", func(ctx *gin.Context) { privateC.Exec(ctx) })

		notificationC := notification.NewNotificationListController(r.DB)
		uAuth.GET("/notifications", func(ctx *gin.Context) { notificationC.Exec(ctx) })

		updateNotificationC := notification.NewUpdatenotifcationController(r.DB)
		uAuth.PUT("/notifications/:notificationId", func(ctx *gin.Context) { updateNotificationC.Exec(ctx) })
	}
}

func (r *Routing) Run() {
	r.Gin.Run(r.Port)
}

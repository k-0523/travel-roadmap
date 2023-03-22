package middleware

import (
	"net/http"
	"travel-roadmap/backend/interfaces/controllers"
	"travel-roadmap/backend/interfaces/database"

	"github.com/gin-gonic/gin"
)

func LoginCheckMiddleware(db database.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		sessionId, err := ctx.Cookie("user_travel_roadmap_auth")

		if err != nil {
			ctx.JSON(http.StatusUnauthorized, controllers.NewH(err.Error(), nil))
			ctx.Abort()
			return
		}
		r := database.UserRepositroy{}

		session, err := r.FindSession(db.Connect(), sessionId)
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, controllers.NewH(err.Error(), nil))
			ctx.Abort()
			return
		}

		user, err := r.Find(db.Connect(), session.UserId)
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, controllers.NewH(err.Error(), nil))
			ctx.Abort()
			return
		}

		ctx.Set("loginUser", user)
		ctx.Next()
	}
}

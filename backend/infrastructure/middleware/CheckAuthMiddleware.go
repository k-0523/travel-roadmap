package middleware

import (
	"log"
	"travel-roadmap/backend/interfaces/database"

	"github.com/gin-gonic/gin"
)

func CheckAuthMiddleware(db database.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		sessionId, err := ctx.Cookie("user_travel_roadmap_auth")

		if err != nil {
			log.Print(err.Error())
			ctx.Next()
			return
		}
		r := database.UserRepositroy{}

		session, err := r.FindSession(db.Connect(), sessionId)
		if err != nil {
			log.Print(err.Error())

			ctx.Next()
			return
		}

		user, err := r.Find(db.Connect(), session.UserId)

		if err != nil {
			log.Print(err.Error())
			ctx.Next()
			return
		}

		ctx.Set("loginUser", user)
		ctx.Next()
	}
}

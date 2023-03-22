package feature

import (
	"net/http/httptest"
	"testing"
	"travel-roadmap/backend/infrastructure"
)

var (
	db     *infrastructure.DB      = infrastructure.NewDB()
	router *infrastructure.Routing = infrastructure.NewRouting(db)
)

func TestHealthCheckHandler(t *testing.T) {

	r := httptest.NewRequest("GET", "/api/v1/health", nil)
	w := httptest.NewRecorder()

	router.Gin.ServeHTTP(w, r)

	response := w.Result()

	if response.StatusCode != 200 {
		t.Errorf("cannot read test response: %v", response)
	}
}

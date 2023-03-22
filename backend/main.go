package main

import "travel-roadmap/backend/infrastructure"

func main() {
	db := infrastructure.NewDB()
	r := infrastructure.NewRouting(db)
	r.Run()
}

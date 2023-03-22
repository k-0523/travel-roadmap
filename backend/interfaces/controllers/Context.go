package controllers

import (
	"mime/multipart"
	"net/http"
)

type Context interface {
	Param(key string) string
	JSON(code int, obj interface{})
	ShouldBindJSON(obj interface{}) error
	Query(key string) string
	SetSameSite(samesite http.SameSite)
	SetCookie(name, value string, maxAge int, path, domain string, secure, httpOnly bool)
	Cookie(name string) (string, error)
	Get(key string) (value interface{}, exists bool)
	FormFile(name string) (*multipart.FileHeader, error)
}

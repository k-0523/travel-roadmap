package aws

import (
	"net/http"
	"travel-roadmap/backend/interfaces/controllers"
	utils "travel-roadmap/backend/utils"
)

type UploadFileController struct{}

func NewUploadFileController() *UploadFileController {
	return &UploadFileController{}
}

type Response struct {
	FilePath  string `json:"filePath"`
	SignedUrl string `json:"signedUrl"`
}

func (controller *UploadFileController) Exec(c controllers.Context) {
	awsS3 := utils.NewAwsS3()

	fileHeader, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, controllers.NewH(err.Error(), nil))
		return
	}

	file, err := fileHeader.Open()
	if err != nil {
		c.JSON(http.StatusBadRequest, controllers.NewH(err.Error(), nil))
		return
	}

	fp, err := awsS3.Upload(file, "png")
	if err != nil {
		c.JSON(http.StatusBadRequest, controllers.NewH(err.Error(), nil))
		return
	}

	signedUrl, _ := awsS3.Get(fp)

	c.JSON(http.StatusCreated, controllers.NewH("success", Response{fp, signedUrl}))
}

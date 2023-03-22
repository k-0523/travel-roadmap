package aws

import (
	"net/http"
	"travel-roadmap/backend/interfaces/controllers"
	utils "travel-roadmap/backend/utils"
)

type FileController struct{}

func NewFileController() *FileController {
	return &FileController{}
}

type Response struct {
	FilePath  string `json:"filePath"`
	SignedUrl string `json:"signedUrl"`
}

func (controller *FileController) Upload(c controllers.Context) {
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

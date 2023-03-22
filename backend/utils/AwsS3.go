package utils

import (
	"errors"
	"fmt"
	"mime/multipart"
	"os"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/google/uuid"
)

type AwsS3 struct {
	AwsS3Config *AwsS3Config
	Keys        AwsS3URLs
	Uploader    *s3manager.Uploader
	S3          *s3.S3
}

type AwsS3URLs struct {
	ImagePath string
}

type AwsS3Config struct {
	Aws struct {
		S3 struct {
			Region          string
			Bucket          string
			AccessKeyID     string
			SecretAccessKey string
		}
	}
}

func NewAwsS3Config() *AwsS3Config {

	c := new(AwsS3Config)

	c.Aws.S3.Region = os.Getenv("AWS_S3_REGION")
	c.Aws.S3.Bucket = os.Getenv("AWS_S3_BUCKET")
	c.Aws.S3.AccessKeyID = os.Getenv("AWS_S3_ACCESS_KEY_ID")
	c.Aws.S3.SecretAccessKey = os.Getenv("AWS_S3_SECRET_ACCESS_KEY")

	return c
}

func NewAwsS3() *AwsS3 {

	config := NewAwsS3Config()

	sess := session.Must(session.NewSessionWithOptions(session.Options{
		Config: aws.Config{
			Credentials: credentials.NewStaticCredentialsFromCreds(credentials.Value{
				AccessKeyID:     config.Aws.S3.AccessKeyID,
				SecretAccessKey: config.Aws.S3.SecretAccessKey,
			}),
			Region: aws.String(config.Aws.S3.Region),
		},
	}))

	return &AwsS3{
		AwsS3Config: config,
		Keys: AwsS3URLs{
			ImagePath: "/images",
		},
		Uploader: s3manager.NewUploader(sess),
		S3:       s3.New(sess),
	}
}

func (a *AwsS3) Upload(file multipart.File, extension string) (path string, err error) {

	var contentType string

	switch extension {
	case "jpg":
		contentType = "image/jpeg"
	case "jpeg":
		contentType = "image/jpeg"
	case "png":
		contentType = "image/png"
	default:
		return "", errors.New("拡張子が正しくありません。")
	}

	u, err := uuid.NewRandom()
	if err != nil {
		return "", errors.New("UUID生成に失敗しました。")
	}

	path = a.Keys.ImagePath + "/" + u.String() + "." + extension

	_, err = a.Uploader.Upload(&s3manager.UploadInput{
		// ACL:         aws.String("public-read"),
		Body:        file,
		Bucket:      aws.String(a.AwsS3Config.Aws.S3.Bucket),
		ContentType: aws.String(contentType),
		Key:         aws.String(path),
	})

	if err != nil {
		return "", fmt.Errorf("failed to upload file, %v", err)
	}

	return path, nil
}

// 署名付きURLを発行しURLを返す
func (a *AwsS3) Get(path string) (url string, err error) {
	if path == "" {
		return "", nil
	}
	result, _ := a.S3.GetObjectRequest(&s3.GetObjectInput{
		Bucket: aws.String(a.AwsS3Config.Aws.S3.Bucket),
		Key:    aws.String(path),
	})

	url, err = result.Presign(10 * time.Minute)
	if err != nil {
		return "", fmt.Errorf("failed to get file, %v", err)
	}
	return url, nil
}

package utils

import (
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/ses"
)

func SendEmail(to string, titleContent string, body string) error {

	from := os.Getenv("FROM_MAIL_ADRESS")
	awsAccessKey := os.Getenv("AWS_ACCESS_KEY_ID")
	awsSecretKey := os.Getenv("AWS_SECRET_KEY")
	sesRegion := os.Getenv("AWS_SES_REGION")
	titleHead := " ［travel_roadmap］"

	title := fmt.Sprintf("%s%s", titleHead, titleContent)

	awsSession, _ := session.NewSession(&aws.Config{
		Region:      aws.String(sesRegion),
		Credentials: credentials.NewStaticCredentials(awsAccessKey, awsSecretKey, ""),
	})
	client := ses.New(awsSession)
	input := &ses.SendEmailInput{
		Destination: &ses.Destination{
			ToAddresses: []*string{
				aws.String(to),
			},
		},
		Message: &ses.Message{
			Body: &ses.Body{
				Text: &ses.Content{
					Charset: aws.String("UTF-8"),
					Data:    aws.String(body),
				},
			},
			Subject: &ses.Content{
				Charset: aws.String("UTF-8"),
				Data:    aws.String(title),
			},
		},
		Source: aws.String(from),
	}
	_, err := client.SendEmail(input)
	if err != nil {
		return err

	}
	return nil
}

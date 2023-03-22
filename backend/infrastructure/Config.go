package infrastructure

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

type DBConfig struct {
	DriverName string
	Host       string
	Username   string
	Password   string
	DBName     string
	Port       string
}
type RoutingConfig struct {
	Port string
}

const targetEnvName = "GO_ENV"

func loadEnv() error {
	result := os.Getenv(targetEnvName)
	if result == "" {
		_ = os.Setenv(targetEnvName, "local")
	} else if result == "develop" {
		_ = os.Setenv(targetEnvName, "develop")
	} else if result == "production" {
		_ = os.Setenv(targetEnvName, "production")
	}

	if err := godotenv.Load(fmt.Sprintf("%s.env", os.Getenv(targetEnvName))); err != nil {
		log.Fatalf("Error loading env target db conifg")
		return err
	}
	return nil
}

func NewDBConfig() *DBConfig {

	dbc := new(DBConfig)

	if err := loadEnv(); err != nil {
		log.Printf("Failed to read env file")
		os.Exit(1)
	}

	dbc.DriverName = os.Getenv("DB_DRIVER_NAME")
	dbc.Host = os.Getenv("DB_HOST")
	dbc.Username = os.Getenv("DB_USERNAME")
	dbc.Password = os.Getenv("DB_USER_PASSWORD")
	dbc.DBName = os.Getenv("DB_NAME")
	dbc.Port = os.Getenv("DB_PORT")

	return dbc
}

func NewRoutingConfig() *RoutingConfig {
	rc := new(RoutingConfig)

	if err := loadEnv(); err != nil {
		log.Printf("Failed to read env file")
		os.Exit(1)
	}

	rc.Port = os.Getenv("SERVER_PORT")

	return rc
}

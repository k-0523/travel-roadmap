package infrastructure

import (
	"fmt"

	"gorm.io/driver/mysql"
	_ "gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DB struct {
	DriverName string
	Host       string
	Username   string
	Password   string
	DBName     string
	Port       string
	Connection *gorm.DB
}

func NewDB() *DB {
	dbc := NewDBConfig()
	return newDB(&DB{
		DriverName: dbc.DriverName,
		Host:       dbc.Host,
		Username:   dbc.Username,
		Password:   dbc.Password,
		DBName:     dbc.DBName,
		Port:       dbc.Port,
	})
}

func newDB(d *DB) *DB {
	dbConnectInfo := fmt.Sprintf(
		`%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local`,
		d.Username,
		d.Password,
		d.Host,
		d.Port,
		d.DBName,
	)
	db, err := gorm.Open(mysql.Open(dbConnectInfo), &gorm.Config{})
	if err != nil {
		panic(err.Error())
	}
	d.Connection = db
	return d
}

func (db *DB) Begin() *gorm.DB {
	return db.Connection.Begin()
}

func (db *DB) Connect() *gorm.DB {
	return db.Connection
}

CREATE TABLE IF NOT EXISTS users (
    user_id INT(8) NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(255),
    email VARCHAR(255),
    new_email VARCHAR(255),
    new_email_verify_token VARCHAR(255) ,
    tmp_register_uuid VARCHAR(255),
    password VARCHAR(255), 
    password_token VARCHAR(255),
    password_token_limit DATETIME,
	user_status INT(8),
	is_private INT(8) DEFAULT 1,
    data_status INT(8),
    email_verified_at DATETIME,
    created_at DATETIME,
    updated_at DATETIME,
	PRIMARY KEY (user_id)
)
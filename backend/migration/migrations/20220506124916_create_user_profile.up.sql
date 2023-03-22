CREATE TABLE IF NOT EXISTS user_profiles(
    user_profile_id INT(11) NOT NULL AUTO_INCREMENT,
	user_id INT(8) NOT NULL,
	name VARCHAR(255) ,
	introduce TEXT,
	url VARCHAR(255),
	image_path TEXT,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (user_profile_id)
)
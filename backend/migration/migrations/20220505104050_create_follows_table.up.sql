CREATE TABLE IF NOT EXISTS follows(
    follow_id INT(11) NOT NULL AUTO_INCREMENT,
	follow_user_id INT(8) NOT NULL,
	follower_user_id INT(8) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (follow_id)
)
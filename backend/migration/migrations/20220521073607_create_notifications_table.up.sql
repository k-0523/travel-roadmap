CREATE TABLE IF NOT EXISTS notifications(
    notification_id INT(8) NOT NULL AUTO_INCREMENT,
	visiter_id INT(8) ,
	visited_id INT(8) ,
	post_id INT(8) ,
	comment_id INT(8) ,
	follow_user_id INT(8) ,
	follower_user_id INT(8) ,
	action_name VARCHAR(255),
	checked INT(8) DEFAULT 9,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (notification_id)
)


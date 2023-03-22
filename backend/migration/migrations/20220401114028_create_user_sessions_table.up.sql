CREATE TABLE IF NOT EXISTS user_sessions (
    session_id VARCHAR(255) NOT NULL,
    user_id INT(8),
    ip_address VARCHAR(255),
	PRIMARY KEY (session_id)
)
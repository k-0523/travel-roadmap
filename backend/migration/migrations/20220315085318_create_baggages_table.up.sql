CREATE TABLE IF NOT EXISTS buggages (
    id INT(11) NOT NULL AUTO_INCREMENT,
    post_id INT(11) NOT NULL,
    name VARCHAR(255) NOT NULL,
    data_status TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (id)
)
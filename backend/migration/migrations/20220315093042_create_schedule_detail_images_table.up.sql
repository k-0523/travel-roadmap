CREATE TABLE IF NOT EXISTS schedule_detail_images (
    id INT(11) NOT NULL AUTO_INCREMENT,
    schedule_detail_id INT(11) NOT NULL,
    image_path TEXT NOT NULL,
    data_status TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (id)
)
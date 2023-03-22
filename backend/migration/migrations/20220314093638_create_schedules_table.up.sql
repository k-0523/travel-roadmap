CREATE TABLE IF NOT EXISTS schedules(
    id INT(11) NOT NULL AUTO_INCREMENT,
    post_id INT(11) NOT NULL,
    day TINYINT(2) NOT NULL,
    data_status TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP COMMENT '作成日時',
    updated_at TIMESTAMP COMMENT '更新日時',
    PRIMARY KEY (id)
)
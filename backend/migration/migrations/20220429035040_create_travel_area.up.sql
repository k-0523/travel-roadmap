CREATE TABLE IF NOT EXISTS travel_areas(
    id INT(11) NOT NULL AUTO_INCREMENT,
    schedule_id INT(11) NOT NULL,
    country VARCHAR(40) NOT NULL COMMENT '国',
    prefecture VARCHAR(40) NOT NULL COMMENT '都道府県',
    city VARCHAR(40) NOT NULL COMMENT '市',
    data_status TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (id)
)
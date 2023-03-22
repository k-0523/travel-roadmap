CREATE TABLE IF NOT EXISTS schedule_details(
    id INT(11) NOT NULL AUTO_INCREMENT,
    schedule_id INT(11) NOT NULL,
    country VARCHAR(40) NOT NULL COMMENT '国',
    prefecture VARCHAR(40) NOT NULL COMMENT '都道府県',
    city VARCHAR(40) NOT NULL COMMENT '市',
    time TIME NOT NULL,
    transportation TINYINT(2) NOT NULL,
    title VARCHAR(50) NOT NULL,
    place VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    data_status TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (id)
)
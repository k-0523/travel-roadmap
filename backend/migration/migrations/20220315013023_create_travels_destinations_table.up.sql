CREATE TABLE IF NOT EXISTS travel_destinations(
    id INT(11) NOT NULL AUTO_INCREMENT,
    schedule_id INT(11) NOT NULL,
    geographiy_id INT(11) NOT NULL,
    data_status TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (id)
)
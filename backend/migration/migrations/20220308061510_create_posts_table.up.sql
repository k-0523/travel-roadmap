CREATE TABLE IF NOT EXISTS posts(
    id INT(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
    user_id INT(11) NOT NULL COMMENT 'ユーザーID',
    title VARCHAR(50) NOT NULL COMMENT 'タイトル',
    view_count INT(11) DEFAULT 0 COMMENT '閲覧数',
    image_path TEXT COMMENT 'サムネイル画像パス',
    from_date DATE NOT NULL COMMENT '開始日付',
    to_date DATE NOT NULL COMMENT '終了日時',
    nights TINYINT(2) NOT NULL COMMENT '泊',
    days TINYINT(2) NOT NULL COMMENT '日',
    accompany_person_category TINYINT(1) NOT NULL DEFAULT 0 COMMENT '同行者ジャンル',
    number_of_person TINYINT(2) NOT NULL DEFAULT 0 COMMENT '同行者数',
    budget INT(10) NOT NULL COMMENT '予算',
    currency TINYINT(2) NOT NULL COMMENT '通貨',
    depature_country VARCHAR(40) NOT NULL COMMENT '出発国',
    depature_prefecture VARCHAR(40) NOT NULL COMMENT '出発都道府県',
    depature_city VARCHAR(40) NOT NULL COMMENT '出発市',
    thought VARCHAR(255) COMMENT '感想',
    data_status TINYINT(1) NOT NULL DEFAULT 0 COMMENT '1(有効),9(無効)',
    created_at TIMESTAMP COMMENT '作成日時',
    updated_at TIMESTAMP COMMENT '更新日時',
    PRIMARY KEY (id)
);
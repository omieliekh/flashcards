BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `users` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`name`	TEXT NOT NULL,
	`email`	TEXT NOT NULL UNIQUE,
	`password`	TEXT,
	`role`	TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS `slideshows_to_languages` (
	`slideshow_id`	INTEGER NOT NULL DEFAULT 1,
	`lang_code`	TEXT NOT NULL DEFAULT 'en',
	FOREIGN KEY(`slideshow_id`) REFERENCES `slideshows`(`id`) ON UPDATE CASCADE,
	FOREIGN KEY(`lang_code`) REFERENCES `languages`(`code`) ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS `slideshows` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`name`	TEXT NOT NULL,
	`user_id`	INTEGER NOT NULL DEFAULT 1,
	FOREIGN KEY(`user_id`) REFERENCES `users`(`id`) ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS `slides_to_languages` (
	`slide_id`	INTEGER NOT NULL DEFAULT 1,
	`lang_code`	TEXT NOT NULL DEFAULT 'en',
	`text`	TEXT DEFAULT '',
	FOREIGN KEY(`slide_id`) REFERENCES `slides`(`id`) ON UPDATE CASCADE,
	FOREIGN KEY(`lang_code`) REFERENCES `languages`(`code`) ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS `slides` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`text`	TEXT DEFAULT '',
	`lang_code`	TEXT NOT NULL DEFAULT 'en',
	`image_path`	TEXT,
	`slideshow_id`	INTEGER NOT NULL DEFAULT 1,
	`user_id`	INTEGER NOT NULL DEFAULT 1,
	FOREIGN KEY(`user_id`) REFERENCES `users`(`id`) ON UPDATE CASCADE,
	FOREIGN KEY(`slideshow_id`) REFERENCES `slideshows`(`id`) ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS `languages` (
	`code`	TEXT NOT NULL UNIQUE,
	`name`	TEXT NOT NULL,
	PRIMARY KEY(`code`)
);

-- '81dc9bdb52d04dc20036dbd8313ed055' => md5 hash of '1234'
INSERT OR IGNORE INTO users (id, name, email, password, role)
  VALUES (1, "Admin", "admin", "81dc9bdb52d04dc20036dbd8313ed055", "admin");

COMMIT;

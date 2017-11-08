BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `users` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`name`	TEXT NOT NULL,
	`email`	TEXT NOT NULL UNIQUE,
	`password`	TEXT,
	`role`	TEXT NOT NULL
);

-- '81dc9bdb52d04dc20036dbd8313ed055' => md5 hash of '1234'
INSERT OR IGNORE INTO users (id, name, email, password, role)
  VALUES (1, "Admin", "admin", "81dc9bdb52d04dc20036dbd8313ed055", "admin");

COMMIT;

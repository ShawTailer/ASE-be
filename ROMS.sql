CREATE TABLE `buildings` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255),
  `description` VARCHAR(255),
  `location` VARCHAR(255)
);

CREATE TABLE `rooms` (
  `room_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `room_number` INTEGER NOT NULL,
  `building_id` INTEGER NOT NULL,
  `available` TINYINT(1) NOT NULL DEFAULT 1,
  FOREIGN KEY (`building_id`) REFERENCES `buildings` (`id`)
);

CREATE TABLE `users` (
  `username` VARCHAR(50) PRIMARY KEY,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `phone_num` VARCHAR(255) UNIQUE NOT NULL,
  `hashed_password` VARCHAR(255) NOT NULL,
  `role` ENUM('teacher', 'student', 'guest') NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `password_changed_at` DATETIME NOT NULL DEFAULT '2000-01-01 00:00:00'
);

CREATE TABLE `bookings` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `room_id` INTEGER NOT NULL,
  `user` VARCHAR(50) NOT NULL,
  `status` ENUM('cancelled', 'pending', 'confirmed') NOT NULL,
  `start_time` DATETIME NOT NULL,
  `end_time` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `updated_at` DATETIME NOT NULL DEFAULT NOW(),
  FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`),
  FOREIGN KEY (`user`) REFERENCES `users` (`username`)
);

CREATE INDEX idx_bookings_room_id ON bookings(room_id);
CREATE INDEX idx_bookings_user ON bookings(user);
CREATE INDEX idx_rooms_building_id ON rooms(building_id);

INSERT INTO buildings (name, description, location) VALUES ('Main Building', 'Main campus building', 'Campus A');
INSERT INTO rooms (room_number, building_id, available) VALUES (101, 1, 1);
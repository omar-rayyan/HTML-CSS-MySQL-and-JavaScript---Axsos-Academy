CREATE DATABASE friendships_db;
USE friendships_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(45),
    last_name VARCHAR(45),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE friendships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    friend_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (friend_id) REFERENCES users(id)
);


-- Query: Create 6 new users
INSERT INTO users (first_name, last_name) VALUES ('Amy', 'Giver');
INSERT INTO users (first_name, last_name) VALUES ('Eli', 'Byers');
INSERT INTO users (first_name, last_name) VALUES ('Big', 'Bird');
INSERT INTO users (first_name, last_name) VALUES ('Kermit', 'The Frog');
INSERT INTO users (first_name, last_name) VALUES ('Marky', 'Mark');
INSERT INTO users (first_name, last_name) VALUES ('Sandra', 'Stone');

-- Query: Have user 1 be friends with users 2, 4, and 6
INSERT INTO friendships (user_id, friend_id) VALUES (1, 2);
INSERT INTO friendships (user_id, friend_id) VALUES (1, 4);
INSERT INTO friendships (user_id, friend_id) VALUES (1, 6);

-- Query: Have user 2 be friends with users 1, 3, and 5
INSERT INTO friendships (user_id, friend_id) VALUES (2, 1);
INSERT INTO friendships (user_id, friend_id) VALUES (2, 3);
INSERT INTO friendships (user_id, friend_id) VALUES (2, 5);

-- Query: Have user 3 be friends with users 2 and 5
INSERT INTO friendships (user_id, friend_id) VALUES (3, 2);
INSERT INTO friendships (user_id, friend_id) VALUES (3, 5);

-- Query: Have user 4 be friends with user 3
INSERT INTO friendships (user_id, friend_id) VALUES (4, 3);

-- Query: Have user 5 be friends with users 1 and 6
INSERT INTO friendships (user_id, friend_id) VALUES (5, 1);
INSERT INTO friendships (user_id, friend_id) VALUES (5, 6);

-- Query: Have user 6 be friends with users 2 and 3
INSERT INTO friendships (user_id, friend_id) VALUES (6, 2);
INSERT INTO friendships (user_id, friend_id) VALUES (6, 3);

-- Query: Display the relationships created as shown in the above image
SELECT * FROM users 
JOIN friendships ON users.id = friendships.user_id 
LEFT JOIN users as user2 ON friendships.friend_id = user2.id;

-- NINJA Query: Return all users who are friends with the first user, and make sure their names are displayed in the results.
SELECT users.first_name, users.last_name
FROM users
JOIN friendships ON users.id = friendships.friend_id
WHERE friendships.user_id = 1;

-- NINJA Query: Return the count of all friendships
SELECT COUNT(*) 
FROM friendships;

-- NINJA Query: Find out who has the most friends and return the count of their friends.
SELECT users.id, users.first_name, users.last_name, COUNT(friendships.friend_id) AS friends_count
FROM users
JOIN friendships ON users.id = friendships.user_id
GROUP BY users.id
ORDER BY friends_count DESC
LIMIT 1;

-- NINJA Query: Return the friends of the third user in alphabetical order
SELECT users.first_name, users.last_name
FROM users
JOIN friendships ON users.id = friendships.friend_id
WHERE friendships.user_id = 3
ORDER BY users.first_name;
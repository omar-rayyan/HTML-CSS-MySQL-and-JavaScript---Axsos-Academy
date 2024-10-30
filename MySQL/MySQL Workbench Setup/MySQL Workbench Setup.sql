-- connecting to the data base
USE workbench_setup;

-- creating the table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address1 VARCHAR(255),
    address2 VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- adding a record
INSERT INTO students (name, address1, address2) VALUES ("Ameed", "Ramallah", "WB");

-- selecting all of our students at once
SELECT * FROM students;

-- updating a student's information
UPDATE students SET address1 = "456 Elm St" WHERE id = 1;

-- deleting a student from the database
DELETE FROM students WHERE id = 1;

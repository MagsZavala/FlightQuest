-- Drop the table if it exists (optional, use only if needed)
DROP TABLE IF EXISTS trip;
DROP TABLE IF EXISTS flights;
DROP TABLE IF EXISTS users;


-- Create the users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Drop the table if it exists (optional, use only if needed)

-- Create the flights table
CREATE TABLE flights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    flightNumber VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    userId INT,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

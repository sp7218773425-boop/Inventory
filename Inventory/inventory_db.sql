
CREATE DATABASE inventory_db;
USE inventory_db;

-- 🟩 Products table
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0.00
);

-- 🟦 Stock table
CREATE TABLE stock (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  product_name VARCHAR(100),
  total_quantity INT NOT NULL DEFAULT 0,
  total_stock_value DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 🟨 Purchases (+)
CREATE TABLE purchases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE DEFAULT (CURRENT_DATE),
  client_name VARCHAR(100),
  product_id INT,
  quantity INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 🟥 Sales (–)
CREATE TABLE sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE DEFAULT (CURRENT_DATE),
  client_name VARCHAR(100),
  product_id INT,
  quantity INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

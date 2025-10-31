create database assignment;
use assignment;


CREATE TABLE Categories(
category_id VARCHAR (100) PRIMARY KEY,    
category_name VARCHAR(30) NOT NULL
);

CREATE TABLE Suppliers(
supplier_id VARCHAR(100) PRIMARY KEY,    
supplier_name VARCHAR(150) NOT NULL,    
contact_email VARCHAR(30)
);

CREATE TABLE Products (
product_id VARCHAR (100) PRIMARY KEY,    
product_name VARCHAR(50) NOT NULL,    
category_id VARCHAR(100),    
supplier_id VARCHAR(100),    
unit_price DECIMAL(10,2),    
FOREIGN KEY (category_id) REFERENCES Categories(category_id),    
FOREIGN KEY (supplier_id) REFERENCES Suppliers(supplier_id)
);

CREATE TABLE Customers(
customer_id VARCHAR (100) PRIMARY KEY,    
first_name VARCHAR(50),    
last_name VARCHAR(50),    
email VARCHAR(50)
);

CREATE TABLE Orders(
order_id VARCHAR (100) PRIMARY KEY,    
customer_id VARCHAR(100),    
order_date DATE,    
total_amount DECIMAL,    
FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE OrderItems(    
order_item_id VARCHAR (100) PRIMARY KEY,    
order_id VARCHAR (100),    
product_id VARCHAR (100),    
quantity INT,    
unit_price DECIMAL,   
FOREIGN KEY (order_id) REFERENCES Orders(order_id),    
FOREIGN KEY (product_id) REFERENCES Products(product_id)
 );

CREATE TABLE Inventory (    
product_id VARCHAR (100) PRIMARY KEY,    
quantity_in_stock INT,   
FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
 

 
select * from categories;
select * from suppliers;
select * from products;




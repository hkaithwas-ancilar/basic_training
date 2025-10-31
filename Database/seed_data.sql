-- queries

INSERT INTO Categories (category_id, category_name) VALUES
('C001', 'Electronics'),
('C002', 'Clothing'),
('C003', 'Home Appliances'),
('C004', 'Books'),
('C005', 'Sports'),
('C006', 'Toys'),
('C007', 'Groceries'),
('C008', 'Beauty'),
('C009', 'Furniture'),
('C010', 'Health');


INSERT INTO Suppliers (supplier_id, supplier_name, contact_email) VALUES
('S001', 'TechSource Ltd.', 'contact@techsource.com'),
('S002', 'FashionHub Inc.', 'sales@fashionhub.com'),
('S003', 'HomeEssentials Co.', 'info@homeessentials.com'),
('S004', 'BookWorld Publishers', 'support@bookworld.com'),
('S005', 'FitLife Sports', 'orders@fitlife.com'),
('S006', 'ToyKingdom', 'hello@toykingdom.com'),
('S007', 'FreshMart Grocers', 'service@freshmart.com'),
('S008', 'GlowBeauty Supplies', 'contact@glowbeauty.com'),
('S009', 'FurniCraft Designs', 'sales@furnicraft.com'),
('S010', 'MediPlus Health', 'info@mediplus.com');


INSERT INTO Products (product_id, product_name, category_id, supplier_id, unit_price) VALUES
('P001', 'Smartphone X100', 'C001', 'S001', 699.99),
('P002', 'Men\'s Jacket', 'C002', 'S002', 89.50),
('P003', 'Microwave Oven 20L', 'C003', 'S003', 120.00),
('P004', 'Science Fiction Novel', 'C004', 'S004', 15.99),
('P005', 'Yoga Mat Pro', 'C005', 'S005', 35.00),
('P006', 'Remote Control Car', 'C006', 'S006', 45.75),
('P007', 'Organic Rice - 5kg', 'C007', 'S007', 12.25),
('P008', 'Facial Cleanser 150ml', 'C008', 'S008', 9.99),
('P009', 'Wooden Coffee Table', 'C009', 'S009', 149.00),
('P010', 'Digital Thermometer', 'C010', 'S010', 19.99);

INSERT INTO Customers (customer_id, first_name, last_name, email) VALUES
('CU001', 'Alice', 'Johnson', 'alice.johnson@example.com'),
('CU002', 'Bob', 'Smith', 'bob.smith@example.com'),
('CU003', 'Charlie', 'Brown', 'charlie.brown@example.com'),
('CU004', 'Diana', 'Lopez', 'diana.lopez@example.com'),
('CU005', 'Ethan', 'Miller', 'ethan.miller@example.com'),
('CU006', 'Fiona', 'Davis', 'fiona.davis@example.com'),
('CU007', 'George', 'Wilson', 'george.wilson@example.com'),
('CU008', 'Hannah', 'Moore', 'hannah.moore@example.com'),
('CU009', 'Ian', 'Clark', 'ian.clark@example.com'),
('CU010', 'Jasmine', 'Hall', 'jasmine.hall@example.com');

INSERT INTO Orders (order_id, customer_id, order_date, total_amount) VALUES
('O001', 'CU001', '2025-10-01', 764.99),
('O002', 'CU002', '2025-10-02', 89.50),
('O003', 'CU003', '2025-10-03', 255.00),
('O004', 'CU004', '2025-10-04', 15.99),
('O005', 'CU005', '2025-10-05', 70.00),
('O006', 'CU006', '2025-10-06', 45.75),
('O007', 'CU007', '2025-10-07', 24.50),
('O008', 'CU008', '2025-10-08', 9.99),
('O009', 'CU009', '2025-10-09', 298.00),
('O010', 'CU010', '2025-10-10', 39.98);

INSERT INTO OrderItems (order_item_id, order_id, product_id, quantity, unit_price) VALUES
('OI001', 'O001', 'P001', 1, 699.99),
('OI002', 'O001', 'P008', 1, 9.99),
('OI003', 'O001', 'P007', 3, 12.25),
('OI004', 'O002', 'P002', 1, 89.50),
('OI005', 'O003', 'P003', 2, 120.00),
('OI006', 'O003', 'P008', 1, 9.99),
('OI007', 'O004', 'P004', 1, 15.99),
('OI008', 'O005', 'P005', 2, 35.00),
('OI009', 'O006', 'P006', 1, 45.75),
('OI010', 'O007', 'P007', 2, 12.25),
('OI011', 'O007', 'P008', 1, 9.99),
('OI012', 'O008', 'P008', 1, 9.99),
('OI013', 'O009', 'P009', 2, 149.00),
('OI014', 'O010', 'P010', 2, 19.99);


INSERT INTO Inventory (product_id, quantity_in_stock) VALUES
('P001', 25),
('P002', 40),
('P003', 15),
('P004', 60),
('P005', 30),
('P006', 50),
('P007', 100),
('P008', 80),
('P009', 10),
('P010', 35);

select * from products;


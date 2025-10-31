-- 1.
SELECT Products.product_id, Products.product_name, Categories.category_name, Suppliers.supplier_name
FROM Products
JOIN Categories ON Products.category_id = Categories.category_id
JOIN Suppliers ON Products.supplier_id = Suppliers.supplier_id;




-- 2.
SELECT DISTINCT Customers.customer_id, Customers.first_name, Customers.last_name, Customers.email
FROM Customers
JOIN Orders ON Customers.customer_id = Orders.customer_id;




-- 3.
SELECT Orders.order_id, Orders.customer_id,
COUNT(OrderItems.order_item_id), 
COUNT(DISTINCT OrderItems.product_id)
FROM Orders
JOIN OrderItems ON Orders.order_id = OrderItems.order_id
GROUP BY Orders.order_id, Orders.customer_id;




-- 4.
SELECT order_id, customer_id, order_date, total_amount
FROM Orders
WHERE order_date BETWEEN '2025-01-01' AND '2025-12-31';




-- 5.
SELECT Products.product_id, Products.product_name,
SUM(OrderItems.quantity) AS total_sold
FROM Products
JOIN OrderItems ON Products.product_id = OrderItems.product_id
GROUP BY Products.product_id, Products.product_name
ORDER BY total_sold DESC
LIMIT 10;




-- 6.
SELECT 
YEAR(order_date) AS year,
MONTH(order_date) AS month,
SUM(total_amount) AS monthly_revenue,
COUNT(order_id) AS total_orders
FROM Orders
WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
GROUP BY YEAR(order_date), MONTH(order_date)
ORDER BY year, month;




-- 7.
SELECT Customers.customer_id, Customers.first_name, Customers.last_name,
SUM(Orders.total_amount) AS total_spent
FROM Customers
JOIN Orders ON Customers.customer_id = Orders.customer_id
GROUP BY Customers.customer_id, Customers.first_name, Customers.last_name
ORDER BY total_spent DESC;





-- 8.
SELECT 
    Products.product_id,
    Products.product_name,
    Inventory.quantity_in_stock,
    Suppliers.supplier_name,
    Suppliers.contact_email
FROM Products
JOIN Inventory ON Products.product_id = Inventory.product_id
JOIN Suppliers ON Products.supplier_id = Suppliers.supplier_id
WHERE Inventory.quantity_in_stock < 10;






-- 9.
WITH monthly_revenue AS (
  SELECT 
    YEAR(order_date) AS year,
    MONTH(order_date) AS month,
    SUM(total_amount) AS revenue
  FROM Orders
  GROUP BY YEAR(order_date), MONTH(order_date)
)
SELECT 
    year,
    month,
    AVG(revenue) OVER (
        ORDER BY year, month 
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS moving_avg_3_months
FROM monthly_revenue;





-- 10.
START TRANSACTION;

				-- 1. Insert order header
				INSERT INTO Orders (order_id, customer_id, order_date, total_amount)
				VALUES ('O1001', 'C001', CURDATE(), 0);

				-- 2. Check stock for product 'P001'
				SELECT quantity_in_stock 
				FROM Inventory 
				WHERE product_id = 'P001';

				-- 3. Insert order item (only if stock is enough)
				-- Assume you manually checked stock ≥ 2
				INSERT INTO OrderItems (order_item_id, order_id, product_id, quantity, unit_price)
				VALUES ('OI1001', 'O1001', 'P001', 2, 500.00);

				-- 4. Update order total
				UPDATE Orders
				SET total_amount = (
					SELECT SUM(quantity * unit_price)
					FROM OrderItems
					WHERE order_id = 'O1001'
				)
				WHERE order_id = 'O1001';

				-- 5. Update inventory
				UPDATE Inventory
				SET quantity_in_stock = quantity_in_stock - 2
				WHERE product_id = 'P001';

COMMIT;




-- 11.
CREATE VIEW monthly_revenue_summary AS
SELECT 
    YEAR(order_date) AS year,
    MONTH(order_date) AS month,
    SUM(total_amount) AS revenue,
    COUNT(order_id) AS orders_count
FROM Orders
GROUP BY YEAR(order_date), MONTH(order_date);




-- 12.
CREATE TRIGGER update_total_amount_after_insert
AFTER INSERT ON OrderItems
FOR EACH ROW
UPDATE Orders
SET total_amount = (
    SELECT SUM(quantity * unit_price)
    FROM OrderItems
    WHERE order_id = NEW.order_id
)
WHERE order_id = NEW.order_id;




-- 13.
-- Index on OrderItems for fast product aggregation
CREATE INDEX idx_orderitems_product ON OrderItems(product_id);
-- Index on Orders for fast date range queries
CREATE INDEX idx_orders_date ON Orders(order_date);




-- 14.
CREATE PROCEDURE get_customer_orders(IN p_customer_id VARCHAR(100))
SELECT *
FROM Orders
WHERE customer_id = p_customer_id
ORDER BY order_date DESC;



 

























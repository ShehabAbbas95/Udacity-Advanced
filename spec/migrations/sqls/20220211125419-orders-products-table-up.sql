CREATE table orders_products(
    order_id int REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
    product_id int REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE,
    quantity  int,
    completed boolean default 'false'

);
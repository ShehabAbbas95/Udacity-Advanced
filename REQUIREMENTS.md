# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index ('/products') [GET] 
- Show ('/products/product_info/:productName') [GET] 
- Create (/products/addproduct) [token required] [POST] (args: productname, price, category)
- Delete (/products/deleteproduct) [token required] [POST] (args: productname)

#### Users
- Create New User [POST] 
- SignIn ('/users') [token required] [POST]
- SHOW ('/users/user_info')  [token required] [GET] 
- SHOW ('/users/all_users_info')  [token required] [GET] (admins only)
- Create New User By Admin[token required] [POST] (admins only)

#### Orders
- Current Order by user (args: user id) (orders/current_orders)[token required] [GET] 
- Completed Orders by user (args: user id) (orders/current_orders)[token required] [GET]
- ADD Order (orders/current_orders) (args: user_id,products_details,status) [token required] [POST]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id SERIAL PRIMARY KEY,
- username char(100),
- hash char(150),
- token varchar(520),
- firstname CHAR(100),
- lastname CHAR(100),
- role char(10)

#### Orders
- id SERIAL PRIMARY KEY,
- user_id int [foreign] (REFERENCES users(id)),
- date
#### Orders_Products
- order_id int [foreign] (REFERENCES key orders(id))
- product_id int [foreign] (REFERENCES key product_id(id))
- quantity int
- completed bool  default false [default]


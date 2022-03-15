# Storefront Backend Project

## Overview
This project aims  to create a web app that uses Web API and user query-data to Make an Order from Our Store.

## Instructions
### 1. The steps to install the app and packages
- install Nodejs@v12.13.0 from https://nodejs.org/download/release/v12.14/
- check npm version, I'd used npm@6.12.0
- In your commandline type 'npm install' and it will automatically install all the node packages used in our app

### 2. Build Up the Database
- Create Two Databases  project_two and project_two_test for production and testing respctively.
- Connect to the database (all required credentials are in the .example-env file)
- Database Port [5432] 'localhost'
- Database User project_two_user
- psql project_two_test project_two_user  
- MAke Migrations Files for  Databases tables .
**Example**: db-migrate create orders-table --sql-file
 (In Our App we have four tables users, products, orders, orders_products)
- Add the colums name and type in the migrations files for each table then migrate-up using db-migrate up
- Now We Have Our Databases ready to use

## Use Our App With Postman
- Run Our App using 'npm start'
- Express App Port [ http://localhost:3000/]
- You will see in your command a message 'Image-Processing app Running at http://localhost:3000'
- Visit http://localhost:3000/ through Postman
- You Can Create User and test each API with Postman  

## Test Our App Using Jasmine

- You can use `npm test` for running some basic tests on the code.

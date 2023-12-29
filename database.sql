CREATE DATABASE SYSTEM;

CREATE TABLE customers(
    customer_id SERIAL PRIMARY KEY,
    customer varchar(50),
    bank_name VARCHAR(50),
    bank_acc INT,
    username VARCHAR(50),
    password VARCHAR(50)
);
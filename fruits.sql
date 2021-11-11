CREATE DATABASE fruits;
--\c into fruits

create table fruit_basket(
id serial primary key,
fruit_type text not null,
quantity int not null,
unit_price float not null
);
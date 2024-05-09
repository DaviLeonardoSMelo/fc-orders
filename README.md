# API FOR MANAGE YOUR ORDERS
API for make orders where you can list yours orders and public your orders in the api database and a rabbitmq this api is integrated with the go lang api fc-goapi and the products of orders will be created in fc-goapi and consumed here.

## Endpoints

### POST /auth/login
For take your token.

### Params
send username and your password
```
{
    "username": "john due",
    "password": "john due"
}
```
#### Response
##### OK! 200
Exemple of response:
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiam9obiBkdWUiLCJpYXQiOjE3MTUyODM4NTMsImV4cCI6MTcxNTI5NDY1M30.Bywj8MEjp1026RK2ehaCn-WksYDOEhRedlQKFspPCrM"
}
```
##### Bad Request! 401
```
{
    "message": "Unauthorized",
    "statusCode": 401
}
```
If you send something wrong.
### GET /products
A endpoint for return all products registered
#### Params
```
Authorization: Bearer ${JWTtoken}
```

#### Response
##### OK! 200
Exemple of response:
```
[
    {
    "id": "581f4aef-0a37-4a44-bbc2-3ca8aad1ebcf",
    "name": "Product 1",
    "description": "Product 1 description",
    "image_url": "https://www.foto.foto/fototeste",
    "price": "100.00"
  },
  {
    "id": "8e3c7dce-2c11-4f77-8c83-08ac57f786de",
    "name": "Product 2",
    "description": "Product 12description",
    "image_url": "https://www.foto.foto/fototeste2",
    "price": "200.00"
  }
]
```
if you receive a OK yours categories will be listed

##### Bad Request! 401
```
{
    "message": "Unauthorized",
    "statusCode": 401
}
```
If you don't send the token in request.

### POST /products
In api you have the way of create a product but this route is created just for fill products table for create the orders, by the way, you can create products send the token on headers and the below object.

### Params
Send in URL the id of desired category
```
{
    "name": "Product 1",
    "description": "Product 1 description",
    "image_url": "https://www.foto.foto/fototeste",
    "price": 100 
}
```
#### Response
##### OK! 200
Exemple of response:
```
[
  {
    "name": "Product 1",
    "description": "Product 1 description",
    "image_url": "https://www.foto.foto/fototeste",
    "price": 100,
    "id": "71776016-cb6d-456d-81ee-0ed2863902ea"
  }
]
```
##### Bad Request! 401
```
{
    "message": "Unauthorized",
    "statusCode": 401
}
```
If you don't send the token in request.

### GET /orders
Endpoint list yours orders, this endpoint is protected by the jwt token and where you send the token will list only the orders in your user id.
#### Params
```
Authorization: Bearer ${JWTtoken}
```
#### Response
##### OK! 200
``` 
[
  {
    "status": "pending",
    "id": "172ecbd8-127b-4ee9-8530-e0eb73c53fb0",
    "total": "300.00",
    "client_id": 1,
    "created_at": "2024-05-09T22:34:28.248Z"
  }
]
```
##### Bad Request! 401
```
{
    "message": "Unauthorized",
    "statusCode": 401
}
```
If you don't send the token in request.

### POST /orders
Here lives the core of your aplication, the api will create your orders and register this in a rabbitmq queue at same time that create your order in database created only for your api.

#### Params

for this route works you will need to send the product uuid the quantity of this product and the card_hash for api of payment process your order payment.
```
{
    "items": [
        {
            "product_id": "8e3c7dce-2c11-4f77-8c83-08ac57f786de",
            "quantity": 1 
        },
        {
            "product_id": "d498cde2-a782-4986-af8c-2e986c17abba",
            "quantity": 1 
        }
    ],
    "card_hash": "123"
}
```

#### Response
for the response you will have your order status the id of your order the total coust created_at and your id
##### OK! 200
Exemple of response:
```
[
  {
    "status": "pending",
    "id": "172ecbd8-127b-4ee9-8530-e0eb73c53fb0",
    "total": "300.00",
    "client_id": 1,
    "created_at": "2024-05-09T22:34:28.248Z"
  }
]
```
##### Internal Server Error! 500
If you try to register order posting product_id that don't exists.


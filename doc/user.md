---
Created: 2024-03-06
By: Adi Nugraha Putra
---

# User API Spec

## Register User

Endpoint: `POST` /api/users

Request Body:

```json
{
    "username": "nuhptr",
    "password": "rahasia",
    "name": "Adi Nugraha Putra"
}
```

Response Body (Success):

```json
{
    "data": {
        "username": "nuhptr",
        "name": "Adi Nugraha Putra"
    }
}
```

Response Body (Failed):

```json
{
    "error": "Username must not blank..."
}
```

## Login User

Endpoint: `POST` /api/users/login

Request Body:

```json
{
    "name": "Adi Nugraha Putra",
    "password": "rahasia"
}
```

Response Body (Success):

```json
{
    "data": {
        "username": "nuhptr",
        "name": "Adi Nugraha Putra",
        "token": "uuid"
    }
}
```

Response Body (Failed):

```json
{
    "error": "Username or password is wrong..."
}
```

## Get User

Endpoint: `GET` /api/users/current

Request Header:

-   X-API-TOKEN: token(uuid)

Response Body (Success):

```json
{
    "data": {
        "username": "nuhptr",
        "name": "Adi Nugraha Putra"
    }
}
```

Response Body (Failed):

```json
{
    "errors": "Unauthorized, ..."
}
```

## Update User

Endpoint: `PATCH` /api/users/current -> patch is partial update (tidak wajib)

Request Header:

-   X-API-TOKEN: token(uuid)

Request Body:

```json
{
    "password": "rahasia", // tidak wajib
    "name": "Adi Nugraha Putra" // tidak wajib
}
```

Response Body (Success):

```json
{
    "data": {
        "username": "nuhptr",
        "name": "Adi Nugraha Putra"
    }
}
```

Response Body (Failed):

```json
{
    "error": "Unauthorized..."
}
```

## Logout User

Endpoint: `DELETE` /api/users/current

Request Header:

-   X-API-TOKEN: token(uuid)

Response Body (Success):

```json
{
    "data": "OK"
}
```

Response Body (Failed):

```json
{
    "error": "Unauthorized..."
}
```

---
Created: 2024-03-06
By: Adi Nugraha Putra
---

# Address API Spec

## Create Address

Endpoint: `POST` /api/contacts/:idContact/addresses

Request Header:

-   X-API-TOKEN: token(uuid)

Request Body:

```json
{
    "street": "Jl. Kebon Jeruk",
    "city": "Jakarta Barat",
    "province": "DKI Jakarta",
    "country": "Indonesia",
    "postal_code": "11530"
}
```

Response Body (success):

```json
{
    "data": {
        "id": 1,
        "street": "Jl. Kebon Jeruk",
        "city": "Jakarta Barat",
        "province": "DKI Jakarta",
        "country": "Indonesia",
        "postal_code": "11530"
    }
}
```

Response Body (failed):

```json
{
    "error": "Street must not blank, City must not blank, Province must not blank, Country must not blank, Postal code must not blank..."
}
```

## Get Address

Endpoint: `GET` /api/contacts/:idContact/addresses/:idAddress

Request Header:

-   X-API-TOKEN: token(uuid)

Response Body (success):

```json
{
    "data": {
        "id": 1,
        "street": "Jl. Kebon Jeruk",
        "city": "Jakarta Barat",
        "province": "DKI Jakarta",
        "country": "Indonesia",
        "postal_code": "11530"
    }
}
```

Response Body (failed):

```json
{
    "error": "Address not found..."
}
```

## Update Address

Endpoint: `PUT` /api/contacts/:idContact/addresses/:idAddress

Request Header:

-   X-API-TOKEN: token(uuid)

Request Body:

```json
{
    "street": "Jl. Kebon Jeruk",
    "city": "Jakarta Barat",
    "province": "DKI Jakarta",
    "country": "Indonesia",
    "postal_code": "11530"
}
```

Response Body (success):

```json
{
    "data": {
        "id": 1,
        "street": "Jl. Kebon Jeruk",
        "city": "Jakarta Barat",
        "province": "DKI Jakarta",
        "country": "Indonesia",
        "postal_code": "11530"
    }
}
```

Response Body (failed):

```json
{
    "error": "postal code is required..."
}
```

## Remove Address

Endpoint: `DELETE` /api/contacts/:idContact/addresses/:idAddress

Request Header:

-   X-API-TOKEN: token(uuid)

Response Body (success):

```json
{
    "data": "OK"
}
```

Response Body (failed):

```json
{
    "error": "Address not found..."
}
```

## List Address

Endpoint: `GET` /api/contacts/:idContact/addresses

Response Body (success):

```json
{
   "data": [
      {
         "id": 1,
         "street": "Jl. Kebon Jeruk",
         "city": "Jakarta Barat",
         "province": "DKI Jakarta",
         "country": "Indonesia",
         "postal_code": "11530"
      }
      {
         "id": 2,
         "street": "Jl. Kebon Jeruk",
         "city": "Jakarta Barat",
         "province": "DKI Jakarta",
         "country": "Indonesia",
         "postal_code": "11530"
      }
   ]
}
```

Response Body (failed):

```json
{
    "error": "Contact is not found..."
}
```

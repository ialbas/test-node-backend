[![Node.js CI](https://github.com/ialbas/test-node-backend/actions/workflows/node.js.yml/badge.svg)](https://github.com/ialbas/test-node-backend/actions/workflows/node.js.yml)
[![Test](https://img.shields.io/badge/test-passing-green)](https://img.shields.io/github/languages/top/ialbas/test-node-backend?style=flat-square)
[![javascript style guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)
[![dependencies](https://img.shields.io/badge/dependencies-up-green)](https://standardjs.com/)
[![licence](https://badgen.net/badge/license/MIT/blue)](https://opensource.org/licenses/MIT)

# Backend API Rest NodeJs with TDD and Clean Code

## A simple project example with node and test

### Getting Started (Requeriments and Instructions)

1. Install packages with `npm install`
2. To see Tests `npm run tests`
3. Initialize this server `npm run start`
4. For data persistence set your string connection in file `.env` do like the example in file `.env-example`

### Documentation

Route POST Login

```bash
   uri: /api/auth/login
   description: get accessToken JWT
   authentication: false
   parameters (body):
   {
	    "email": required,
	    "password": required
   }
```

### HTTP Request:

```json
{
  "content-type": "application/json"
}
```

### HTTP Responses:

#### HTTP 401 Unauthorized - if credentials it's wrong:

```json
{
  "statusCode": 401,
  "description": "unauthorized",
  "error": {
    "name": "user unauthorized."
  }
}
```

#### HTTP 401 Unauthorized - if no email provided:

```json
{
  "statusCode": 400,
  "description": "bad request",
  "error": {
    "name": "Missing param: email"
  }
}
```

#### HTTP 401 Unauthorized - if no password provided:

```json
{
  "statusCode": 400,
  "description": "bad request",
  "error": {
    "name": "Missing param: passowrd"
  }
}
```

#### HTTP 200 ok - if correcly credentials has provided:

```json
{
  "statusCode": 200,
  "description": "ok",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIzNjAzOTIsfy0zNzg1LTQzMzgtYjVkZC00NDdkY2E2NDZiMjEiLCJpYXQiOjE2NDc0ODM4NTMsImV4cCI6MTY0NzQ4NzQ1M30.BIouBOEUtnsHr9dOINOB8mNzHHMDdRj3bMVNQm65PTo"
  }
}
```

Route GET GetPostByID

```bash
   uri: /api/posts/:id
   description: Get post by id
   authentication: required
   Parameters: uuid version 4
```

### HTTP Request (example):

```json
{
  "content-type": "application/json",
  "authorization": "Bearer eyJhbGcsadfasfsdfaLTQzMzgtYjVkZC00NDdkY2E2NDZiMjEiLCJpYXQiOjE2NDc0NjM5ODgsImV4cCI6MTY0Naqwerqwerqqewr"
}
```

### HTTP Responses

#### HTTP 401 Unauthorized - if no token has provided:

```json
{
  "statusCode": 401,
  "description": "unauthorized",
  "error": {
    "name": "User unauthorized, jwt token is required."
  }
}
```

#### HTTP 401 Unauthorized - if authenticate failure:

```json
{
  "statusCode": 401,
  "description": "unauthorized",
  "error": {
    "name": "Failed to authenticate token."
  }
}
```

#### HTTP 401 Unauthorized - if word `Bearer ` or `accessToken` JWT no has provided in header authentication:

```json
{
  "statusCode": 401,
  "description": "unauthorized",
  "error": {
    "name": "No Bearer or token is provided."
  }
}
```

#### HTTP 404 Not Found - if no found result:

```json
{
  "statusCode": 404,
  "description": "not found",
  "error": "id"
}
```

#### HTTP 200 ok - if correcly params has provided:

```json
{
  "statusCode": 200,
  "description": "ok",
  "data": {
    "statusCode": 200,
    "description": "ok",
    "data": {
      "_id": "da498c89-0df4-4a63-8811-00d824828621",
      "title": "schema list new",
      "body": "news in body",
      "tags": ["valid_tag_one", "valid_tag_two", "valid_tag_three"]
    }
  }
}
```

[![Node.js CI](https://github.com/ialbas/test-node-backend/actions/workflows/node.js.yml/badge.svg)](https://github.com/ialbas/test-node-backend/actions/workflows/node.js.yml)
[![Test](https://img.shields.io/badge/test-passing-green)](https://img.shields.io/github/languages/top/ialbas/test-node-backend?style=flat-square)
[![javascript style guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)
[![dependencies](https://img.shields.io/badge/dependencies-up-green)](https://standardjs.com/)
[![licence](https://badgen.net/badge/license/MIT/blue)](https://opensource.org/licenses/MIT)

## Backend API Rest NodeJs with TDD and Clean Code

![Backend API Rest NodeJs, Jest, JWT](capa_test_node_api.png)

## A simple project example with node, jest, jwt, mongoose and aouther resources.

## Sumary

- [Sumary](#Sumary)
- [Description](#a-simple-project-example-with-node-and-test)
- [Getting Started](#getting-started)
- [Features](#features)
- [Documentation](#documentation)
- [Libraries and Packages](#libraries-and-packages)
- [Licence](#licence)

## ▶️ Getting Started

Requeriments and Instructions

1. Install packages with `npm install`
2. To see Tests and Coverage `npm run tests`
3. Initialize this server `npm run start`
4. For data persistence set your string connection in file `.env` do like the example in file `.env-example`
5. Initialize docker-compose: `docker-compose up -d ` for container MongoDB
6. For `Postman` there are ![collections](https://github.com/ialbas/test-node-backend/blob/main/test_node-backend.postman_collection) with all routs and ![envioriments](https://github.com/ialbas/test-node-backend/blob/main/TEST_NODE_BACKEND.postman_environment.json) to apply in your postman console.

## 🔨 Features

This API should allow to realize a basic CRUD with `mongodb` and to authenticate with JWT.

- All API responses must be in JSON format.
- Pagination on the API for the listing of the posts
- Unit testing for all Routes and Helpers using `Jest`.
- Full documentation for all routes, with `Postman Documentation` to public documentation and Integration Tests.
- Use `Lint Staged`
- Use `Husky` hooks to pre-commits and push to repository
- Authenticated the routes using JWT
- Process and validate body using `Mongose Validation`
- Some principes `SOLID`
- Using GitHub Actions to CI deployment
- Great tests coverage
- Using `MongoDB` for storage data - in container `Docker / Docker-Compose`

## 📃 Documentation

See the documentation at https://documenter.getpostman.com/view/11001155/UVsPN4e4 for more details.

## ✅ Libraries and Packages

- Jest
- Express
- Git
- NPM
- Husky
- Lint Staged
- Eslint
- Standard Javascript Style
- Nodemon
- Mongo Memory Server
- Mongose
- JWT
- Postman
- Github Actions
- Docker

# ⚖️ License

MIT License

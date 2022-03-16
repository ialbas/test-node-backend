const express = require('express')
const routes = require('./index')
const HandlerHttp = require('./handllerHttp')
const mocksHTTP = require('node-mocks-http')

const {
  HandlerGetByID,
  HandlerGetAll,
  HandlerRemove,
  HandlerCreate,
  HandlerUpdate,
  HandlerLogin,
  authTokenVerify
} = new HandlerHttp()

describe('HandlerHttp - Ensure that the routes initialize correcly', () => {
  test('Should throw if in HandlerGetByID no req or res is provided', async () => {
    const promise = await HandlerGetByID()
    expect(promise.statusCode).toBe(500)
  })
  test('Should throw if in HandlerGetAll no req or res is provided', async () => {
    const promise = await HandlerGetAll()
    expect(promise.statusCode).toBe(500)
  })
  test('Should throw if in HandlerRemove no req or res is provided', async () => {
    const promise = await HandlerRemove()
    expect(promise.statusCode).toBe(500)
  })
  test('Should throw if in HandlerCreate no req or res is provided', async () => {
    const promise = await HandlerCreate()
    expect(promise.statusCode).toBe(500)
  })
  test('Should throw if in HandlerUpdate no req or res is provided', async () => {
    const promise = await HandlerUpdate()
    expect(promise.statusCode).toBe(500)
  })
  test('Should throw if in HandlerLogin no req or res is provided', async () => {
    const promise = await HandlerLogin()
    expect(promise.statusCode).toBe(500)
  })
  test('Should throw if in authTokenVerify no req or res is provided', async () => {
    const promise = await authTokenVerify()
    expect(promise.statusCode).toBe(500)
  })

  test('Should routes', async () => {
    const route = routes

    for (const i of route.stack) {
      console.log(JSON.parse(JSON.stringify(route.stack)))
    }
    // expect(promise.statusCode).toBe(500)
  })
})

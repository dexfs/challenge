require('dotenv-flow').config()
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const config = require('@config')()
const recipePuppyJson = require('../fixtures/recipepuppy.json')
const giphyJson = require('../fixtures/giphy.json')
const supertest = require('supertest')
const { app } = require('@bootstrap')

const startTestServer = async () => {
  return supertest(app)
}

const makeMockAxios = () => {
  const mockAxios = new MockAdapter(axios)
  return mockAxios
}

const makeParams = () => ({
  params: {
    i: 'onions,tomato'
  }
})

describe('ListRecipesAction', () => {
  let request
  beforeAll(async () => {
    request = await startTestServer()
  })
  it('should list recipes when ingredients passed', async (done) => {
    const mockAxios = makeMockAxios()
    const recipeRequest = `${config.apiRecipePuppyEndpoint}`
    mockAxios.onGet(recipeRequest, makeParams()).replyOnce(200, recipePuppyJson)
    mockAxios.onAny().reply(200, giphyJson)

    const response = await request.get('/recipes/?i=onions,tomato')
    expect(response.body).toHaveProperty('keywords')
    expect(response.body).toHaveProperty('recipes')
    expect(response.body.keywords).toEqual(['onions', 'tomato'])
    expect(response.body).toMatchSnapshot()
    done()
  })
  it('should return 400 if query param not passed', async (done) => {
    const response = await request.get('/recipes/')
    expect(response.status).toBe(400)
    done()
  })
  it('should return 403 if Giphy API KEY no passed', async (done) => {
    const mockAxios = makeMockAxios()
    const recipeRequest = `${config.apiRecipePuppyEndpoint}`
    mockAxios.onGet(recipeRequest, makeParams()).replyOnce(200, {
      title: 'Recipe Puppy',
      version: 0.1,
      href: 'http://www.recipepuppy.com/',
      results: [
        {
          title: 'any_title',
          href: 'any_href',
          ingredients: 'any_ingredienes',
          thumbnail: 'any_thumbnail'
        }
      ]
    })

    mockAxios.onGet(config.apiGiphyEndpoint, {
      params: {
        api_key: config.apiGiphyKey,
        q: 'any_title'
      }
    }).replyOnce(403, 'Forbiden')
    const response = await request.get('/recipes/?i=onions,tomato')
    expect(response.status).toBe(403)
    expect(response.body).toHaveProperty('status')
    expect(response.body).toHaveProperty('message')
    done()
  })

  it('should return 503 if Recipe Service is unavailable', async (done) => {
    const mockAxios = makeMockAxios()
    const recipeRequest = `${config.apiRecipePuppyEndpoint}`
    mockAxios.onGet(recipeRequest, makeParams()).networkError()
    const response = await request.get('/recipes/?i=onions,tomato')
    console.log(response.body)
    expect(response.status).toBe(503)
    expect(response.body).toHaveProperty('status')
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Service Unavailable')
    done()
  })

  it('should return 403 if Giphy API KEY no passed', async (done) => {
    const mockAxios = makeMockAxios()
    const recipeRequest = `${config.apiRecipePuppyEndpoint}`
    mockAxios.onGet(recipeRequest, makeParams()).replyOnce(200, {
      title: 'Recipe Puppy',
      version: 0.1,
      href: 'http://www.recipepuppy.com/',
      results: [
        {
          title: 'any_title',
          href: 'any_href',
          ingredients: 'any_ingredienes',
          thumbnail: 'any_thumbnail'
        }
      ]
    })

    mockAxios.onGet(config.apiGiphyEndpoint, {
      params: {
        api_key: config.apiGiphyKey,
        q: 'any_title'
      }
    }).networkError()
    const response = await request.get('/recipes/?i=onions,tomato')
    expect(response.status).toBe(503)
    expect(response.body).toHaveProperty('status')
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Service Unavailable')
    done()
  })
})

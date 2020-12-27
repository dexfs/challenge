require('dotenv-flow').config()
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const ListRecipesAction = require('@app/actions/ListRecipesAction')
const { GifServiceFactory, RecipeServiceFactory } = require('@app/factories')
const config = require('@config')()
const recipePuppyJson = require('../fixtures/recipepuppy.json')
const giphyJson = require('../fixtures/giphy.json')

const makeSut = () => {
  const recipeService = RecipeServiceFactory.create('recipePuppy')
  const gifService = GifServiceFactory.create('giphy')
  const action = new ListRecipesAction({ recipeService, gifService })
  return { action }
}

const makeParams = () => ({
  params: {
    i: 'onions,tomato'
  }
})

const makeMockAxios = () => {
  const mockAxios = new MockAdapter(axios)
  const recipeRequest = `${config.apiRecipePuppyEndpoint}`
  mockAxios.onGet(recipeRequest, makeParams()).replyOnce(200, recipePuppyJson)
  mockAxios.onAny().reply(200, giphyJson)
  return mockAxios
}

describe('ListRecipesAction', () => {
  it('should return list recipes with its gif', async () => {
    makeMockAxios()

    const { action } = makeSut()
    const result = await action.execute({ i: 'onions,tomato' })
    expect(result).toHaveProperty('keywords')
    expect(result).toHaveProperty('recipes')
    expect(result.keywords).toEqual(['onions', 'tomato'])
  })
})

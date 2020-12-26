require('dotenv-flow').config()
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const HttpAxiosAdapter = require('@app/adapters/httpAxiosAdapter')
const RecipePuppyService = require('@app/services/RecipePuppy')
const config = require('@config')()
const recipePuppyJson = require('../fixtures/recipepuppy.json')
const makeSut = () => {
  const httpAdapter = new HttpAxiosAdapter()
  const service = new RecipePuppyService({ http: httpAdapter, config })

  return {
    httpAdapter,
    service
  }
}

const makeMockAxios = () => {
  const mockAxios = new MockAdapter(axios)
  return mockAxios
}

describe('RecipePuppyService', () => {
  const uri = 'http://www.recipepuppy.com/api/?i=onions,garlic'

  it('should be called with HttpAxiosAdapter', () => {
    const { service } = makeSut()
    expect(service.http).toBeInstanceOf(HttpAxiosAdapter)
  })

  it('should be build with correct args', async () => {
    const { service, httpAdapter } = makeSut()
    const httpSpy = jest.spyOn(httpAdapter, 'get')
    const mockAxios = makeMockAxios()
    mockAxios.onGet(uri).reply(200, recipePuppyJson)
    await service.getRecipesByIngredients({ ingredients: 'onions,garlic' })
    expect(httpSpy).toHaveBeenCalledWith(uri)
  })

  it('should return only results property', async () => {
    const { service, httpAdapter } = makeSut()
    jest.spyOn(httpAdapter, 'get').mockReturnValueOnce(new Promise((resolve, reject) => resolve({ data: recipePuppyJson })))
    const result = await service.getRecipesByIngredients({ ingredients: 'onions,garlic' })
    expect(result).toHaveProperty('recipes')
    expect(result.recipes.length).toBeGreaterThan(0)
  })

  it('should throw if problem request', async () => {
    const { service } = makeSut()
    const mockAxios = makeMockAxios()
    mockAxios.onGet(uri).reply(500, {})

    const promise = service.getRecipesByIngredients({ ingredients: 'onions,garlic' })
    await expect(promise).rejects.toThrow()
  })

  it('should throw if 404 was return', async () => {
    const { service } = makeSut()
    const mockAxios = makeMockAxios()

    mockAxios.onGet(uri).reply(404, {})
    const promise = service.getRecipesByIngredients({ ingredients: 'onions,garlic' })
    await expect(promise).rejects.toThrow()
  })
})

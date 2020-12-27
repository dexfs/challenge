require('dotenv-flow').config()
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const config = require('@config')()
const HttpAxiosAdapter = require('@app/adapters/httpAxiosAdapter')
const GiphyService = require('@app/services/Giphy')
const giphyJson = require('../fixtures/giphy.json')
const makeSut = () => {
  const httpAdapter = new HttpAxiosAdapter()
  const service = new GiphyService({ http: httpAdapter, config })

  return {
    httpAdapter,
    service
  }
}

const makeMockAxios = () => {
  const mockAxios = new MockAdapter(axios)
  return mockAxios
}

describe('Giphy Service', () => {
  it('should be called with HttpAxiosAdapter', () => {
    const { service } = makeSut()
    expect(service.http).toBeInstanceOf(HttpAxiosAdapter)
  })

  it('should be build with correct args', async () => {
    const title = 'any_title'
    const { service, httpAdapter } = makeSut()
    const mockAxios = makeMockAxios()
    const mockParams = {
      params: {
        api_key: config.apiGiphyKey,
        q: title
      }
    }
    mockAxios.onGet(config.apiGiphyEndpoint, mockParams).reply(200, giphyJson)
    const httpSpy = jest.spyOn(httpAdapter, 'get')
    await service.getGifByRecipeTitle(title)
    expect(httpSpy).toHaveBeenCalledWith(config.apiGiphyEndpoint, mockParams)
  })

  it('should return gif property', async () => {
    const { service } = makeSut()
    const mockAxios = makeMockAxios()
    mockAxios.onGet().reply(200, giphyJson)
    const result = await service.getGifByRecipeTitle('title')
    expect(result).toHaveProperty('gif')
    expect(typeof result.gif).toBe('string')
  })

  it('should return null gif property', async () => {
    const { service } = makeSut()
    const mockAxios = makeMockAxios()
    mockAxios.onGet().reply(200, { data: [] })
    const result = await service.getGifByRecipeTitle('title')
    expect(result).toHaveProperty('gif')
    expect(result.gif).toBeNull()
  })

  it('should throw service unavailable', async () => {
    const { service } = makeSut()
    const mockAxios = makeMockAxios()
    mockAxios.onGet().networkError()
    const promise = service.getGifByRecipeTitle('title')
    await expect(promise).rejects.toThrow()
  })
})

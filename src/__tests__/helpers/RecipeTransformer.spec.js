const RecipeTransformer = require('@app/helpers/RecipeTransformer')
const recipePuppyJson = require('../fixtures/recipepuppy.json')

describe('RecipeTransformer', () => {
  it('should transform data returned from service', () => {
    const transformer = new RecipeTransformer(recipePuppyJson.results)
    expect(transformer.get()).toMatchSnapshot()
  })
})

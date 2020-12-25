module.exports = {
  roots: ['<rootDir>/src/__tests__'],
  collectCoverageFrom: [
    '!<rootDir>/src/main/**'
  ],
  testPathIgnorePatterns: ['<rootDir>/src/__tests__/helpers/index.js'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@root': '<rootDir>',
    '@app': '<rootDir>/app',
    '@orm': '<rootDir>/src/app/orm',
    '@bootstrap': '<rootDir>/src/bootstrap',
    '@database': '<rootDir>/src/database',
    '@config': '<rootDir>/src/config',
    '@shared': '<rootDir>/src/shared',
    '@routes': '<rootDir>/src/routes',
    '@utils': '<rootDir>/src/utils'
  }
}

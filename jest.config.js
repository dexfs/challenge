module.exports = {
  roots: ['<rootDir>/src/__tests__'],
  collectCoverageFrom: [
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/__tests__/fixtures/**',
    '!<rootDir>/src/__tests__/helpers/__snapshots__/**'
  ],
  testPathIgnorePatterns: ['<rootDir>/src/__tests__/helpers/index.js', '<rootDir>/src/__tests__/fixtures/', '<rootDir>/src/__tests__/helpers/__snapshots__'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@root': '<rootDir>',
    '@app': '<rootDir>/src/app',
    '@bootstrap': '<rootDir>/src/bootstrap',
    '@config': '<rootDir>/src/config',
    '@shared': '<rootDir>/src/shared',
    '@routes': '<rootDir>/src/routes',
    '@utils': '<rootDir>/src/utils'
  }
}

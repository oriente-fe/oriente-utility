module.exports = {
  globalSetup: '<rootDir>/__tests__/setup.js',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: [
    '<rootDir>/__tests__/**/*.spec.(js|jsx|ts|tsx)'
  ]
}

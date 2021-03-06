/* eslint-disable no-undef */
module.exports = {
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/,/.next/',
    '/.slicemachine/',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTest.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  moduleNameMapper: {
    '\\.(scss|css|sass)$': 'identity-obj-proxy',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.tsx',
    '!src/**/*.spec.tsx',
    '!src/**/*._app.tsx',
    '!src/**/*._document.tsx',
  ],
  coverageReporters: ['json', 'lcov'],
};

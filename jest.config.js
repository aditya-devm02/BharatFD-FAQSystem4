module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/tests/setup.js'
    ],
    transform: {
        '^.+\\.js$': ['babel-jest', { configFile: './.babelrc' }]
    },
    moduleFileExtensions: ['js', 'json'],
    testMatch: [
        '**/tests/**/*.test.js'
    ],
    verbose: true,
    collectCoverageFrom: [
        'src/**/*.js',
        'services/**/*.js',
        'controllers/**/*.js',
        'repositories/**/*.js',
        '!**/node_modules/**'
    ],
    testTimeout: 10000,
    forceExit: true,
    detectOpenHandles: true,
    testEnvironmentOptions: {
        NODE_ENV: 'test'
    },
    globals: {
        NODE_ENV: 'test'
    }
};
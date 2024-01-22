module.exports = {
  rootDir: '.',
  displayName: 'gateway',
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.app.json',
      },
    ],
  },
  setupFiles: [
  ],
  moduleNameMapper: {
  },
}

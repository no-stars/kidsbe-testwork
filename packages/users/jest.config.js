module.exports = {
  rootDir: '.',
  displayName: 'users',
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
    '<rootDir>/test/setup/expose-env.ts',
  ],
  moduleNameMapper: {
  },
}

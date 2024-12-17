module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },

  transformIgnorePatterns: [
    "/node_modules/(?!nome-do-seu-modulo-para-transformar)/"
  ],

  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};

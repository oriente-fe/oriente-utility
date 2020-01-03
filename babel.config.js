module.exports = {
  env: {
    test: {
      presets: ['@babel/preset-env']
    },
    esm: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false
          }
        ]
      ]
    },
    umd: {
      presets: ['@babel/preset-env']
    }
  }
};

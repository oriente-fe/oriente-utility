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
    cjs: {
      presets: ['@babel/preset-env']
    }
  }
};

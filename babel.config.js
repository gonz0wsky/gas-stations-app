module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@feature': './src/feature',
          '@shared': './src/shared',
          '@core': './src/core',
          '@assets': './assets',
        },
      },
    ],
    '@babel/plugin-transform-export-namespace-from',
    'macros',
    'react-native-reanimated/plugin',
  ],
};

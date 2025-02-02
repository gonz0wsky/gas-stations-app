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
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: false,
        verbose: false,
      },
    ],
    '@babel/plugin-transform-export-namespace-from',
    'macros',
    'react-native-reanimated/plugin',
  ],
};

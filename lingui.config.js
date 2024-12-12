/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ['en', 'es'],
  catalogs: [
    {
      path: '<rootDir>/src/core/locale/locales/{locale}/messages',
      include: ['src'],
    },
  ],
  format: 'po',
};

/**
 * @type {import('gatsby').GatsbyConfig}
 */
const { languages, defaultLanguage } = require('./src/common/Languages')

module.exports = {
  siteMetadata: {
    title: `Co-Binary`,
    description: `Collboration Binary World, my personal digital garden.`,
    image: `/logo.png`,
    siteUrl: `https://www.co-binary.com`,
  },
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`,
        languages,
        defaultLanguage,
        siteUrl: `http://localhost:8000/`,
        i18nextOptions: {
          fallbackLng: defaultLanguage,
          supportedLngs: languages,
          defaultNS: 'common',
          interpolation: {
            escapeValue: false,
          },
          keySeparator: false,
          nsSeparator: false,
        },
        pages: [],
      },
    },
  ],
}

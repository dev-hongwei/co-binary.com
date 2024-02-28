/**
 * @type {import('gatsby').GatsbyConfig}
 */
const { languages, defaultLanguage } = require('./src/common/Languages')

module.exports = {
  siteMetadata: {
    title: `Co-Binary`,
    description: `Collboration Binary World, my personal digital garden.`,
    image: `icon.ico`,
    siteUrl: `https://www.co-binary.com`,
  },
  flags: {
    DEV_SSR: true,
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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`,
        languages,
        defaultLanguage,
        siteUrl: `https://www.co-binary.com`,
        trailingSlash: 'always',
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

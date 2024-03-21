/**
 * @type {import('gatsby').GatsbyConfig}
 */

// import language related configuration
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
    // css plugin
    'gatsby-plugin-postcss',

    // multi-language support
    {
      // define from where to find the multi-language resources
      // use name to reference it.
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // reference the multi-language resources
        languages, // all languages that are supported
        defaultLanguage, // the default language
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

    // markdown
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              //linkImagesToOriginal: false,
              backgroundColor: 'transparent',
            },
          },
          `gatsby-remark-prismjs-copy-button`,
          `gatsby-remark-prismjs`,
        ],
      },
    },
  ],
}

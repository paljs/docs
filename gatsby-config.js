const path = require('path');
const remarkSlug = require('remark-slug');

module.exports = {
  siteMetadata: {
    title: 'Pal.js',
    description: 'I am your friend in building NodeJs, Prisma, GraphQL, React project',
    author: 'Ahmed Elywa',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/Layouts/index.tsx`),
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
    'gatsby-plugin-root-import',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        decks: [],
        defaultLayouts: {
          default: path.resolve('./src/components/MdxLayout.tsx'),
        },
        extensions: ['.mdx', '.md'],
        remarkPlugins: [remarkSlug],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-plugin-mdx-code-demo-oah',
            options: {
              demoComponent: path.resolve('./src/components/Example'),
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: {
                tsx: 'tsx',
                prisma: 'prisma',
              },
              aliases: {},
              languageExtensions: [
                {
                  language: 'prisma',
                  extend: 'javascript',
                  definition: {
                    keyword: /(enum|model|generator|datasource)/,
                    'class-name': {
                      pattern: /^(\w+)(\s)(\w+)|(\s)[A-Z](\w+)/gm,
                      lookbehind: true,
                    },
                  },
                  insertBefore: {
                    'class-name': {
                      annotation: {
                        pattern: /(^|[^.])@+\w+/,
                        lookbehind: true,
                      },
                      constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'paljs',
        short_name: 'Pal',
        start_url: '/dashboard',
        display: 'minimal-ui',
        icon: 'src/images/logo.png', // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
};

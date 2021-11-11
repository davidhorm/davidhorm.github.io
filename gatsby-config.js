module.exports = {
  siteMetadata: {
    title: `David Horm's Thoughts and Notes`,
    description: `David Horm's personal homepage is where he collects his random thoughts and notes, zettelkasten style.`,
    author: `David Horm`,
    twitter: 'davidhorm',
    siteUrl: `https://davidhorm.github.io/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,

    // https://github.com/ekampf/gatsby-theme-networked-thought#-usage
    {
      resolve: `gatsby-theme-networked-thought`,
      options: {
        thoughtsDirectory: `content/`,
        rootThought: `index`,
      }
    },
  ],
}

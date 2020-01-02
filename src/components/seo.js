/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO(props) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            language
          }
        }
      }
    `
  )

  const metaDescription = props.description || site.siteMetadata.description

  return (
    <Helmet
      // defer=false is necessary to make gatsby-plugin-react-helmet emit
      // the title into the <title /> tag.
      // see: https://github.com/gatsbyjs/gatsby/blob/db8755ca13da60f4c4beaaf6542e4ddf6c646578/packages/gatsby-plugin-react-helmet/README.md#titles-dont-appear-when-opening-in-the-background-while-using-gatsby-plugin-offline
      // and https://github.com/nfl/react-helmet/issues/315
      defer={false}
      htmlAttributes={{
        lang: props.lang || site.siteMetadata.language || "en",
      }}
      title={props.title}
      titleTemplate={
        props.skipSuffix ? `%s` : `%s | ${site.siteMetadata.title}`
      }
      defaultTitle={site.siteMetadata.title}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: props.title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: props.title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(props.meta)}
    />
  )
}

SEO.defaultProps = {
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO

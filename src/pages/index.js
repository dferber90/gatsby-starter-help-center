/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import * as icons from "../utils/icons"

function concatArticles(node) {
  return [
    ...(Array.isArray(node.articles) ? node.articles : []),
    ...(Array.isArray(node.sections)
      ? node.sections.flatMap((section) =>
          Array.isArray(section.articles) ? section.articles : []
        )
      : []),
  ]
}

class HelpCenterIndex extends React.Component {
  render() {
    return (
      <Layout
        location={this.props.location}
        title={this.props.data.site.siteMetadata.title}
        description={this.props.data.site.siteMetadata.description}
      >
        <SEO title={this.props.data.site.siteMetadata.title} skipSuffix />
        {this.props.data.collections.edges.map(({ node }, index) => {
          const articlesOfCollection = concatArticles(node)

          const icon = node.icon
            ? jsx(
                icons[node.icon],
                { sx: { color: "iconColor" }, size: "2rem" },
                null
              )
            : null

          return (
            <Link
              key={node.id}
              sx={{
                boxShadow: `none`,
                "&:hover": {
                  textDecoration: "none",
                },
              }}
              to={node.fields.slug}
            >
              <article
                sx={{
                  backgroundColor: "paperBackgroundColor",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "paperBorderColor",
                  borderRadius: 3,
                  py: 4,
                  px: 2,
                  position: "relative",
                  zIndex: "3",
                  textDecoration: "none",
                  overflow: "hidden",
                  width: "100%",
                  display: "flex",
                  flexDirection: ["column", "row"],
                  outline: "none",
                  mt: index === 0 ? 5 : 0,
                  mb:
                    index === this.props.data.collections.edges.length - 1
                      ? 5
                      : 4,
                  boxShadow: "0 3px 8px 0 rgba(0,0,0,0.03)",
                  transition:
                    "border .15s linear, transform .15s linear, background-color .15s linear, box-shadow .15s linear, opacity .15s linear, transform .15s linear, box-shadow .15s linear",
                  color: "paperHeadingColor",
                  "&:hover": {
                    border: "1px solid rgba(136,149,162,0.2)",
                    backgroundColor: "paperHoverBackgroundColor",
                    color: "paperHoverHeadingColor",
                  },
                }}
              >
                <div
                  sx={{
                    flex: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: ["flex-start", "center"],
                    px: [2, 0],
                    pb: [3, 0],
                  }}
                >
                  {icon}
                </div>
                <div sx={{ flex: "6", px: [2, 0] }}>
                  <header>
                    <h3
                      sx={{
                        mt: 0,
                        mb: 2,
                        color: "inherit",
                      }}
                    >
                      {node.title}
                    </h3>
                  </header>
                  <section
                    sx={{
                      color: "paperDescriptionColor",
                    }}
                  >
                    {node.description}
                  </section>
                  <small
                    sx={{
                      color: "paperDescriptionColor",
                    }}
                  >
                    {articlesOfCollection.length}{" "}
                    {(() => {
                      switch (articlesOfCollection.length) {
                        case 0:
                          return this.props.data.site.siteMetadata.texts
                            .articlesInCollectionZeroText
                        case 1:
                          return this.props.data.site.siteMetadata.texts
                            .articlesInCollectionOneText
                        case 2:
                          return this.props.data.site.siteMetadata.texts
                            .articlesInCollectionTwoText
                        default:
                          return this.props.data.site.siteMetadata.texts
                            .articlesInCollectionMultipleText
                      }
                    })()}
                  </small>
                </div>
              </article>
            </Link>
          )
        })}
      </Layout>
    )
  }
}

export default HelpCenterIndex

export const pageQuery = graphql`
  fragment IndexArticleFragment on File {
    childMarkdownRemark {
      id
    }
  }
  query {
    site {
      siteMetadata {
        title
        description
        texts {
          articlesInCollectionZeroText
          articlesInCollectionOneText
          articlesInCollectionTwoText
          articlesInCollectionMultipleText
        }
      }
    }
    collections: allCollectionsYaml {
      edges {
        node {
          id
          title
          icon
          description
          articles {
            file {
              ...IndexArticleFragment
            }
          }
          sections {
            articles {
              file {
                ...IndexArticleFragment
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

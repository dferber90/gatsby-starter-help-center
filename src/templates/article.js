/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Link, graphql } from "gatsby"
import slug from "slug"
import Image from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class ArticleTemplate extends React.Component {
  render() {
    const article = this.props.data.article
    const siteTitle = this.props.data.site.siteMetadata.title
    const collection = article.fields.collection
    const section = article.fields.section

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={article.frontmatter.title}
          description={article.frontmatter.description || article.excerpt}
        />
        <p sx={{ mt: 1, mb: 2, py: 0 }}>
          <Link
            to="/"
            sx={{
              color: "breadcrumbLinkTextColor",
              boxShadow: "none",
              fontSize: 1,
              "&:hover": {
                color: "breadcrumbHoverLinkTextColor",
              },
            }}
          >
            {this.props.data.site.siteMetadata.texts.allCollectionsText}
          </Link>{" "}
          <span sx={{ color: "breadcrumbTextColor", fontSize: 1 }}>
            &rsaquo;
          </span>{" "}
          {collection && (
            <React.Fragment>
              <Link
                to={collection.fields.slug}
                sx={{
                  color: "breadcrumbLinkTextColor",
                  boxShadow: "none",
                  fontSize: 1,
                  "&:hover": {
                    color: "breadcrumbHoverLinkTextColor",
                  },
                }}
              >
                {collection.title}
              </Link>{" "}
              <span sx={{ color: "breadcrumbTextColor", fontSize: 1 }}>
                &rsaquo;
              </span>{" "}
              {section && (
                <>
                  <Link
                    to={collection.fields.slug + "#" + slug(section.id)}
                    sx={{
                      color: "breadcrumbLinkTextColor",
                      boxShadow: "none",
                      fontSize: 1,
                      "&:hover": {
                        color: "breadcrumbHoverLinkTextColor",
                      },
                    }}
                  >
                    {section.title}
                  </Link>{" "}
                  <span sx={{ color: "breadcrumbTextColor", fontSize: 1 }}>
                    &rsaquo;
                  </span>{" "}
                </>
              )}
            </React.Fragment>
          )}
          <span sx={{ color: "breadcrumbTextColor", fontSize: 1 }}>
            {article.frontmatter.title}
          </span>
        </p>
        <article
          sx={{
            backgroundColor: "paperBackgroundColor",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "paperBorderColor",
            borderRadius: 3,
            px: [2, 4],
            py: 2,
            mb: 6,
            position: "relative",
            zIndex: "3",
            textDecoration: "none",
            overflow: "hidden",
            width: "100%",
            display: "block",
            outline: "none",
            boxShadow: "0 3px 8px 0 rgba(0,0,0,0.03)",
            transition:
              "border .15s linear, transform .15s linear, background-color .15s linear, box-shadow .15s linear, opacity .15s linear, transform .15s linear, box-shadow .15s linear",
            color: "articleTextColor",
          }}
        >
          <header sx={{ mb: 3 }}>
            <h2 sx={{ mt: 4, mb: 1 }}>{article.frontmatter.title}</h2>
            <p sx={{ my: 3, color: "articleDescriptionColor" }}>
              {article.frontmatter.description}
            </p>
            {article.frontmatter.author && (
              <div sx={{ mt: 2, mb: 4, display: "flex" }}>
                <div sx={{ display: "flex", alignItems: "center" }}>
                  <Image
                    fixed={
                      article.frontmatter.author.avatar.childImageSharp.fixed
                    }
                    alt={article.frontmatter.author.name}
                    style={{
                      marginRight: rhythm(1 / 2),
                      marginBottom: 0,
                      width: 40,
                      height: 40,
                      borderRadius: `100%`,
                    }}
                    imgStyle={{
                      borderRadius: `50%`,
                    }}
                  />
                </div>
                <div
                  sx={{
                    color: "muted",
                    fontSize: 1,
                    lineHeight: "small",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div>
                      {this.props.data.site.siteMetadata.texts.writtenByText}{" "}
                      <span sx={{ color: "breadcrumbLinkTextColor" }}>
                        {article.frontmatter.author.name}
                      </span>
                    </div>
                    {article.frontmatter.modifiedDate ? (
                      <div
                        sx={{
                          display: `block`,
                        }}
                      >
                        <span
                          title={new Date(
                            article.frontmatter.modifiedDate
                          ).toLocaleString(
                            this.props.data.site.siteMetadata.language
                          )}
                        >
                          {
                            this.props.data.site.siteMetadata.texts
                              .lastModifiedText
                          }{" "}
                          {new Date(
                            article.frontmatter.modifiedDate
                          ).toLocaleDateString(
                            this.props.data.site.siteMetadata.language
                          )}
                        </span>
                      </div>
                    ) : article.frontmatter.date ? (
                      <div
                        sx={{
                          display: `block`,
                        }}
                      >
                        <span
                          title={new Date(
                            article.frontmatter.date
                          ).toLocaleString(
                            this.props.data.site.siteMetadata.language
                          )}
                        >
                          {
                            this.props.data.site.siteMetadata.texts
                              .publishedOnText
                          }{" "}
                          {new Date(
                            article.frontmatter.date
                          ).toLocaleDateString(
                            this.props.data.site.siteMetadata.language
                          )}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
          </header>
          <hr sx={{ background: "hsla(0,0%,0%,0.05)" }} />
          <section
            sx={{ pb: 4 }}
            dangerouslySetInnerHTML={{ __html: article.html }}
          />
        </article>
      </Layout>
    )
  }
}

export default ArticleTemplate

export const pageQuery = graphql`
  query ArticleBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        texts {
          writtenByText
          allCollectionsText
          lastModifiedText
          publishedOnText
        }
        language
      }
    }
    article: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        section {
          id
          title
        }
        collection {
          id
          title
          fields {
            slug
          }
        }
      }
      frontmatter {
        title
        date
        modifiedDate
        description
        author {
          id
          name
          avatar {
            childImageSharp {
              fixed(width: 100, height: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`

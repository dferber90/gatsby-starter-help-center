/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import slug from "slug"
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

function Card(props) {
  return (
    <Link
      to={props.to}
      sx={{ textDecoration: "none", "&:hover": { textDecoration: "none" } }}
    >
      <div
        sx={{
          backgroundColor: "paperBackgroundColor",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "rgba(136,149,162,0.2)",
          borderBottomColor: props.hasSuccessor
            ? "transparent"
            : "rgba(136,149,162,0.2)",
          borderTopLeftRadius: props.hasPredecessor ? 0 : 3,
          borderTopRightRadius: props.hasPredecessor ? 0 : 3,
          borderBottomLeftRadius: props.hasSuccessor ? 0 : 3,
          borderBottomRightRadius: props.hasSuccessor ? 0 : 3,
          padding: [3, 4],
          position: "relative",
          zIndex: "3",
          textDecoration: "none",
          overflow: "hidden",
          width: "100%",
          display: "block",
          outline: "none",
          marginBottom: props.hasSuccessor ? 0 : 3,
          boxShadow: "0 3px 8px 0 rgba(0,0,0,0.03)",
          transition:
            "border .15s linear, transform .15s linear, background-color .15s linear, box-shadow .15s linear, opacity .15s linear, transform .15s linear, box-shadow .15s linear",
          color: "paperHeadingColor",
          "&:hover": {
            border: "1px solid rgba(136,149,162,0.2)",
            backgroundColor: "paperHoverBackgroundColor",
            color: "paperHoverHeadingColor",
            borderBottomColor: props.hasSuccessor
              ? "transparent"
              : "rgba(136,149,162,0.2)",
          },
        }}
      >
        <h3 sx={{ my: 0, py: 0, color: "inherit", fontSize: [3, 4] }}>
          {props.title}
        </h3>
        <div
          sx={{
            mt: 2,
            color: "paperDescriptionColor",
            fontSize: [1, 2],
            lineHeight: "body",
          }}
        >
          {props.description}
        </div>
      </div>
    </Link>
  )
}

class CollectionTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const collection = this.props.data.collection
    const articles = concatArticles(collection)

    const icon = collection.icon
      ? jsx(
          icons[collection.icon],
          { sx: { color: "iconColor" }, size: "2rem" },
          null
        )
      : null

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={collection.title} description={collection.description} />
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
          <span sx={{ color: "breadcrumbTextColor", fontSize: 1 }}>
            {collection.title}
          </span>
        </p>
        <article
          sx={{
            backgroundColor: "collectionBackgroundColor",
            borderColor: "transparent",
            borderStyle: "solid",
            borderRadius: 2,
            px: [2, 4],
            py: 2,
            mb: 6,
          }}
        >
          <div
            sx={{
              display: "flex",
              flexDirection: ["column", "row"],
              pt: [0, 3],
            }}
          >
            <div
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: ["flex-start", "center"],
                py: [3, 0],
              }}
            >
              {icon}
            </div>
            <div sx={{ flex: 4 }}>
              <header>
                <h2
                  sx={{
                    my: 0,
                    py: 0,
                    color: "collectionHeading",
                  }}
                >
                  {collection.title}
                </h2>
              </header>
              <p
                sx={{
                  pt: 2,
                  pb: 0,
                  mb: 0,
                  color: "collectionDescription",
                }}
              >
                {collection.description}
              </p>
              <small sx={{ color: "collectionDescription" }}>
                {articles.length}{" "}
                {(() => {
                  switch (articles.length) {
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
          </div>
          <ul sx={{ ml: 0, mt: 5, listStyleType: "none" }}>
            {(Array.isArray(collection.articles)
              ? collection.articles
              : []
            ).map((articleNode, index) => {
              // This happens when a collection points to an article file which
              // does not exist
              if (
                !articleNode ||
                !articleNode.file ||
                !articleNode.file.childMarkdownRemark
              ) {
                return null
              }

              const article = articleNode.file.childMarkdownRemark
              if (!article) return null
              return (
                <li key={article.fields.slug} sx={{ my: 0, py: 0 }}>
                  <Card
                    to={article.fields.slug}
                    title={article.frontmatter.title}
                    description={article.frontmatter.description}
                    hasPredecessor={index > 0}
                    hasSuccessor={index < collection.articles.length - 1}
                  />
                </li>
              )
            })}
          </ul>
          {Array.isArray(collection.sections) &&
            collection.sections.map((section) => {
              const articlesOfSection = Array.isArray(section.articles)
                ? section.articles
                    .filter(({ file }) => file)
                    .map(({ file }) => file.childMarkdownRemark)
                : []

              // skip sections without articles
              if (articlesOfSection.length === 0) return null

              return (
                <React.Fragment key={section.id}>
                  {/* Id must be set for navigation */}
                  <a
                    id={slug(section.id)}
                    href={"#" + slug(section.id)}
                    sx={{
                      cursor: "default",
                      ":hover": { textDecoration: "none" },
                    }}
                  >
                    <h3 sx={{ fontSize: 3, mb: 3, color: "initial" }}>
                      {section.title}
                    </h3>
                  </a>
                  <ul sx={{ ml: 0, listStyleType: "none" }}>
                    {articlesOfSection.map((article, index) =>
                      article ? (
                        <li key={article.fields.slug} sx={{ my: 0, py: 0 }}>
                          <Card
                            to={article.fields.slug}
                            title={article.frontmatter.title}
                            description={article.frontmatter.description}
                            hasPredecessor={index > 0}
                            hasSuccessor={index < articlesOfSection.length - 1}
                          />
                        </li>
                      ) : null
                    )}
                  </ul>
                </React.Fragment>
              )
            })}
        </article>
      </Layout>
    )
  }
}

export default CollectionTemplate

export const pageQuery = graphql`
  fragment CollectionArticleFragment on File {
    childMarkdownRemark {
      excerpt
      fields {
        slug
      }
      parent {
        id
        ... on File {
          name
          sourceInstanceName
        }
      }
      frontmatter {
        title
        description
      }
    }
  }

  query CollectionArticlesByCollectionId($collectionId: String!) {
    site {
      siteMetadata {
        title
        texts {
          allCollectionsText
          articlesInCollectionZeroText
          articlesInCollectionOneText
          articlesInCollectionTwoText
          articlesInCollectionMultipleText
        }
      }
    }
    collection: collectionsYaml(id: { eq: $collectionId }) {
      id
      title
      description
      icon
      articles {
        file {
          ...CollectionArticleFragment
        }
      }
      sections {
        id
        title
        articles {
          file {
            ...CollectionArticleFragment
          }
        }
      }
      fields {
        slug
      }
    }
  }
`

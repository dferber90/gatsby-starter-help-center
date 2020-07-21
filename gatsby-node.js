const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const slug = require("slug")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const articlePage = require.resolve(`./src/templates/article.js`)
  const collectionPage = require.resolve(`./src/templates/collection.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              id
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
              }
            }
          }
        }
        allCollectionsYaml {
          edges {
            node {
              id
              title
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create article and collection pages.
  const items = result.data.allMarkdownRemark.edges
  const articles = items.filter(
    (item) => item.node.parent.sourceInstanceName === "articles"
  )
  const collections = result.data.allCollectionsYaml.edges

  articles.forEach((post, index) => {
    const slug = post.node.fields.slug

    createPage({
      path: slug,
      component: articlePage,
      context: {
        slug,
      },
    })
  })

  collections.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: collectionPage,
      context: {
        slug: node.fields.slug,
        collectionId: node.id,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    const sourceInstanceName = fileNode.sourceInstanceName

    // creates slugs like
    //  /articles/some-heading
    const value =
      "articles" === sourceInstanceName
        ? "/" + sourceInstanceName + createFilePath({ node, getNode })
        : createFilePath({ node, getNode })

    actions.createNodeField({
      name: `slug`,
      node,
      value,
    })
  } else if (node.internal.type === `CollectionsYaml`) {
    // creates slugs like
    //  /collections/some-collection-name
    actions.createNodeField({
      name: `slug`,
      node,
      value: "/collections/" + slug(node.id),
    })
  }
}

// Checks whether "articles" containts the article located at "articlePath".
// "articlePath" must be an absolute url.
function articlesContainSpecificArticle(articles, articlePath) {
  return (
    Array.isArray(articles) &&
    articles.some(
      // compare articles by absolute file path
      (article) => path.resolve("data", article.file) === articlePath
    )
  )
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const typeDefs = [
    "type MarkdownRemark implements Node { fields: MarkdownRemarkFields }",
    schema.buildObjectType({
      name: "MarkdownRemarkFields",
      fields: {
        collection: {
          type: "CollectionsYaml",
          resolve: (source, args, context, info) => {
            // determine the collection of the article based on the file path
            const rootNode = context.nodeModel.findRootNodeAncestor(source)
            const collection = context.nodeModel
              .getAllNodes({ type: "CollectionsYaml" })
              .find((collection) => {
                // check fixed articles
                if (
                  articlesContainSpecificArticle(
                    collection.articles,
                    rootNode.absolutePath
                  )
                )
                  return true

                // check articles of sections
                if (
                  Array.isArray(collection.sections) &&
                  collection.sections.some((section) => {
                    return articlesContainSpecificArticle(
                      section.articles,
                      rootNode.absolutePath
                    )
                  })
                )
                  return true

                return false
              })
            //
            return collection
          },
        },
        section: {
          type: "CollectionsYamlSections",
          resolve: (source, args, context, info) => {
            const rootNode = context.nodeModel.findRootNodeAncestor(source)
            // determine the section of the article based on the file path
            const sections = context.nodeModel
              .getAllNodes({ type: "CollectionsYaml" })
              .filter((collection) => Array.isArray(collection.sections))
              .flatMap((collection) => collection.sections)

            return sections.find((section) =>
              articlesContainSpecificArticle(
                section.articles,
                rootNode.absolutePath
              )
            )
          },
        },
      },
    }),
    // hard-code collection types to avoid errors when collections don't use all
    // features
    `
      type CollectionsYaml implements Node {
        sections: [CollectionsYamlSections]
        articles: [CollectionsYamlArticles]
      }
      type CollectionsYamlArticles implements Node @infer {
        file: File @fileByRelativePath
      }
      type CollectionsYamlSections implements Node {
        id: String!
        title: String!
        articles: [CollectionsYamlSectionsArticles]
      }
      type CollectionsYamlSectionsArticles implements Node @infer {
        file: File @fileByRelativePath
      }
    `,
    // hard-code article frontmatter types to avoid erros when articles don't
    // use all features
    `
      type MarkdownRemarkFrontmatter implements Node {
        date: Date @dateformat
        modifiedDate: Date @dateformat
      }
    `,
  ]
  actions.createTypes(typeDefs)
}

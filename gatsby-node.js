const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
  const page = path.resolve(`./src/templates/page.tsx`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          filter: { frontmatter: { draft: { ne: true } } }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              type
              categories
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: post.frontmatter.type == "page" ? page : blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
      if (post.frontmatter.slug) {
        createRedirect({
          fromPath: post.frontmatter.slug,
          toPath: post.fields.slug,
          redirectInBrowser: true,
          isPermanent: true,
        })
      }
    })

    const postsPerPage = 5
    const numPages = Math.ceil(
      posts.filter(post => post.frontmatter.type === "post").length /
        postsPerPage
    )
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/page/${i}`,
        component: path.resolve("./src/templates/main-paginated.js"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i,
        },
      })
    })
  }

  // Create array of every category without duplicates
  const dedupedCategories = dedupeCategories(result.data.allMarkdownRemark)
  // Iterate over categories and create page for each
  dedupedCategories.forEach(category => {
    reporter.info(`Creating page: category/${category}`)
    createPage({
      path: `category/${category.toLowerCase().replace(/ /g, "-")}`,
      component: require.resolve("./src/templates/category-list.tsx"),
      // Create props for our CategoryList.js component
      context: {
        category,
        slug: `category/${category.toLowerCase().replace(/ /g, "-")}`,
        // Create an array of ids of articles in this category
        ids: result.data.allMarkdownRemark.nodes
          .filter(node => {
            return (
              (node.frontmatter.categories &&
                node.frontmatter.categories.includes(category)) ||
              false
            )
          })
          .map(node => node.id),
      },
    })
  })
}

function dedupeCategories(allMarkdownRemark) {
  const uniqueCategories = new Set()
  // Iterate over all articles
  allMarkdownRemark.nodes.forEach(node => {
    // Iterate over each category in an article
    if (node.frontmatter.categories) {
      node.frontmatter.categories.forEach(category => {
        uniqueCategories.add(category)
      })
    }
  })
  // Create new array with duplicates removed
  return Array.from(uniqueCategories)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
      github: String
      youtube: String
      linkedin: String
      email: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      tags: [String]
      categories: [String]
    }

    type Fields {
      slug: String
    }
  `)
}

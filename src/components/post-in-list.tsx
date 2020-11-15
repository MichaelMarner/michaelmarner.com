import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

export const PostInList = ({ post }) => {
  const title = post.frontmatter.title || post.fields.slug
  let featuredImgFluid = post.frontmatter.featured_image?.childImageSharp?.fluid
  let tags = post.frontmatter.tags || []
  let postClasses = featuredImgFluid
    ? "post type-post status-publish format-standard hentry has-post-thumbnail"
    : "post type-post status-publish format-standard hentry"
  return (
    <article id={post.id} className={postClasses}>
      {featuredImgFluid && (
        <div className="post-thumbnail">
          <Img fluid={featuredImgFluid} />
        </div>
      )}
      <header className="entry-header">
        <h1 className="entry-title">
          <Link to={post.fields.slug} itemProp="url">
            <span itemProp="headline">{title}</span>
          </Link>
        </h1>
      </header>
      <div className="entry-content">
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <h4>Join the conversation!</h4>
        Hit me up on <a href="https://twitter.com/MichaelMarner">
          Twitter
        </a> or <a href="mailto:marner@hey.com">send me an email.</a>
      </div>
      <footer className="entry-footer">
        <span className="posted-on">
          <span className="screen-reader-text">Posted on </span>
          {post.frontmatter.date}
        </span>
        <span className="cat-links">{post.frontmatter.categories}</span>
        <span className="tags-links">
          <span className="screen-reader-text">Tags: </span>
          {tags.join(", ")}
        </span>
      </footer>
    </article>
  )
}

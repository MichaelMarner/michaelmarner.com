import React from "react"
import { Link } from "gatsby"

export const Sidebar = ({ menuItems, socials }) => {
  return (
    <div id="sidebar" className="sidebar">
      <header id="masthead" className="site-header" role="banner">
        <div className="site-branding">
          <h1 className="site-title">
            <Link to="/" rel="home">
              Michael Marner's Website
            </Link>
          </h1>

          <p className="site-description">Computer stuff, mostly</p>
        </div>
      </header>

      <div id="secondary" className="secondary">
        <nav id="site-navigation" className="main-navigation" role="navigation">
          <div className="menu-top-container">
            <ul className="nav-menu">
              {menuItems.map(item => {
                return (
                  <li
                    key={item.id}
                    className="menu-item menu-item-type-post_type menu-item-object-page"
                  >
                    <Link to={item.fields.slug}> {item.frontmatter.title}</Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
        <nav
          id="social-navigation"
          className="social-navigation"
          role="navigation"
        >
          <div className="menu-social-container">
            <ul id="menu-social" className="menu">
              {socials.twitter && (
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <a href={`https://twitter.com/${socials.twitter}`}>
                    <span className="screen-reader-text">Twitter</span>
                  </a>
                </li>
              )}
              {socials.youtube && (
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <a
                    href={`https://www.youtube.com/channel/${socials.youtube}`}
                  >
                    <span className="screen-reader-text">Youtube</span>
                  </a>
                </li>
              )}
              {socials.linkedin && (
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <a href={`https://www.linkedin.com/in/${socials.linkedin}`}>
                    <span className="screen-reader-text">LinkedIn</span>
                  </a>
                </li>
              )}
              {socials.github && (
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <a href={`https://github.com/${socials.github}`}>
                    <span className="screen-reader-text">GitHub</span>
                  </a>
                </li>
              )}
              {socials.email && (
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <a href={`mailto:${socials.email}`}>
                    <span className="screen-reader-text">Email</span>
                  </a>
                </li>
              )}
            </ul>
          </div>{" "}
        </nav>
      </div>
    </div>
  )
}

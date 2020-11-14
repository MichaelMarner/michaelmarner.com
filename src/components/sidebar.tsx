import React from "react"
import { Link } from "gatsby"

export const Sidebar = ({ menuItems }) => {
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
      </div>
    </div>
  )
}

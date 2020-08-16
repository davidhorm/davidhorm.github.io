import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hello World</h1>
    <p>I like to make things on the web. Here are all the things I made:</p>
    <p>
      <ul>
        <li><a href="https://davidhorm.github.io/">https://davidhorm.github.io/</a> - You are here. I'm thinking about jotting my learnings here.</li>
        <li><a href="https://davidhorm.github.io/xwing-dividers/">https://davidhorm.github.io/xwing-dividers/</a> - Generate divider boxes to hold X-Wing Miniature Game pilot and upgrade cards</li>
        <li><a href="https://davidhorm.github.io/xwing-datatables/">https://davidhorm.github.io/xwing-datatables/</a> - Displaying the data found in xwing-data in datatables for searching and filtering</li>
        <li><a href="https://github.com/davidhorm/cookbook">https://github.com/davidhorm/cookbook</a> - Display and scale ingredient amounts directly in recipe. (not live yet)</li>
        <li><a href="https://davidhorm.github.io/wavelength/">https://davidhorm.github.io/wavelength/</a> - Play Wavelength party game on web conference.</li>
        <li><a href="https://davidhorm.github.io/whats-my-word/">https://davidhorm.github.io/whats-my-word/</a> - Play What's My Word game on your phone.</li>
      </ul>
    </p>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
)

export default IndexPage

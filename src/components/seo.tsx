import * as React from 'react'
import { Helmet } from "react-helmet"

interface SEOprops {
    description?: string,
    metaKeywords?: string
    title?: string,  
}

const defaultProps: SEOprops = {
  title:  'Adult Course Finder',
  description: 'Find courses from over 4000 organisations including England, Wales and Northern Ireland colleges, schools, training providers and local education authorities. Courses featured include adult further education, adult community learning, apprenticeships, courses that are co-funded by the European Social Fund, and courses aimed at people aged 16 to 18.',
  metaKeywords: 'Course Finder, Adult Course Finder, Adult Education UK'
}

const SEO: React.StatelessComponent<SEOprops> = ({ title, description, metaKeywords}) => {
  return (
    <header>
    <Helmet
      htmlAttributes={{
        lang:'en',
      }}>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={metaKeywords} />
      </Helmet>
      </header>
  )
}
SEO.defaultProps = defaultProps;

export default SEO

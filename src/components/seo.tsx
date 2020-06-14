import * as React from 'react'
import { Helmet } from "react-helmet"

interface SEOprops {
    description?: string,
    metaKeywords?: string
    title?: string,  
}

const defaultProps: SEOprops = {
  description: '',
  metaKeywords: 'Course Finder,Adult Course Finder,Adult Education'
}

const SEO: React.StatelessComponent<SEOprops> = ({ title, description, metaKeywords}) => {
  return (
    <header>
    <Helmet
      htmlAttributes={{
        lang:'en',
      }}>
       <title title={title}></title>
        <meta name="description" content={description} />
        <meta name="keywords" content={metaKeywords} />
      </Helmet>
      </header>
  )
}
SEO.defaultProps = defaultProps;

export default SEO

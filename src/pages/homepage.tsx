import * as React from 'react';
// import { useState } from "react"
// import { Link, withRouter} from "react-router-dom";
import Layout from '../components/layout'
import SEO from '../components/seo'
import Header from '../components/header'
import Search from '../components/search'



interface HomePageProps {

}
const HomePage: React.FunctionComponent<HomePageProps> = (props) => {
    return (
        <Layout>
            <SEO title="HOME" />
            <Header pageTitle="England Adult Course Finder" pageDescription="Find Courses near you!"/>
            <Search></Search>
            {/* <Link to="/search">Find course near you </Link> */}
            {/* <article>
                <header>
                    <h2>The section title</h2>
                    <p>The text paragraph.</p>
                </header>
            </article> */}
        </Layout>
    );
}

export default HomePage

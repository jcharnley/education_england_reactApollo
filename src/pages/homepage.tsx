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
            <Header pageTitle="Adult Course Finder" pageDescription="Find Courses near you!" />
            <article style={{padding:' 1.5rem 1rem'}}>Search for adult community learning, adult further education, apprenticeships courses and courses which are co-funded by the European Social Fund, and course that are aimed at people aged 16 to 18
            <br/>
            <br/>
            <small>
                   Over 4000 providers in England, Wales and Northern Ireland
                   </small> </article>
            <Search></Search>
            <article>
                
            </article>
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

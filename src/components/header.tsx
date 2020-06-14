import * as React from 'react';


interface Headerprops {
    pageTitle?: string,
    pageDescription?: string
}

const Header: React.FunctionComponent<Headerprops> = ({ pageTitle, pageDescription }) => (
    <header
        style={{
            background: 'rgb(249, 250, 253)'
        }}
    >
        <div
            style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `1.45rem 1.0875rem`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}
        >
            <h1 style={{
                margin: 0
            }}>
                {pageTitle}
            </h1>
            <h4>
                {pageDescription}
            </h4>
        </div>
    </header>
)

export default Header

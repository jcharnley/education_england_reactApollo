import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { gql } from "apollo-boost";

const customFetch = (uri, options) => {
  return fetch(uri, options).then(response => {
    if (response.status >= 500) {
      // or handle 400 errors
      return Promise.reject(response.status);
    }
    return response;
  });
};
const client = new ApolloClient({
  link: createHttpLink({
    uri: "/graphql",
    fetch: customFetch
  }),
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      {
        closeTo(lng: -0.1128785, lat: 51.5446098, radius: 1668.03) {
          edges {
            node {
              venueName
              postcode
            }
          }
        }
      }
    `
  })
  .then(result => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
serviceWorker.unregister();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


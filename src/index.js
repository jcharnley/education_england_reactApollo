import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { BrowserRouter } from "react-router-dom";

const customFetch = (uri, options) => {
  return fetch(uri, options).then((response) => {
    if (response.status >= 500) {
      return Promise.reject(response.status);
    }
    return response;
  });
};
const client = new ApolloClient({
  link: createHttpLink({
    uri: "/graphql",
    fetch: customFetch,
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.unregister();
serviceWorker.unregister();

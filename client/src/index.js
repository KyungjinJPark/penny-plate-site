import React from "react";
import ReactDOM from "react-dom";

// custom Bootstrap style
import "./custom.scss";

// for GraphCMS integration
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import "./index.css";
import App from "./App";

const client = new ApolloClient({
  uri: "https://api-us-east-1.graphcms.com/v2/ckj2jtivtekmg01z50f7zb829/master"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  ,
  document.getElementById("root")
);
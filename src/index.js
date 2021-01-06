import React from "react";
import ReactDOM from "react-dom";

// custom Bootstrap style
import "./custom.scss";

// for GraphCMS integration
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import "./index.css";
import App from "./App";

// just for development
import reportWebVitals from "./reportWebVitals";

const client = new ApolloClient({
  uri: "https://api-us-east-1.graphcms.com/v2/ckj2jtivtekmg01z50f7zb829/master"
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
  ,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
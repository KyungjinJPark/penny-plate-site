import gql from "graphql-tag";

const PRODUCTS_QUERY = gql`
query {
  allProducts {
    id
    itemNo
    description
    application
  }
}
`;

const FILTER_QUERY = gql`
query {
  __type(name: "Application") {
    enumValues {
      name
    }
  }
}
`;

const NEWS_QUERY = gql`
query {
  allRecentNews {
    id
    title
    postDate
    articleBody {
      text
    }
  }
}
`;

export { PRODUCTS_QUERY, FILTER_QUERY, NEWS_QUERY };
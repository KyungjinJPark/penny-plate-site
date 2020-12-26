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

export { PRODUCTS_QUERY, FILTER_QUERY };
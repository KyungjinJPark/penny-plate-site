import gql from "graphql-tag";

const PRODUCTS_QUERY = gql`
query {
  productsPlural {
    itemNo
    description
  }
}
`;

export default PRODUCTS_QUERY;
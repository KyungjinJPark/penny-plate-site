import gql from "graphql-tag";

const PRODUCTS_QUERY = gql`
query ProductQuery($application: [Application!], $productType: [ProductType!]){
  allProducts(where: {application_in: $application, productType_in: $productType}) 
  {
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
const PTYPE_QUERY = gql`
query {
  __type(name: "ProductType") {
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


export { PRODUCTS_QUERY, FILTER_QUERY, NEWS_QUERY, PTYPE_QUERY };
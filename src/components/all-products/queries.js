import gql from "graphql-tag";

const PRODUCTS_QUERY = gql`
query ProductQuery($application: [Application!], $productType: [ProductType!], $shape: [Shape!], $stock: [StockType!]){
  allProducts(where: {application_in: $application, productType_in: $productType, shape_in: $shape, stockType_in: $stock}) 
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
const SHAPE_QUERY = gql`
query {
  __type(name: "Shape") {
    enumValues {
      name
    }
  }
}
`;
const STOCK_QUERY = gql`
query {
  __type(name: "StockType") {
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


export { PRODUCTS_QUERY, FILTER_QUERY, NEWS_QUERY, PTYPE_QUERY, SHAPE_QUERY, STOCK_QUERY };
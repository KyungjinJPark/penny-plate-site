import gql from "graphql-tag";

const PRODUCTS_QUERY = gql`
query ProductQuery($application: [Application!], $productType: [ProductType!], $shape: [Shape!], $stock: [StockType!]){
  allProducts(where: {application_contains_some: $application, productType_in: $productType, shape_in: $shape, stockType_in: $stock}) 
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
const NEWITEMS_QUERY = gql`
query {
  allNewItems {
    id
    title
    image {
      url
    }
  }
}
`;
const NEWITEMINFO_QUERY = gql`
query NewItemInfoQuery($itemId: ID!) {
  newItems(where: {id: $itemId}) {
    title
    itemDescription {
      html
    }
    image {
      url
    }
  }
}
`;
//$itemId: String!
const FOCUS_PRODUCT_INFO_QUERY = gql`
query ProductInfoQuery($itemId: ID!){
  products(where: {id: $itemId}) 
  {
    application
    bottom
    caseCubeFt
    caseWeight
    depth
    hi
    itemNo
    orderQuantity
    palletWeight
    panCapacity
    pansPerCase
    productType
    rimStyle
    shape
    stockType
    ti
    topIn
    topOut
  }
}

`;

export { PRODUCTS_QUERY, FILTER_QUERY, PTYPE_QUERY, SHAPE_QUERY, STOCK_QUERY, FOCUS_PRODUCT_INFO_QUERY, NEWITEMS_QUERY, NEWITEMINFO_QUERY };
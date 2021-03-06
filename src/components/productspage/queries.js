import gql from "graphql-tag";

const PRODUCTS_QUERY = gql`
query ProductQuery($grabCount: Int!, $skipCount: Int!, $application: [Application!], $productType: [ProductType!], $shape: [Shape!], $stock: [StockType!], $keywords: String!, $itemNo: String!, $order: ProductsOrderByInput){
  allProducts(orderBy: $order, first: $grabCount, skip: $skipCount, where: {application_contains_some: $application, productType_in: $productType, shape_in: $shape, stockType_in: $stock, OR: [{description_contains: $keywords}, {itemNo: $itemNo}]}) 
  {
    id
    itemNo
    description
    application
    photos(first: 1) {
      url(
        transformation: {
          image: { resize: { width: 400, height: 400, fit: clip } },
          document: { output: { format: jpg } } 
        }
      )
    }
  }
  allProductsConnection(where: {application_contains_some: $application, productType_in: $productType, shape_in: $shape, stockType_in: $stock, OR: [{description_contains: $keywords}, {itemNo: $itemNo}]}) 
  {
    aggregate {
      count
    }
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
    images(first: 1) {
      url(
        transformation: {
          image: { resize: { width: 400, height: 400, fit: clip } },
          document: { output: { format: jpg } } 
        }
      )
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
    images {
      url(
        transformation: {
          image: { resize: { width: 700, height: 700, fit: clip } },
          document: { output: { format: jpg } } 
        }
      )
    }
  }
}
`;

const FOCUS_PRODUCT_INFO_QUERY = gql`
query ProductInfoQuery($itemId: ID!){
  products(where: {id: $itemId}) 
  {
    id
    itemNo
    description
    application
    bottom
    caseCubeFt
    caseWeight
    depth
    hi
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
    notices {
      html
      markdown
    }
    photos {
      url(
        transformation: {
          image: { resize: { width: 600, height: 600, fit: clip } },
          document: { output: { format: jpg } } 
        }
      )
    }
  }
}

`;

export { PRODUCTS_QUERY, FILTER_QUERY, PTYPE_QUERY, SHAPE_QUERY, STOCK_QUERY, FOCUS_PRODUCT_INFO_QUERY, NEWITEMS_QUERY, NEWITEMINFO_QUERY };
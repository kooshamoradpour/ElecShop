import { gql } from "@apollo/client";

// export const QUERY_USER = gql`
//   query user($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
//       thoughts {
//         _id
//         thoughtText
//         createdAt
//       }
//     }
//   }
// `;

export const QUERY_ME = gql`
  query Me {
    me {
      username
      cart {
        productId {
          _id
          name
          description
          image
          price
          stock
        }
        quantity
      }
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      _id
      name
      description
      image
      price
      stock
    }
  }
`;

export const GET_PRODUCT_BY_NAME = gql`
  query Product($name: String!) {
    product(name: $name) {
      _id
      name
      description
      image
      price
      stock
    }
  }
`;

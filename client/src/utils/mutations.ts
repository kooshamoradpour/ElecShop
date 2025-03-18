import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  # should we include isAdmin
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      user {
        username
        _id
      }
      token
    }
  }
`;

export const SAVE_PRODUCT_TO_CART = gql`
  mutation saveProductToCart($input: SaveProduct!) {
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
`;

export const REMOVE_PRODUCT_FROM_CART = gql`
  mutation RemoveProductFromCart($productId: ID!) {
    removeProductFromCart(productId: $productId) {
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

export const UPDATE_QUANTITY = gql`
  mutation UpdateQuantity($input: SaveProduct) {
    updateQuantity(input: $input) {
      cart {
        productId {
          _id
        }
        quantity
      }
    }
  }
`;

export const ADD_PRODUCT_TO_DB = gql`
  mutation AddProductToDB($input: InsertProductToDB) {
    addProductToDB(input: $input) {
      name
      description
      image
      price
      stock
    }
  }
`;


import gql from "graphql-tag";

const typeDefs = gql`
  type User {
    _id:ID!
    username: String!
    email: String!
    password: String!
    cart: [CartItem!]!
  }
  type Product {
    _id:ID!
    name: String!
    description: String!
    image: String!
    price: Float!
    stock: Int!
  }
  type CartItem {
    productId: Product! # single product id and its quantity
    quantity: Int!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input SaveProduct {
    productId: ID!      # product id to be stored in user cart
    quantity: Int!
  }
  input InsertProductToDB{ # input for when admin add products adds to database
    name: String!
    description: String!
    image: String!
    price: Float!
    stock: Int!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    # users: [User]
    # user(username: String!): User
    me: User
    product(name: String!): Product!
    getAllProducts: [Product!]
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveProductToCart(input: SaveProduct!): User # return the user with updated cart also saveProduct can take quantity from the display card client side
    removeProductFromCart(productId: ID!): User
    addProductToDB(input: InsertProductToDB): Product
    updateQuantity(input: SaveProduct): User
  }
`;

export default typeDefs;

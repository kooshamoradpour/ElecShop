import gql from "graphql-tag";

const typeDefs = gql`
  type User {
    # _id: ID!
    username: String!
    email: String!
    password: String!
    cart: Cart
  }
  type Product {
    productId: String!
    name: String!
    description: String!
    image: String!
    price: Float!
    stock: Int!
  }
  type CartItem {
    product: Product!
    quantity: Int!
  }
  type Cart {
    # _id: ID
    user: User!
    cartItems: [CartItem!] # can i use SaveProduct instead of Product
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input SaveProduct {
    productId: String!
    name: String!
    description: String!
    image: String!
    price: Float!
    stock: Int!
    quantity: Int!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    # users: [User]
    # user(username: String!): User
    me: User
    product(name:String!): Product!
    getAllProducts:[Product!]
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveProductToCart(input: SaveProduct!): User  # return the user with updated cart also saveProduct can take quantity from the display card client side
    removeProductFromCart(productId: String!): User
    addProductToDB(input: SaveProduct): Product
  }
`;

export default typeDefs;

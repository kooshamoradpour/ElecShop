import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    cart: Cart
  }
  type Product{
    productId: String!
    name: String!
    description: String!
    image: String!
    price: Float!
    stock: Int!
    # link: String!
}
type CartItem{
  product: Product!
  quantity: Int !
  
}
type Cart {
    _id: ID
    user: User!
    items: [CartItem]
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
}
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    # users: [User]
    # user(username: String!): User
    me: User
    product: Product
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveProductToCart(input: saveProduct!):User
    removeProductFromCart(productId: String!):User
    addProductToDB(input: saveProduct): Product
  }
`;

export default typeDefs;

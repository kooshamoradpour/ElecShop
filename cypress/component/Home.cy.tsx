import { mount } from "cypress/react";
import Home from "../../client/src/pages/Home"; // Adjust the path as per your project structure
import { MemoryRouter } from "react-router-dom"; // This allows you to wrap your component with Router for routing functionality
import { MockedProvider } from "@apollo/client/testing"; // This allows you to mock GraphQL queries for testing npm install 
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_NAME,
} from "../../client/src/utils/queries"; // Adjust the paths

// Mock data for the GraphQL queries
const mockAllProducts = {
  request: {
    query: GET_ALL_PRODUCTS,
  },
  result: {
    data: {
      getAllProducts: [
        {
          _id: "1",
          name: "Test Product 1",
          description: "This is a test product",
          price: 20,
          stock: 100,
          image: "https://via.placeholder.com/150",
        },
        {
          _id: "2",
          name: "Test Product 2",
          description: "This is another test product",
          price: 30,
          stock: 50,
          image: "https://via.placeholder.com/150",
        },
      ],
    },
  },
};

const mockSingleProduct = {
  request: {
    query: GET_PRODUCT_BY_NAME,
    variables: { name: "Test Product 1" },
  },
  result: {
    data: {
      product: {
        _id: "1",
        name: "Test Product 1",
        description: "This is a test product",
        price: 20,
        stock: 100,
        image: "https://via.placeholder.com/150",
      },
    },
  },
};

describe("Home Component", () => {
  it("should display a list of products", () => {
    mount(
      <MockedProvider mocks={[mockAllProducts]} addTypename={false}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </MockedProvider>
    );

    // Ensure loading state is not present
    cy.get(".loading-screen").should("not.exist");

    // Verify if the product list is rendered
    cy.get(".card").should("have.length", 2); // Ensure two cards (products) are rendered

    // Verify the first product name and price
    cy.get(".card-title").first().contains("Test Product 1");
    cy.get(".card-text").first().contains("$20");
  });

  it("should display a single product based on search query", () => {
    const searchQuery = "Test Product 1";

    // Simulate routing with query param for searching a product
    mount(
      <MockedProvider mocks={[mockSingleProduct]} addTypename={false}>
        <MemoryRouter initialEntries={[`/home?search=${searchQuery}`]}>
          <Home />
        </MemoryRouter>
      </MockedProvider>
    );

    // Ensure loading state is not present
    cy.get(".loading-screen").should("not.exist");

    // Verify the single product is rendered
    cy.get(".card-title").contains("Test Product 1");
    cy.get(".card-text").contains("$20");
  });
});

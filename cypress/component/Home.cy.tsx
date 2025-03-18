// Test the Home component
import Home from '../../client/src/pages/Home'

describe("Home Component", () => {
  beforeEach(() => {
    // Visit the page where the Home component is rendered
    cy.visit("/Home"); // Adjust the URL path if necessary
  });

  it("should render the sidebar", () => {
    // Check if the sidebar is rendered
    cy.get('.col-md-3').should('exist');
    cy.get('Sidebar').should('exist'); // Assuming Sidebar component has a defined class or unique tag
  });

  it("should render the sort buttons", () => {
    // Check if the sorting buttons exist
    cy.get('.custom-button').should('have.length', 4); // Assuming there are 4 buttons
    cy.get('.custom-button').contains('New').should('exist');
    cy.get('.custom-button').contains('Price ascending').should('exist');
    cy.get('.custom-button').contains('Price descending').should('exist');
    cy.get('.custom-button').contains('Rating').should('exist');
  });

  it("should render the product cards", () => {
    // Check if the product cards are rendered
    cy.get('.row-cols-md-3').find('.col').should('have.length', 3); // Assuming 3 products
  });

  it("should display product name, price, and description in the card", () => {
    // Check if each product card has the correct product name, price, and description
    cy.get('.card-title').first().should('contain.text', 'Product name 1');
    cy.get('.card-text').first().should('contain.text', 'Description');
    cy.get('.card-text').first().should('contain.text', '$0');
  });

  it("should simulate clicking on a sort button", () => {
    // Test the functionality when a sort button is clicked
    cy.get('.custom-button').contains('Price ascending').click();
    cy.url().should('include', 'sort=price-asc'); // Ensure the URL updates (you may want to change this based on your actual implementation)

    cy.get('.custom-button').contains('Price descending').click();
    cy.url().should('include', 'sort=price-desc'); // Ensure the URL updates (you may want to change this based on your actual implementation)

    cy.get('.custom-button').contains('Rating').click();
    cy.url().should('include', 'sort=rating'); // Ensure the URL updates (you may want to change this based on your actual implementation)
  });

  it("should render 'Product Image' placeholder in the card", () => {
    // Ensure that the placeholder for product images is rendered
    cy.get('.text-muted').should('contain.text', 'Product Image');
  });

  it("should render 'Add To Cart' button", () => {
    // Ensure the 'Add To Cart' button is present in the product card
    cy.get('.btn-primary').should('contain.text', 'Add To Cart');
  });
});
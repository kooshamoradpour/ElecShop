/// <reference types="cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    // Assuming you're running your app on a local server (e.g., localhost:3000).
    cy.visit('http://localhost:3000');
  });

  it('should display a list of products', () => {
    // Check if the page contains product cards
    cy.get('.card').should('have.length', 10); // Assuming you have 10 products

    // Check if the first product card contains the expected elements
    cy.get('.card').first().within(() => {
      cy.get('.card-title').should('contain', 'Apple MacBook Pro 13-inch');
      cy.get('.card-text').first().should('contain', '$1299.99');
    });
  });

  it('should display product details when search query is provided', () => {
    // Assume the search query is "Apple MacBook Pro 13-inch"
    cy.visit('http://localhost:3000?search=Apple%20MacBook%20Pro%2013-inch');

    // Check that the product details are displayed correctly
    cy.get('.card').within(() => {
      cy.get('.card-title').should('contain', 'Apple MacBook Pro 13-inch');
      cy.get('.card-text').first().should('contain', '$1299.99');
      cy.get('.card-text').last().should('contain', 'The Apple MacBook Pro 13-inch comes with an Apple M1 chip, 8GB RAM, and 256GB SSD storage. A sleek and powerful laptop for professionals.');
    });
  });

  it('should add a product to the cart when the "Add To Cart" button is clicked', () => {
    // Check if the "Add To Cart" button exists
    cy.get('button.btn.btn-primary').first().should('be.visible');

    // Click the first "Add To Cart" button
    cy.get('button.btn.btn-primary').first().click();

    // Assuming your cart is displayed in some way, e.g., a notification or cart page
    cy.get('.cart-notification').should('be.visible');
  });

  it('should filter products based on price', () => {
    // Click on the "Price ascending" button
    cy.get('.filter-button').contains('Price ascending').click();

    // Check if products are sorted by price (you can add more sophisticated checks here)
    cy.get('.card')
      .first()
      .within(() => {
        cy.get('.card-title').should('contain', 'Samsung 1TB SSD 990 PRO'); // Check if the cheapest product is first
      });
  });

  it('should display a loading screen while data is being fetched', () => {
    // Assuming a loading screen component exists
    cy.get('.loading-screen').should('be.visible');
  });
});

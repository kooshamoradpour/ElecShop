import { useState } from "react";

const Cart = () => {
  // Placeholder cart products
  const productsInCart = [
    { id: 1, name: "Product name 1", price: 20, description: "Description", quantity: 1 },
    { id: 2, name: "Product name 2", price: 35, description: "Description", quantity: 1 },
    { id: 3, name: "Product name 3", price: 15, description: "Description", quantity: 2 },
  ];

  // Calculate total price
  const calculateTotal = () => {
    return productsInCart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  // Function to render the product cards in the cart
  const renderCartItems = () => {
    return productsInCart.map((product) => (
      <div className="card mb-4" key={product.id}>
        <div className="row g-0">
          {/* Image Section */}
          <div className="col-md-3">
            <div style={{
              height: "240px",
              width: "240px",
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <span className="text-muted">Product Image</span>
            </div>
          </div>

          {/* Product Information Section */}
          <div className="col-md-9">
            <div className="card-body">
              {/* Product Name */}
              <h5 className="card-title mt-2">{product.name}</h5>

              {/* Product Price (Bold) */}
              <p className="card-text fw-bold">${product.price}</p>

              {/* Product Description */}
              <p className="card-text">{product.description}</p>

              {/* Quantity Selector */}
              <div className="d-flex align-items-center">
                <label className="mr-3">Quantity:</label>
                <button className="btn btn-sm btn-outline-secondary">-</button>
                <span className="mx-2">{product.quantity}</span>
                <button className="btn btn-sm btn-outline-secondary">+</button>
              </div>

              {/* Remove Item Button */}
              <button className="btn btn-danger mt-2">
                Remove from Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container mt-5">
      {/* Page Heading */}
      <h1>Your Cart</h1>

      {/* Cart Items */}
      <div className="cart-items">
        {renderCartItems()}
      </div>

      {/* Total Price and Checkout Button - Side by Side */}
      <div className="d-flex justify-content-end align-items-center mt-4">
        {/* Total Price (Bold) */}
        <h3 className="mr-3 fw-bold">Total: ${calculateTotal()}</h3>

        {/* Proceed to Checkout Button */}
        <button className="btn btn-primary proceed-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;

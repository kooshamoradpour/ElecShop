import { useState, ReactNode } from "react";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [sortOption, setSortOption] = useState("new");

  // Placeholder
  const products = [
    { id: 1, name: "Product name 1", price: 0, description: "Description" },
    { id: 2, name: "Product name 2", price: 0, description: "Description" },
    { id: 3, name: "Product name 3", price: 0, description: "Description" },
  ];

  // Create product cards using forEach loop
  const getProductCards = () => {
    const productCards: ReactNode[] = [];
    
    products.forEach((product) => {
      productCards.push(
        <div className="col" key={product.id}>
          <div className="card h-100">
            <div style={{ height: "240px", backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="text-muted">Product Image</span>
            </div>
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">${product.price}</p>
              <p className="card-text">{product.description}</p>
            </div>
          </div>
        </div>
      );
    });
    
    return productCards;
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        
        <div className="col-md-3">
          <Sidebar />
        </div>

       
        <div className="col-md-9">
          
          <div className="sort-container">
            <div className="button-group">
              <button className="custom-button">New</button>
              <button className="custom-button">Price ascending</button>
              <button className="custom-button">Price descending</button>
              <button className="custom-button">Rating</button>
            </div>
          </div>

          
          <div className="card mb-4">
            <div className="row g-0">
              <div className="col-md-12">
                <div className="card-body">
                  <div style={{ height: "240px", backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="text-muted">Product Image</span>
                  </div>
                  <h5 className="card-title mt-2">Product name</h5>
                  <p className="card-text">$0</p>
                  <p className="card-text">Description</p>
                  <button className="btn btn-primary">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {getProductCards()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import '../styles/home.css';
import { useLocation } from "react-router-dom";

import Auth from "../utils/auth.js";
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../utils/queries";
import { IProduct } from "../model/Product.js";

const Home = () => {
  const [allProduct, SetAllProduct] = useState<IProduct[]>([{
    id:"",
    name:"",
    description:"",
    image:"",
    price:0,
    stock:0
  }])

  const {data,loading} = useQuery(GET_ALL_PRODUCTS);
 
  useEffect(() => {
    if (loading) {
      console.log('loading .....')
    }
  },[loading])

  useEffect(() => {
   if(data && data.getAllProducts){
    SetAllProduct(data.getAllProducts)
   } 
  },[data])

  useEffect(() => {
    allProduct.map((element:IProduct) =>  console.log(element.name))
  }, [allProduct])


  return (
    <div className="container-fluid mt-3">
      <div className="row">
        
        <div className="col-md-3">
          <Sidebar />
        </div>

       
        <div className="col-md-9">
          
          <div className="sort-container">
            <div className="filter-buttons">
              <button className="filter-button active">New</button>
              <button className="filter-button">Price ascending</button>
              <button className="filter-button">Price descending</button>
              <button className="filter-button">Rating</button>
            </div>
          </div>

          
          <div className="card mb-4">
            <div className="row g-0">
              <div className="col-md-12">
                <div className="card-body">
                  <div style={{ height: "240px", backgroundImage: `url('${allProduct[0].image}')`, backgroundPosition:"center" ,backgroundRepeat:"no-repeat",backgroundSize:"contain", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="text-muted">
                    </span>
                  </div>
                  <h5 className="card-title mt-2">{allProduct[0].name}</h5>
                  <p className="card-text">${allProduct[0].price}</p>
                  <p className="card-text">{allProduct[0].description}</p>

                  {/* conditionally rendering add to cart button */}
                  { Auth.loggedIn() && 
                  <button className="btn btn-primary">
                    Add To Cart
                  </button>
                  }
                </div>
              </div>
            </div>
          </div>

          
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {/* slice(1) is gonna start from second index leaving 0 index to be styled differently*/}
            {allProduct.slice(1).map((product) => (
               <div className="col" key={product.id}>
               <div className="card h-100">
               <div style={{ height: "240px", backgroundImage: `url('${product.image}')`, backgroundPosition:"center" ,backgroundRepeat:"no-repeat",backgroundSize:"contain", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  </div>
                 <div className="card-body">
                   <h5 className="card-title">{product.name}</h5>
                   <p className="card-text">${product.price}</p>
                   <p className="card-text">{product.description}</p>
                 </div>
                 { Auth.loggedIn() && 
                  <button className="btn btn-primary">
                    Add To Cart
                  </button>
                  }
               </div>
             </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

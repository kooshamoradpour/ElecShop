import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/home.css";
import { useLocation } from "react-router-dom";

import Auth from "../utils/auth.js";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_NAME,
  QUERY_ME,
} from "../utils/queries";
import { IProduct } from "../model/Product.js";
import { SAVE_PRODUCT_TO_CART } from "../utils/mutations.js";

const Home = () => {
  const [allProduct, setAllProduct] = useState<IProduct[]>([
    {
      _id: "",
      name: "",
      description: "",
      image: "",
      price: 0,
      stock: 0,
    },
  ]);
  // QUERIES
  const [productData, setProductData] = useState<IProduct | null>(null);

  const { data, loading } = useQuery(GET_ALL_PRODUCTS);

  //MUTATIONS
  const [saveProductToCart] = useMutation(SAVE_PRODUCT_TO_CART);

  useEffect(() => {
    if (loading) {
      console.log("loading .....");
    }
  }, [loading]);

  useEffect(() => {
    if (data && data.getAllProducts) {
      setAllProduct(data.getAllProducts);
    }
  }, [data]);

  // useEffect(() => {
  //   allProduct.map((element:IProduct) =>  console.log(element))
  // }, [allProduct])

  // handle search query

  const location = useLocation();

  const getQueryParam = () => {
    const param = new URLSearchParams(location.search);
    return param.get("search");
  };

  const productNameFromQuery = getQueryParam();

  // logging search to console
  useEffect(() => {
    console.log(productNameFromQuery);
  }, [productData]);

  const { data: singleProduct, loading: singleProductLoading } = useQuery(
    GET_PRODUCT_BY_NAME,
    {
      variables: { name: productNameFromQuery },
      skip: !productNameFromQuery,
    }
  );

  useEffect(() => {
    if (singleProduct && singleProduct.product) {
      setProductData(singleProduct.product);
    }
  }, [singleProduct]);

  // const dataToDisplay = productData ? productData : allProduct;

  // handle saving to cart function

  const handleSaveToCart = async (productId: string) => {
    const quantity = 1;

    const prodToSave = { productId, quantity };
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      // console.log(prodToSave);
      
      await saveProductToCart({
        variables: {
          input: { ...prodToSave },
        
          refetchQueries: [
            {
              query: QUERY_ME,
              context: {
                headers: {
                  Authorization: `Bearer ${Auth.loggedIn() ? Auth.getToken() : ""}`
                },
              },
            },
          ],
        },
      });
    } catch (error) {console.error(error)}
  };

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
          {productNameFromQuery && productData ? (
            <div className="card mb-4">
              <div className="row g-0">
                <div className="col-md-12">
                  <div className="card-body">
                    <div
                      style={{
                        height: "240px",
                        backgroundImage: `url('${productData.image}')`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span className="text-muted"></span>
                    </div>
                    <h5 className="card-title mt-2">{productData.name}</h5>
                    <p className="card-text">${productData.price}</p>
                    <p className="card-text">{productData.description}</p>

                    {/* conditionally rendering add to cart button */}
                    {Auth.loggedIn() && (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleSaveToCart(productData._id)}
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="card mb-4">
                <div className="row g-0">
                  <div className="col-md-12">
                    <div className="card-body">
                      <div
                        style={{
                          height: "240px",
                          backgroundImage: `url('${allProduct[0].image}')`,
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "contain",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span className="text-muted"></span>
                      </div>
                      <h5 className="card-title mt-2">{allProduct[0].name}</h5>
                      <p className="card-text">${allProduct[0].price}</p>
                      <p className="card-text">{allProduct[0].description}</p>

                      {/* conditionally rendering add to cart button */}
                      {Auth.loggedIn() && (
                        <button
                          className="btn btn-primary"
                          onClick={() => handleSaveToCart(allProduct[0]._id)}
                        >
                          Add To Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row row-cols-1 row-cols-md-3 g-4">
                {/* slice(1) is gonna start from second index leaving 0 index to be styled differently*/}
                {allProduct.slice(1).map((product) => (
                  <div className="col" key={product._id}>
                    <div className="card h-100">
                      <div
                        style={{
                          height: "240px",
                          backgroundImage: `url('${product.image}')`,
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "contain",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      ></div>
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">${product.price}</p>
                        <p className="card-text">{product.description}</p>
                      </div>
                      {Auth.loggedIn() && (
                        <button
                          className="btn btn-primary"
                          onClick={() => handleSaveToCart(product._id)}
                        >
                          Add To Cart
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

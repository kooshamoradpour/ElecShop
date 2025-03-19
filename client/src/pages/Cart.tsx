import { useEffect, useState } from "react";
import { User } from "../model/User";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth.js";
import {
  REMOVE_PRODUCT_FROM_CART,
  UPDATE_QUANTITY,
} from "../utils/mutations.js";

const Cart = () => {
  // Calculate total price
  const calculateTotal = () => {
    return userData.cart.reduce((total, product) => total + product.productId.price * product.quantity, 0).toFixed(2);
  };

  const [userData, setUserData] = useState<User>({
    cart: [],
  });

  const [UpdateQuantity] = useMutation(UPDATE_QUANTITY);
  const [RemoveProductFromCart] = useMutation(REMOVE_PRODUCT_FROM_CART);

  const { data } = useQuery(QUERY_ME, {
    context: {
      headers: {
        Authorization: `Bearer ${Auth.loggedIn() ? Auth.getToken() : ""}`,
      },
    },
  });
  // setting data to use state
  useEffect(() => {
    if (data && data.me) {
      setUserData(data.me);
    }
  }, [data]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  // removing from cart
  const handleRemoveFromCart = async (productId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await RemoveProductFromCart({
        variables: { productId },
        refetchQueries: [
          {
            query: QUERY_ME,
            context: {
              headers: {
                Authorization: `Bearer ${
                  Auth.loggedIn() ? Auth.getToken() : ""
                }`,
              },
            },
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCartQuantChange = async (id: string, input: string) => {

    const token = Auth.loggedIn() ? Auth.getToken(): null;

    if(!token){
      return false;
    }

    // const prod = userData.cart.find((elem) => { curlys covering elem.productId._id === id was the issue took 3 hrs
    //   elem.productId._id === id
    // });
    const prod = userData.cart.find((elem) => 
      elem.productId._id === id
    );
    if (prod) {
      let newQuant = prod.quantity;

      if (input === "increment" && prod.quantity < prod.productId.stock ) {
        newQuant += 1;
      } else if (input === "decrement" && prod.quantity > 1) {
        newQuant -= 1;
      }
      try {
        await UpdateQuantity({
          variables: { input: { productId: id, quantity: newQuant } },
          refetchQueries:[
            {
              query:QUERY_ME,
              context:{
                headers:{
                  Authorization: `Bearer ${
                  Auth.loggedIn() ? Auth.getToken() : ""
                }`
                }
              }
            }
          ]
        });
      } catch (error) {console.error(error)}
    }
  };

  // Function to render the product cards in the cart
  const renderCartItems = () => {
    return userData.cart.map((product) => (
      <div className="card mb-4" key={product.productId._id}>
        <div className="row g-0">
          {/* Image Section */}
          <div className="col-md-3">
            <div
              style={{
                height: "240px",
                width: "240px",
                backgroundImage: `url('${product.productId.image}')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></div>
          </div>

          {/* Product Information Section */}
          <div className="col-md-9">
            <div className="card-body ml-1">
              {/* Product Name */}
              <h5 className="card-title mt-2">
                {product.productId.name} × {product.quantity}
              </h5>

              {/* Product Price (Bold) */}
              <p className="card-text fw-bold">${product.productId.price}</p>

              {/* Product Description */}
              <p className="card-text">{product.productId.description}</p>

              {/* Quantity Selector */}

              <div className="d-flex align-items-center">
                <label className="mr-3">Quantity:</label>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => {
                    handleUpdateCartQuantChange(
                      product.productId._id,
                      "decrement"
                    );
                  }}
                >
                  -
                </button>
                <span className="mx-2">{product.quantity}</span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => {
                    handleUpdateCartQuantChange(
                      product.productId._id,
                      "increment"
                    );
                  }}
                >
                  +
                </button>
              </div>

              {/* Remove Item Button */}
              <button
                className="btn btn-danger mt-2"
                onClick={() => handleRemoveFromCart(product.productId._id)}
              >
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
      <div className="cart-items">{renderCartItems()}</div>

      {/* Total Price and Checkout Button - Side by Side */}
      <div className="d-flex justify-content-end align-items-center mt-4 button-container">
        {/* Total Price (Bold) */}
        <h3 className="mr-3 fw-bold">Total:{calculateTotal()} </h3>
        {/* Proceed to Checkout Button */}
        { calculateTotal() === '0.00' ? 
          <button  className="btn btn-warning text-dark" disabled >Proceed to Checkout</button>
        :
          <button  className="btn btn-success" >Proceed to Checkout</button>
        } 
      </div>
    </div>
  );
};

export default Cart;

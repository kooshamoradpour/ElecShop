import { useEffect, useState } from "react";
import { User } from "../model/User.js";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries.js";
import Auth from "../utils/auth.js";
import {
  REMOVE_PRODUCT_FROM_CART,
  UPDATE_QUANTITY,

} from "../utils/mutations.js";

const Cart = () => {
  // State for managing payment modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  // State for user data
  const [userData, setUserData] = useState<User>({
    cart: [],
  });

  const [UpdateQuantity] = useMutation(UPDATE_QUANTITY);
  const [RemoveProductFromCart] = useMutation(REMOVE_PRODUCT_FROM_CART);
  // const [ClearCart] = useMutation(CLEAR_CART); // Remove for now

  const { data } = useQuery(QUERY_ME, {
    context: {
      headers: {
        Authorization: `Bearer ${Auth.loggedIn() ? Auth.getToken() : ""}`,
      },
    },
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    // console.log(data);
    
    if (data && data.me) {
      setUserData(data.me);
    }
  }, [data]);

  const calculateTotal = () => {
    return userData.cart.reduce(
      (total, product) => total + product.productId.price * product.quantity,
      0
    ).toFixed(2);
  };

  // Removing from cart
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
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    const prod = userData.cart.find(
      (elem) => elem.productId._id === id
    );
    if (prod) {
      let newQuant = prod.quantity;
      if (input === "increment" && prod.quantity < prod.productId.stock) {
        newQuant += 1;
      } else if (input === "decrement" && prod.quantity > 1) {
        newQuant -= 1;
      }
      try {
        await UpdateQuantity({
          variables: { input: { productId: id, quantity: newQuant } },
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
    }
  };

  // Handle payment form submission
  const handlePayment = async () => {
    if (!cardNumber || !expiryDate || !cvv) {
      alert("Please fill in all payment details.");
      return;
    }
    alert("Payment successful!");

    // Directly clear the cart in the frontend state after payment
    setUserData({ ...userData, cart: [] });

    // Close the payment modal
    setShowPaymentModal(false);
  };

  // Render cart items
  const renderCartItems = () => {
    return userData.cart.map((product) => (
      <div className="card mb-4" key={product.productId._id}>
        <div className="row g-0">
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
          <div className="col-md-9">
            <div className="card-body ml-1">
              <h5 className="card-title mt-2">
                {product.productId.name} × {product.quantity}
              </h5>
              <p className="card-text fw-bold">${product.productId.price}</p>
              <p className="card-text">{product.productId.description}</p>

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
      <h1>Your Cart</h1>
      <div className="cart-items">{renderCartItems()}</div>

      <div className="d-flex justify-content-end align-items-center mt-4 button-container">
        <h3 className="mr-3 fw-bold">Total: ${calculateTotal()}</h3>
        {calculateTotal() === '0.00' ? (
          <button className="btn btn-warning text-dark" disabled>
            Proceed to Checkout
          </button>
        ) : (
          <button
            className="btn btn-success"
            onClick={() => setShowPaymentModal(true)}
          >
            Proceed to Checkout
          </button>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setShowPaymentModal(false)}
        >
          <div
            className="modal-content p-4"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              minWidth: "300px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4>Enter Payment Details</h4>
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <input
              type="month"
              className="form-control mb-2"
              placeholder="Expiry Date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
            <input
              type="number"
              className="form-control mb-2"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
            <button className="btn btn-success mt-2" onClick={handlePayment}>
              Pay Now
            </button>
            <button
              className="btn btn-secondary mt-2 ml-2"
              onClick={() => setShowPaymentModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

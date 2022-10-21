import React from "react";
import "../../styles/Products.css";
import { Link as LinkRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../features/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function ProductCard(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.logged.user);
  const dispatch = useDispatch();
  return (
    <div key={props.id} className="card-p">

      <img src={props.photo} alt="Product" />
      <div className="info">
        <LinkRouter to={`/products/${props.id}`} className="name">
          {props.name}
        </LinkRouter>
        <p>{props.category}</p>
        <div className="price-button">
          <p>${props.price}</p>
          <button
            onClick={() => {
              if (user) {
                dispatch(
                  addProduct({
                    id: props.id,
                    photo: props.photo,
                    name: props.name,
                    price: props.price,
                    stock: props.stock,
                    quantity: 1,
                  })
                );
                toast.success(`Product added to cart`, {
                  style: {
                    borderRadius: ".5rem",
                    background: "#3f3d56",
                    color: "aliceblue",
                  },
                });
              } else {
                toast.error(`Log in `, {
                  style: {
                    borderRadius: ".5rem",
                    background: "#3f3d56",
                    color: "aliceblue",
                  },
                });
                navigate("/signin", { replace: true });
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="bi bi-cart-plus"
              viewBox="0 0 16 16"
            >
              <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

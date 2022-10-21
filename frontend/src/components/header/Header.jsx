import React, { useState } from "react";
import "../../styles/header.css";
import Logo from "./Logo";
import { Link as LinkRouter } from "react-router-dom";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import SignOut from "../auth/SignOut";

function Header() {
  const [modal, setModal] = useState(false);
  const [burger, setBurger] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.logged.user);

  return (
    <header className="header-container">
      <div className="logo-title">
        <LinkRouter to={"/"}>
          <Logo />
        </LinkRouter>
        <LinkRouter to={"/"}>
          <h2>MindGrow</h2>
        </LinkRouter>
      </div>
      <div className="header-links">
      <LinkRouter to="/">Home</LinkRouter>
        <LinkRouter to="/products">Products</LinkRouter>
        <LinkRouter to="whymindgrow">Why MindGrow?</LinkRouter>
        {(user && user.role === "admin") ? <LinkRouter to="/adminpanel">Admin Panel</LinkRouter> : null}
      </div>
      <div className="header-info">
        {burger && (
          <div className="header-burger">
            <button className="close" onClick={() => setBurger(!burger)}>
              X
            </button>
            <LinkRouter onClick={() => setBurger(!burger)} to="/">
              Home
            </LinkRouter>
            <LinkRouter onClick={() => setBurger(!burger)} to="/products">
              Products
            </LinkRouter>
            <LinkRouter onClick={() => setBurger(!burger)} to="whymindgrow">
              Why MindGrow?
            </LinkRouter>
            {(user && user.role === "admin") ? (
              <LinkRouter onClick={() => setBurger(!burger)} to="/adminpanel">
                Admin Panel
              </LinkRouter>
            ) : null}
          </div>
        )}
        <button className="burger-btn" onClick={() => setBurger(!burger)}>
          <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
          </svg>
        </button>
        <div className="container-b">
          <Cart />
          <div>
            <button className="UI-box" onClick={() => setModal(!modal)}>
              {!user ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
              ) : (
                <img src={user.photo} alt="user" />
              )}
            </button>
            {modal && (
              <div className="container-sign" onClick={() => setModal(!modal)}>
                {user ? (
                  <>
                    <LinkRouter to={`/profile/${user.id}`}>Profile</LinkRouter>
                    <SignOut />
                  </>
                ) : (
                  <>
                    <LinkRouter to="/signup">Sign Up</LinkRouter>
                    <LinkRouter to="/signin">Sign In</LinkRouter>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

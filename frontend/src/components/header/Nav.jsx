import React from 'react'
import '../../styles/header.css'
import { Link as LinkRouter } from "react-router-dom";

function Nav() {
  const pages = [
    { id: "_products", to: "/products", title: "Products" },
    { id: "_whymindgrow", to: "/whymindgrow", title: "Why MindGrow?" }];
  return (
    <>
      {pages.map((link) => (
          <LinkRouter className="navlink" to={link.to} key={link.id}>
            {link.title}
          </LinkRouter>
        ))}
    
    
    
    </>
  )
}

export default Nav
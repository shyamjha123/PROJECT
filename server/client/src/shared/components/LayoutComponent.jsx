import React from "react";
import CartModal from "../modals/CartModal";

import LoginSignupModal from "../modals/LoginSignupModal";
import FooterComponent from "./FooterComponent";
import NavbarComponent from "./NavbarComponent";

const LayoutComponent = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 1 }}>
        <NavbarComponent />
        <LoginSignupModal />
        <CartModal />
        {children}
      </div>
      <FooterComponent />
    </div>
  );
};

export default LayoutComponent;

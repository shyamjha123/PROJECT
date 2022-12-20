import React from "react";
import CartModal from "../modals/CartModal";
import FooterComponent from "./FooterComponent";
import NavbarComponent from "./NavbarComponent";
import UserSidebarComponent from "./UserSidebarComponent";

const UserLayoutComponent = ({ children }) => {
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
        <CartModal />
        <div className="mx-4 mt-24 md:mx-12 md:mt-32 lg:mt-24 flex flex-col md:flex-row">
          <UserSidebarComponent />
          {/* All Children pass from here */}
          {children}
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default UserLayoutComponent;

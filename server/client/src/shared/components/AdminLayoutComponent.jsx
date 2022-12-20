import React from "react";
import FooterComponent from "src/shared/components/FooterComponent";

import AdminNavbarComponent from "./AdminNavbarComponent";
import AdminSidebarComponent from "./AdminSidebarComponent";

const AdminLayoutComponent = ({ children }) => {
  return (
    <>
      <AdminNavbarComponent />
      <section className="flex bg-gray-100">
        <AdminSidebarComponent />
        <div className="w-full md:w-11/12 h-full">
          {/* All Children pass from here */}
          {children}
        </div>
      </section>
      <FooterComponent />
    </>
  );
};

export default AdminLayoutComponent;

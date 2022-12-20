import moment from "moment/moment";
import React from "react";

const FooterComponent = () => {
  return (
    <footer
      style={{ background: "#303031", color: "#87898A" }}
      className="z-10 py-6 px-4 md:px-12 text-center"
    >
      Develop & Design waqas © Copyright {moment().format("YYYY")}
    </footer>
  );
};

export default FooterComponent;

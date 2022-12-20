import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";

import { loginSignupModalToggle } from "src/redux/slices/LayoutSlice";
import LoginComponent from "src/shared/components/LoginComponent";
import SignupCompoent from "src/shared/components/SignupComponent";

const LoginSignupModal = () => {
  const [modalTitle, setModalTitle] = useState("Create an account");
  const [isLoginModal, setIsLoginModal] = useState(true);

  const isLoginSignupModalOpen = useSelector(
    state => state.layout.loginSignupModal
  );
  const dispatch = useDispatch();

  const changeLoginSignup = () => {
    if (isLoginModal) {
      setIsLoginModal(false);
      setModalTitle("Login");
    } else {
      setIsLoginModal(true);
      setModalTitle("Create an account");
    }
  };

  const modalClose = () => {
    dispatch(loginSignupModalToggle(false));
  };

  return ReactDOM.createPortal(
    <>
      {/* Back Overlay  */}
      <div
        className={` ${
          isLoginSignupModalOpen ? "" : "hidden"
        } fixed top-0 z-40 w-full h-screen bg-black opacity-50 cursor-pointer`}
      ></div>
      {/* Signup Login Component Render */}
      <section
        className={` ${
          isLoginSignupModalOpen ? "" : "hidden"
        } fixed z-40 inset-0 my-8 md:my-20 flex items-start justify-center overflow-auto`}
      >
        <div
          style={{ maxHeight: "35rem", overflowY: "auto" }}
          className="w-11/12 md:w-3/5 lg:w-2/4 relative space-y-4 bg-white p-6 md:px-12 md:py-6"
        >
          {isLoginModal ? <LoginComponent /> : <SignupCompoent />}
          <div className="flex items-center space-x-2">
            <span className="border-b border-gray-500 w-full" />
            <span className="font-medium">or</span>
            <span className="border-b border-gray-500 w-full" />
          </div>
          <div
            onClick={changeLoginSignup}
            style={{ color: "#303031", border: "1px solid #303031" }}
            className="px-4 py-2 font-medium text-center cursor-pointer"
          >
            {modalTitle}
          </div>
          {/*  Modal Close Button */}
          <div className="absolute top-0 right-0 mx-4">
            <svg
              onClick={modalClose}
              className="w-6 h-6 cursor-pointer"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </section>
    </>,
    document.getElementById("root")
  );
};

export default LoginSignupModal;

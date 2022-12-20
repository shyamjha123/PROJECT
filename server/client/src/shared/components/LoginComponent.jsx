import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authUserAction } from "src/redux/slices/AuthSlice";
import { loginSignupModalToggle } from "src/redux/slices/LayoutSlice";
import { loginReq } from "../apiCall/authReq";

const LoginComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    error: false,
    loading: true,
  });
  const dispatch = useDispatch();

  const alert = msg => <div className="text-xs text-red-500">{msg}</div>;

  const formSubmit = async () => {
    try {
      setIsLoading(true);
      let { data: responseData } = await loginReq({
        email: data.email,
        password: data.password,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
        });
      } else if (responseData.token) {
        setData({ email: "", password: "", loading: false, error: false });
        localStorage.setItem("jwt", JSON.stringify(responseData));
        dispatch(authUserAction(responseData));
        dispatch(loginSignupModalToggle(false));
      }
    } catch (error) {
      setData({
        ...data,
        loading: false,
        error: "something went wrong try later",
        password: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-center text-2xl mb-6">Login</div>

      <form className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name">
            Username or email address
            <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={e => {
              setData({ ...data, email: e.target.value, error: false });
            }}
            value={data.email}
            type="text"
            id="name"
            className={`${
              !data.error ? "" : "border-red-500"
            } px-4 py-2 focus:outline-none border`}
          />
          {!data.error ? "" : alert(data.error)}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">
            Password<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={e => {
              setData({ ...data, password: e.target.value, error: false });
            }}
            value={data.password}
            type="password"
            id="password"
            className={`${
              !data.error ? "" : "border-red-500"
            } px-4 py-2 focus:outline-none border`}
          />
          {!data.error ? "" : alert(data.error)}
        </div>
        <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
          <div>
            <input
              type="checkbox"
              id="rememberMe"
              className="px-4 py-2 focus:outline-none border mr-1"
            />
            <label htmlFor="rememberMe">
              Remember me<span className="text-sm text-gray-600">*</span>
            </label>
          </div>
          <a className="block text-gray-600" href="/">
            Lost your password?
          </a>
        </div>
        <div
          onClick={formSubmit}
          style={{ background: "#303031" }}
          className="font-medium px-4 py-2 text-white text-center cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "loading..." : "Login"}
        </div>
      </form>
    </>
  );
};

export default LoginComponent;

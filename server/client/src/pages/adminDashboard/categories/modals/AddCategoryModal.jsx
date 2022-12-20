import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom";

import { getCategories } from "src/redux/slices/CategorySlice";
import { createCategory, getAllCategory } from "src/shared/apiCall/category";

const AddCategoryModal = ({ isAddCategoryModal, setIsAddCategoryModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [fData, setFdata] = useState({
    cName: "",
    cDescription: "",
    cImage: "",
    cStatus: "Active",
    success: false,
    error: false,
  });

  // alert
  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  if (fData.error || fData.success) {
    setTimeout(() => {
      setFdata({ ...fData, success: false, error: false });
    }, 2000);
  }

  const fetchData = async () => {
    let { data: responseData } = await getAllCategory();
    if (responseData.Categories) {
      dispatch(getCategories(responseData.Categories));
    }
  };

  // submit form
  const submitForm = async e => {
    // Reset and prevent the form
    e.preventDefault();
    e.target.reset();
    //    first check if image is not selected
    if (!fData.cImage) {
      return setFdata({ ...fData, error: "Please upload a category image" });
    }

    try {
      setIsLoading(true);

      let { data: responseData } = await createCategory(fData);
      if (responseData.success) {
        fetchData();
        setFdata({
          ...fData,
          cName: "",
          cDescription: "",
          cImage: "",
          cStatus: "Active",
          success: responseData.success,
          error: false,
        });

        setTimeout(() => {
          setFdata({
            ...fData,
            cName: "",
            cDescription: "",
            cImage: "",
            cStatus: "Active",
            success: false,
            error: false,
          });
        }, 2000);
      } else if (responseData.error) {
        setFdata({ ...fData, success: false, error: responseData.error });
        setTimeout(() => {
          return setFdata({ ...fData, error: false, success: false });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <>
      {/* Black Overlay */}
      <div
        className={`${
          isAddCategoryModal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          isAddCategoryModal ? "" : "hidden"
        } fixed inset-0 m-4  flex items-center z-30 justify-center`}
      >
        <div className="relative bg-white w-12/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4  overflow-y-auto px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Add Category
            </span>
            {/* Close Modal */}
            <span
              style={{ background: "#303031" }}
              onClick={e => setIsAddCategoryModal(false)}
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          {fData.error ? alert(fData.error, "red") : ""}
          {fData.success ? alert(fData.success, "green") : ""}
          <form className="w-full" onSubmit={e => submitForm(e)}>
            <div className="flex flex-col space-y-1 w-full py-4">
              <label htmlFor="name">Category Name</label>
              <input
                onChange={e =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    cName: e.target.value,
                  })
                }
                value={fData.cName}
                className="px-4 py-2 border focus:outline-none"
                type="text"
              />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label htmlFor="description">Category Description</label>
              <textarea
                onChange={e =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    cDescription: e.target.value,
                  })
                }
                value={fData.cDescription}
                className="px-4 py-2 border focus:outline-none"
                name="description"
                id="description"
                cols={5}
                rows={5}
              />
            </div>
            {/* Image Field & function */}
            <div className="flex flex-col space-y-1 w-full">
              <label htmlFor="name">Category Image</label>
              <input
                accept=".jpg, .jpeg, .png"
                onChange={e => {
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    cImage: e.target.files[0],
                  });
                }}
                className="px-4 py-2 border focus:outline-none"
                type="file"
              />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label htmlFor="status">Category Status</label>
              <select
                name="status"
                onChange={e =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    cStatus: e.target.value,
                  })
                }
                className="px-4 py-2 border focus:outline-none"
                id="status"
              >
                <option name="status" value="Active">
                  Active
                </option>
                <option name="status" value="Disabled">
                  Disabled
                </option>
              </select>
            </div>
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
              <button
                style={{ background: "#303031" }}
                type="submit"
                className="bg-gray-800 text-gray-100 rounded-full text-lg font-medium py-2"
                disabled={isLoading}
              >
                {isLoading ? "loading..." : "Create category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,

    document.getElementById("root")
  );
};

export default AddCategoryModal;

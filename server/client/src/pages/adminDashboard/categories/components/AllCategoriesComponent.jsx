import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "src/redux/slices/CategorySlice";

import { deleteCategory, getAllCategory } from "src/shared/apiCall/category";
import EditCategoryModal from "../modals/EditCategoryModal";
import CategoryTableComponent from "./CategoryTableComponent";

const AllCategoriesComponent = () => {
  const [isloading, setIsLoading] = useState(false);
  const [isEditCategory, setIsEditCategory] = useState(false);
  const [editCategoryData, setEditCategory] = useState({});

  const allCategories = useSelector(state => state.category.allCategories);

  const dispatch = useDispatch();

  //   fetch category
  const fetchData = async () => {
    setIsLoading(true);
    let { data: responseData } = await getAllCategory();
    setTimeout(() => {
      if (responseData && responseData.Categories) {
        dispatch(getCategories(responseData.Categories));
        setIsLoading(false);
      }
    }, 1000);
  };

  //   delete category function
  const deleteCategoryReq = async cId => {
    let { data: deleteC } = await deleteCategory(cId);
    if (deleteC.error) {
      console.log(deleteC.error);
    } else if (deleteC.success) {
      fetchData();
    }
  };

  /* This method call the editmodal & dispatch category context */
  const editCategory = (cId, type, des, status) => {
    setEditCategory({ cId, type, des, status });
    setIsEditCategory(true);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isloading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Updated at</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allCategories && allCategories.length > 0 ? (
              allCategories.map((item, key) => {
                return (
                  <CategoryTableComponent
                    category={item}
                    editCat={editCategory}
                    deleteCat={deleteCategoryReq}
                    key={key}
                  />
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-xl text-center font-semibold py-8"
                >
                  No category found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total {allCategories && allCategories.length} category found
        </div>
      </div>
      {/* edit modal  */}
      <EditCategoryModal
        isEditCategory={isEditCategory}
        setIsEditCategory={setIsEditCategory}
        editCategoryData={editCategoryData}
        fetchData={fetchData}
      />
    </>
  );
};

export default AllCategoriesComponent;

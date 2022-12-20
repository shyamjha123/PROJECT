import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCategory } from "src/shared/apiCall/category";

const CategoryListComponent = () => {
  const navigate = useNavigate();
  const data = useSelector(state => state.home);
  const [categories, setCategories] = useState(null);

  const fetchData = async () => {
    try {
      let { data: responseData } = await getAllCategory();
      if (responseData && responseData.Categories) {
        setCategories(responseData.Categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`${data.categoryListDropdown ? "" : "hidden"} my-4`}>
      <hr />
      <div className="py-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories && categories.length > 0 ? (
          categories.map((item, index) => {
            return (
              <div
                onClick={e => navigate(`/products/category/${item._id}`)}
                className="col-span-1 m-2 flex flex-col items-center justify-center space-y-2 cursor-pointer"
                key={index}
              >
                <img
                  src={item.cImage}
                  alt="pic"
                  style={{
                    width: "100%",
                    height: "13rem",
                    objectFit: "cover",
                  }}
                />
                <div className="font-medium">{item.cName}</div>
              </div>
            );
          })
        ) : (
          <div className="text-xl text-center my-4">No Category</div>
        )}
      </div>
    </div>
  );
};

export default CategoryListComponent;

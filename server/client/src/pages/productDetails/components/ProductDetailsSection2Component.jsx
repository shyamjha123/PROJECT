import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../styles/styles.css";
import { menu } from "src/redux/slices/HomeSlice";
import { isAuthenticate } from "src/shared/helpers/isAuthenticate";
import AllReviewsComponent from "./AllReviewsComponent";
import ReviewFormComponent from "./ReviewFormComponent";

const ProductDetailsSection2Component = () => {
  const data = useSelector(state => state.home);
  const [singleProduct, setSingleproduct] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setSingleproduct(data.singleProductDetail ? data.singleProductDetail : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <section className="m-4 md:mx-12 md:my-8">
        <Menu data={data} dispatch={dispatch} />
        {data.menu ? (
          <div className="mt-6">{singleProduct.pDescription}</div>
        ) : (
          <RatingReview />
        )}
      </section>
      <div className="m-4 md:mx-8 md:my-6 flex justify-center capitalize font-light tracking-widest bg-white border-t border-b text-gray-800 px-4 py-4 space-x-4">
        <div>
          <span>Category :</span>
          <span className="text-sm text-gray-600">
            {" "}
            {singleProduct.pCategory ? singleProduct.pCategory.cName : ""}
          </span>
        </div>
      </div>
    </>
  );
};

/**
 *
 * MENU
 *
 */

const Menu = ({ data, dispatch }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
      <div
        onClick={e => dispatch(menu(true))}
        className={`${
          data.menu ? "border-b-2 border-yellow-700" : ""
        } px-4 py-3 cursor-pointer`}
      >
        Description
      </div>
      <div
        onClick={e => dispatch(menu(false))}
        className={`${
          !data.menu ? "border-b-2 border-yellow-700" : ""
        } px-4 py-3 relative flex cursor-pointer`}
      >
        <span>Reviews</span>
        <span className="absolute text-xs top-0 right-0 mt-2 bg-yellow-700 text-white rounded px-1">
          {data.singleProductDetail.pRatingsReviews.length}
        </span>
      </div>
    </div>
  );
};

/**
 *
 * RatingReview
 *
 */
const RatingReview = () => {
  const auth = useSelector(state => state.auth);
  return (
    <>
      <AllReviewsComponent />
      {isAuthenticate() ? (
        <ReviewFormComponent auth={auth} />
      ) : (
        <div className="mb-12 md:mx-16 lg:mx-20 xl:mx-24 bg-red-200 px-4 py-2 rounded mb-4">
          You need to login in for review
        </div>
      )}
    </>
  );
};

export default ProductDetailsSection2Component;

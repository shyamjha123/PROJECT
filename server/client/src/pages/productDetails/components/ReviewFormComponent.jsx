import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { singleProductDetail } from "src/redux/slices/HomeSlice";
import { getSingleProduct } from "src/shared/apiCall/product";
import { isAuthenticate } from "src/shared/helpers/isAuthenticate";
import { postAddReview } from "../apiCall/review";

const ReviewFormComponent = ({ auth }) => {
  const data = useSelector(state => state.home);

  let { id } = useParams(); // Product Id

  const [fData, setFdata] = useState({
    rating: "",
    review: "",
    error: false,
    success: false,
    pId: id,
  });
  const dispatch = useDispatch();

  if (fData.error || fData.success) {
    setTimeout(() => {
      setFdata({ ...fData, error: false, success: false });
    }, 3000);
  }

  const fetchData = async () => {
    try {
      let { data: responseData } = await getSingleProduct(id);
      if (responseData.Product) {
        dispatch(singleProductDetail(responseData.Product));
      }
      if (responseData.error) {
        console.log(responseData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ratingUserList = data.singleProductDetail.pRatingsReviews.map(item => {
    return item.user ? item.user._id : "";
  });

  const reviewSubmitHanlder = () => {
    if (!fData.rating || !fData.review) {
      setFdata({ ...fData, error: "Rating and review must be required" });
    } else if (!isAuthenticate()) {
      setFdata({ ...fData, error: "You must need login to review" });
    } else {
      addReview();
    }
  };

  //   addReview
  const addReview = async () => {
    let formData = {
      rating: fData.rating,
      review: fData.review,
      pId: fData.pId,
      uId: JSON.parse(localStorage.getItem("jwt")).user._id,
    };
    try {
      let responseData = await postAddReview(formData);
      if (responseData.success) {
        setFdata({
          ...fData,
          success: responseData.success,
          review: "",
          rating: "",
        });
        fetchData();
      } else if (responseData.error) {
        setFdata({
          ...fData,
          error: responseData.error,
          review: "",
          rating: "",
        });
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // alert
  const Alert = (color, text) => (
    <div className={`bg-${color}-200 px-4 py-2 my-2 rounded`}>{text}</div>
  );

  return (
    <>
      <div className="md:mx-16 lg:mx-20 xl:mx-24 flex flex-col">
        {fData.error ? Alert("red", fData.error) : ""}
        {fData.success ? Alert("green", fData.success) : ""}
      </div>
      {ratingUserList.includes(auth.authData.user._id) ? (
        <div className="mb-12 md:mx-16 lg:mx-20 xl:mx-24"></div>
      ) : (
        <div className="mb-12 md:mx-16 lg:mx-20 xl:mx-24 flex flex-col">
          <div className="flex flex-col space-y-2">
            <span className="text-2xl font-medium">Add a review</span>
            <span className="text-gray-600 text-sm">
              Your email address will not be published. Required fields are
              marked *
            </span>
          </div>
          {/* Input Rating */}
          <div className="mb-4">
            <fieldset
              onChange={e => setFdata({ ...fData, rating: e.target.value })}
              className="rating"
            >
              <input
                type="radio"
                className="rating"
                id="star5"
                name="rating"
                defaultValue={5}
              />
              <label
                className="full"
                htmlFor="star5"
                title="Awesome - 5 stars"
              />
              <input
                type="radio"
                className="rating"
                id="star4"
                name="rating"
                defaultValue={4}
              />
              <label
                className="full"
                htmlFor="star4"
                title="Pretty good - 4 stars"
              />
              <input
                type="radio"
                className="rating"
                id="star3"
                name="rating"
                defaultValue={3}
              />
              <label className="full" htmlFor="star3" title="Meh - 3 stars" />
              <input
                type="radio"
                className="rating"
                id="star2"
                name="rating"
                defaultValue={2}
              />
              <label
                className="full"
                htmlFor="star2"
                title="Kinda bad - 2 stars"
              />
              <input
                type="radio"
                className="rating"
                id="star1"
                name="rating"
                defaultValue={1}
              />
              <label
                className="full"
                htmlFor="star1"
                title="Sucks big time - 1 star"
              />
            </fieldset>
          </div>
          {/* Review Form */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="textArea">
                Review <span className="text-sm text-gray-600">*</span>
              </label>
              <textarea
                onChange={e => setFdata({ ...fData, review: e.target.value })}
                value={fData.review}
                className="border px-4 py-2 focus:outline-none"
                name="textArea"
                id="textArea"
                cols={30}
                rows={3}
                placeholder="Your review..."
              />
            </div>
            <div
              onClick={reviewSubmitHanlder}
              style={{ background: "#303031" }}
              className="inline-block rounded px-4 py-2 text-white text-center cursor-pointer"
            >
              Submit
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewFormComponent;

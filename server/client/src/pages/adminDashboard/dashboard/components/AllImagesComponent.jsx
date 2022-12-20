import React from "react";

const AllImagesComponent = props => {
  const { sliderImages, isLoading, deleteImageReq } = props;

  if (isLoading) {
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
      <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid-cols-3 my-4">
        {sliderImages?.length > 0 ? (
          sliderImages?.map((item, index) => {
            return (
              <div key={index} className="relative col-span-1 m-2 border">
                <img
                  className="w-full md:h-32 object-center object-cover"
                  src={item.slideImage}
                  alt="sliderImages"
                />
                <span
                  onClick={e => deleteImageReq(item._id)}
                  style={{ background: "#303031" }}
                  className="absolute top-0 right-0 m-1 text-white cursor-pointer rounded-full p-1"
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
            );
          })
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-xl font-light w-full bg-orange-200 rounded py-2">
            No slide image found
          </div>
        )}
      </div>
    </>
  );
};

export default AllImagesComponent;

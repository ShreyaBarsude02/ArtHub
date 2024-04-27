import React from "react";

const ShopImages = (props) => {
  const shopPhotos = props.shop.shopPhotos;
  return (
    <>
      <div>
        <b className="text-[18px]">Shop Photos</b>
        {shopPhotos && shopPhotos.length > 0 ? (
          <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-auto max-h-[500px] border p-4 shadow-xl rounded-md">
            {shopPhotos.map((photo, index) => (
              <div key={index} className="h-1/4 m-4">
                <img
                  className="w-80 h-80 object-cover rounded-md p-1"
                  src={`http://localhost:5000/shopPhotos/` + photo}
                  alt="photo"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="border p-4 shadow-xl rounded-md flex justify-center">
            <p>No photos</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ShopImages;

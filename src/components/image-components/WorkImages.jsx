import React from "react";

const WorkImages = (props) => {
  const workPhotos = props.shop.workPhotos;

  return (
    <>
      <div>
        <b className="text-[18px]">Work Photos</b>
        {workPhotos && workPhotos.length > 0 ? (
          <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-auto max-h-[500px] border p-4 shadow-xl rounded-md">
            {workPhotos.map((photo, index) => (
              <div key={index} className="h-1/4 m-4">
                <img
                  className="w-80 h-80 object-cover rounded-md p-1"
                  src={`http://localhost:5000/workPhotos/` + photo}
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

export default WorkImages;

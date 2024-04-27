import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import shopContext from "../../context/ShopContext";
import GeneralHeader from "../../components/headers/GeneralHeader";
import ShopImages from "../../components/image-components/ShopImages";
import WorkImages from "../../components/image-components/WorkImages";

const Shop = () => {
  const { _id } = useParams();
  const context = useContext(shopContext);
  const { particularShop, fetchParticularShop, setParticularShop } = context;
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchParticularShop(_id);
  
  }, []);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <GeneralHeader heading={particularShop.shopname} />
      <div className=" text-[18px] text-gray-500 my-9">
        <div className="mx-4">
          <div className="xl:flex xl:justify-between">
            <div className="contact sm:grid sm:grid-cols-2 md:grid-cols-3 mx-6 my-2 xl:flex xl:flex-col  sm:w-2/5">
              <p className="my-2">
                <b>Owner Name :</b>&nbsp;&nbsp;{particularShop.owner_name}
              </p>
              <p className="my-2">
                <b>Email :</b>&nbsp;&nbsp;{particularShop.business_email}
              </p>
              <p className="my-2">
                <b>Phone :</b>&nbsp;&nbsp;{particularShop.phone}
              </p>
            </div>
            <div className="address mx-6 my-6 sm:my-2">
              <div className="sm:grid sm:grid-cols-3 xl:space-x-9">
                <p>
                  <b>Country :</b>&nbsp;&nbsp;{particularShop.country}
                </p>
                <p>
                  <b>State :</b>&nbsp;&nbsp;{particularShop.state}
                </p>
                <p>
                  <b>City :</b>&nbsp;&nbsp;{particularShop.city}
                </p>
              </div>
              <p className="mt-6 sm:my-2">
                <b>Address :</b>&nbsp;&nbsp;{particularShop.address}
              </p>
            </div>
          </div>
          <div className="description mx-6 my-6 sm:my-16">
            <div className="my-2 whitespace-pre-line">
              <b>Description :</b>
              <br />
              <div className="border p-4 shadow-xl rounded-md">
                {particularShop &&
                  typeof particularShop.description === "string" &&
                  (expanded
                    ? particularShop.description
                    : `${particularShop.description.slice(0, 200)}...`)}
                <br />
                {expanded === false && (
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={toggleDescription}
                  >
                    Read More
                  </button>
                )}
                {expanded === true && (
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={toggleDescription}
                  >
                    Read Less
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="shopPhotos mx-12 my-16">
          <ShopImages shop={particularShop} />
        </div>
        <div className="shopPhotos mx-12 my-16">
          <WorkImages shop={particularShop} />
        </div>
      </div>
    </>
  );
};

export default Shop;

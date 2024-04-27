import React from "react";
import { Link } from "react-router-dom";

const ShopCard = (props) => {
  return (
    <div className="mx-24 lg:mx-9 my-9 bg-[#ffe9eb04] shadow-xl shadow-gray-100 hover:bg-[#d1f3fa29] rounded-xl border border-s-[29px] w-[35vw]">
    
      <div className="header px-6 py-4 flex justify-between bg-[#f5f5f5] rounded-r-xl">
        <div className="shop-image">
        <img src="/src/assets/shop.svg" alt="" className="size-12"/>
        </div>
        <div className="heading font-bold text-center text-[24px] text-[#271616]">
          {props.shop.shopname}
        </div>
        <div className="flex space-x-4 sm:space-x-6 md:space-x-12 mr-2">
          <Link to={`/shop/${props.shop._id}`} className="hover:translate-x-2">
            <div className="arrow text-5xl bottom-5">&#8594;</div>
          </Link>
        </div>
      </div>
      <div className="contact sm:grid sm:grid-cols-2 lg:grid-cols-3 mx-6 my-2 lg:flex lg:flex-col text-gray-500 text-[14px]">
        <p className=" my-2">
          <b className="lg:mr-1">Owner Name :</b>
          <span>&nbsp;&nbsp;{props.shop.owner_name}</span>
        </p>
        <p className=" my-2">
          <b className="lg:mr-[55px]">Email :</b>
          <span>&nbsp;&nbsp;{props.shop.business_email}</span>
        </p>
        <p className=" my-2">
          <b className="lg:mr-[50px]">Phone :</b>
          <span>&nbsp;&nbsp;{props.shop.phone}</span>
        </p>
      </div>
      <br />
      <div className="address mx-6 my-2 text-gray-500 text-[14px] ">
        <div className="grid grid-cols-3">
          <p className="">
            <b>Country :</b>&nbsp;&nbsp;{props.shop.country}
          </p>
          <p className="">
            <b>State :</b>&nbsp;&nbsp;{props.shop.state}
          </p>
          <p className="">
            <b>City :</b>&nbsp;&nbsp;{props.shop.city}
          </p>
        </div>
        <p className=" my-2">
          <b>Address :</b>&nbsp;&nbsp;{props.shop.address}
        </p>
      </div>
    </div>
  );
};

export default ShopCard;

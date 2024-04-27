import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = (props) => {
  return (
    <>
      <div className="cardcategory bg-[#ffe9eb04] w-[229px] h-[209px] shadow-xl hover:bg-[#d1f3fa29] mb-14 rounded-xl">
        <div className="img w-[229px] h-[150px]">
          <img className="rounded-xl" src={props.imgUrl} alt="" />
        </div>
        <div className="cardbody pl-5 pr-5 flex justify-between items-center">
          <div className="name">{props.category_name}</div>
          <Link to={`/category/${props.category_tag}/${props.category_name}`} className="hover:translate-x-2">
            <div className="arrow text-5xl bottom-5">&#8594;</div>
          </Link>
        </div>
      </div>
    </>
  );
}; 

export default CategoryCard;

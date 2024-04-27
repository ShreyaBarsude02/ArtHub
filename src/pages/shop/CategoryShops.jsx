import React, { useContext, useEffect, useState } from "react";
import GeneralHeader from "../../components/headers/GeneralHeader";
import { useParams } from "react-router-dom";
import shopContext from "../../context/ShopContext";
import ShopCard from "../../components/cards/ShopCard";

const CategoryShops = () => {
  const context = useContext(shopContext);
  const { fetchByShopCategory, categoryShops, setCategoryShops } = context;

  const { category_tag, category_name } = useParams();
  const [query, setQuery] = useState("");
  const [showShops, setShowShops] = useState(categoryShops);

  let searchedShops;

  useEffect(() => {
    fetchByShopCategory(category_tag);
  }, [category_tag]);

  useEffect(() => {
    searchedShops = categoryShops.filter((shop) => {
      const shopInfo = `${shop.shopname.toLowerCase()} ${shop.owner_name.toLowerCase()} ${shop.country.toLowerCase()} ${shop.city.toLowerCase()} ${shop.state.toLowerCase()}`;
      return shopInfo.includes(query.toLowerCase());
    });
    setShowShops(searchedShops);
  }, [query, categoryShops]);

  return (
    <>
      <GeneralHeader heading={category_name} />
      <div className="flex justify-center items-center mt-9">
        <svg
          className="hover:cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
        </svg>
        <input
          className="bg-white border border-gray-300 rounded-xl w-[35vw] h-[5vh] text-center hover:bg-gray-50"
          type="text"
          placeholder="Search.."
          name="search"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="flex justify-center items-center">
        <div className="mx-6 flex flex-col justify-center items-center xl:grid xl:grid-cols-2 xl:space-x-28">
          {showShops.map((shop) => {
            return (
              <div key={shop.id}>
                <ShopCard shop={shop} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CategoryShops;

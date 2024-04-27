import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/headers/HomeHeader";
import CategoryCard from "../components/cards/CategoryCard";
import categoriesData from "../data/Categories.json";

const Home = () => {
  const categories = categoriesData;
  const [searchTerm, setSearchTerm] = useState("");
  const [showCategories, setShowCategories] = useState(categories);

  useEffect(() => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setShowCategories(filtered);
  }, [searchTerm, categories]);

  return (
    <>
      <Header />
      <div className="flex flex-col">
        <div className="flex justify-center items-center m-9">
        <svg className="hover:cursor-pointer" 
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
        </div>
        <div className="category m-9">
          <div className="grid justify-items-center sm:grid-cols-2 md:grid-cols-3">
            {showCategories.map((category) => {
              return (
                <CategoryCard
                  key={category.id}
                  category_name={category.name}
                  category_tag={category.tag}
                  imgUrl={category.img}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

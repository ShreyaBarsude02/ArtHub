import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// import { useStateStore } from "../zustand/useStateStore";

const Hamburger = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  // const {setUser} = useStateStore()
  const hamburgerRef = useRef(null);

  const handleToggleHamburger = () => {
    setHamburgerOpen(true);
  };

  const handleLogout= ()=>{
    localStorage.removeItem("auth_token");
    setUser(null);
  }

  useEffect(()=>{
    const handleClickOutside = (event) => {
      if(hamburgerRef.current && !hamburgerRef.current.contains(event.target)){
        setHamburgerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  },[])

  return (
    <>
      <div className="cursor-pointer w-6" onClick={handleToggleHamburger}>
        <div className="lines h-0.5 mt-1 rounded-md ml-1 bg-black"></div>
        <div className="lines h-0.5 mt-1 rounded-md ml-1 bg-black"></div>
        <div className="lines h-0.5 mt-1 rounded-md ml-1 bg-black"></div>
      </div>

      <div
      ref={hamburgerRef}
        className={`${
          hamburgerOpen ? "right-2" : "hidden"
        } top-[40px] absolute shadow-lg w-[150px]
    h-max bg-purple-50 rounded-xl bg-opacity-90`}
      >
        <ul className="flex flex-col space-y-4 justify-center items-center">
          <div className="pt-4 pl-4 pb-2 border-b-2 border-gray-300 w-[-webkit-fill-available] rounded-xl hover:bg-sky-50 hover:font-bold">
            <li>
              <Link to="/">Home</Link>
            </li>
          </div>
          <div className="pl-4 pb-2 border-b-2 border-gray-300 w-[-webkit-fill-available] rounded-xl hover:bg-sky-50 hover:font-bold">
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </div>
          <div className="pl-4 pb-2 border-b-2 border-gray-300 w-[-webkit-fill-available] rounded-xl hover:bg-sky-50 hover:font-bold">
            <li>
              <Link to="/signUp">Create Account</Link>
            </li>
          </div>
          <div className="pl-4 pb-2 border-b-2 border-gray-300 w-[-webkit-fill-available] rounded-xl hover:bg-sky-50 hover:font-bold">
            <li>
              <Link to="/signIn">Login</Link>
            </li>
          </div>
          <div className="pl-4 pb-2 border-b-2 border-gray-300 w-[-webkit-fill-available] rounded-xl hover:bg-sky-50 hover:font-bold">
            <li>
              <Link to="/addShop">Add Your Shop</Link>
            </li>
          </div>
          <div className="pl-4 pb-2 border-b-2 border-gray-300 w-[-webkit-fill-available] rounded-xl hover:bg-sky-50 hover:font-bold">
            <li>
                <Link to="/contact">Contact Us</Link>
            </li>
          </div>
          <div className="pl-4 pb-2 border-b-2 border-gray-400 w-[-webkit-fill-available] rounded-xl hover:bg-sky-50 hover:font-bold">
            <li>
                <Link onClick={handleLogout} to="/signIn">Logout</Link>
            </li>
          </div>
          
        </ul>
      </div>
    </>
  );
};

export default Hamburger;

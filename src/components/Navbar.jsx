import React from "react";
import Hamburger from "./Hamburger";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
    <div className="bg-gradient-to-r from-sky-200 to-pink-100 sticky top-0">
      <nav className="bg-gray-50 h-[10vh] rounded-b-[29px] border-gray-400 border-b-[0.5px] shadow-lg ">
        <div className="ml-4 mr-4 pt-4 flex justify-between items-center">
        <Link to="/home">
        <div className='logo flex'>
         
                <header className='header1 font-Montserrat text-4xl text-[#fabecdd0] italic'>
                    A
                </header>
                <header className='header2 font-Montserrat text-xl text-[#8b89898c] tracking-wide italic pt-3'>
                    rtHub
                </header>
                
            </div>
            </Link>
        <Hamburger/>
        </div>
      </nav>
      </div>
    </>
  );
};

export default Navbar;

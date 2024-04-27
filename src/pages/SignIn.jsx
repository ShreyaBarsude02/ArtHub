import React, {useContext, useState} from 'react'
import GeneralHeader from '../components/headers/GeneralHeader'
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import shopContext from "../context/ShopContext";

const SignIn = ({returnUrl}) => {
  const context = useContext(shopContext);
  const {setUser} = context;
  const navigate = useNavigate();
  let url;
  
  const handleLogin = async (e) =>{
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        }),
      });

      const responseData = await response.json();
      if (response.ok) {
        const user = {
          auth_token : responseData.auth_token,
          loggedInUser : responseData.sendUser
        };
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        localStorage.setItem("auth_token", responseData.auth_token);
        localStorage.setItem("user", JSON.stringify(responseData.sendUser));
        setUser(user);
        toast.success("Logged in successfully");
        if(returnUrl !== undefined){
          url = returnUrl;
        }
        else{
          url = "/home"
        }
        setTimeout(()=>{
          navigate(url);
        },600)
        
      }else {
        toast.error(responseData.errors[0].msg);
      }
    } catch (error) {
      toast.error("Please try again");
      console.log(error);
    }
  }

  return (
    <>
      <GeneralHeader heading="Login"/>
      <div className="flex justify-center">
        <form
          className="my-9 w-[300px] rounded-xl bg-opacity-5 md:w-[550px] 2xl:w-[700px]"
          onSubmit={handleLogin}
          method="post"
          encType="multipart/form-data"
          target="_parent"
          action="/signIn"
        >
          <div className="my-9 mx-4 bg-transparent border rounded-xl shadow-md hover:bg-[#fae5f565]">
            <label className="mx-4" htmlFor="email">
              Email
            </label>
            <br />
            <input
              className="my-2 mx-4 w-11/12 h-10 text-[15px] px-2 shadow-sm"
              type="email"
              name="email"
              placeholder="Enter your email"
              id="email"
              required
            />
          </div>
          <div className="my-9 mx-4 bg-transparent border rounded-xl shadow-md hover:bg-[#fae5f565]">
            <label className="mx-4" htmlFor="password">
              Password
            </label>
            <br />
            <input
              className="my-2 mx-4 w-11/12 h-10 text-[15px] px-2 shadow-sm"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex shadow-lg bg-[#fae5f565] w-28 h-12 m-8 my-7 justify-center rounded-xl">
            <button className="text-[17px]" type="submit">
              {" "}
              Login{" "}
            </button>
          </div>
          <div className="flex m-0 justify-center">
             <div className="m-2 px-3 py-2">
              <Link to={"/signUp"} className="text-[20px]">Dont't have an account <span className="underline hover:text-purple-700 text-purple-500">Register</span></Link>
              </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default SignIn
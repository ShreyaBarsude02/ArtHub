import React, { useState } from "react";
import GeneralHeader from "../components/headers/GeneralHeader";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
          phone: document.getElementById("phone").value,
        }),
      });
      const responseData = await response.json();

      if (response.ok) {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("phone").value = "";
        toast.success(responseData.msg);
        setTimeout(() => {
          window.location.href = "/signUp";
        }, 1000);
      } else {
        toast.error(responseData.errors[0].msg);
      }
    } catch (error) {
      toast.error("Please try again");
      console.log(error);
    }
  };

  return (
    <>
      <GeneralHeader heading="Create your account" />
      <div className="flex justify-center">
        <form
          className="my-4 w-[470px] rounded-xl bg-opacity-5 md:w-[760px] 2xl:w-[1000px]"
          onSubmit={handleFormSubmit}
          method="post"
          encType="multipart/form-data"
          target="_parent"
          action="/signUp"
        >
          <div className="xl:grid xl:grid-cols-2 ">
            <div className=" my-9 mx-4 bg-transparent border rounded-xl shadow-md hover:bg-[#fae5f565]">
              <label className="mx-4" htmlFor="name">
                Name
              </label>
              <br />
              <input
                className="my-2 mx-4 w-11/12 h-10 text-[15px] px-2 shadow-sm"
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                required
              />
            </div>
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
            <div className="my-9 mx-4 bg-transparent border rounded-xl shadow-md hover:bg-[#fae5f565]">
              <label className="mx-4" htmlFor="phone">
                Phone Number
              </label>
              <br />
              <input
                className="my-2 mx-4 w-11/12 h-10 text-[15px] px-2 shadow-sm"
                type="text"
                name="phone"
                id="phone"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="flex m-8 my-5 justify-center ">
            <button className="bg-[#fae5f565] w-28 h-12 text-[17px] shadow-lg rounded-xl" type="submit">
              {" "}
              Register{" "}
            </button>
          </div>
          <div className="flex m-0 justify-center">
            <div className="m-2 px-3 py-2">
              <Link to={"/signIn"} className="text-[20px]">
                Already have an account{" "}
                <span className="underline hover:text-purple-700 text-purple-500">
                  Login
                </span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;

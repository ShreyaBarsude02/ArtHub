import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import CategoryShops from "./pages/shop/CategoryShops";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import AddShop from "./pages/shop/AddShop";
import Shop from "./pages/shop/Shop";
import { Toaster } from "react-hot-toast";
import shopContext from "./context/ShopContext";
import { useContext, useEffect } from "react";

function App() {
  const context = useContext(shopContext);
  const {user,setUser} = context;
  let loogedUser;
  useEffect(()=>{
    loogedUser = user;
  },[setUser]);
  return (
    <>
        <BrowserRouter>
          <Navbar />
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route
              path="/addshop"
              element={user? <AddShop /> : <SignIn returnUrl="/addshop" />}
            />
            <Route
              path="/category/:category_tag/:category_name"
              element={<CategoryShops />}
            />
            <Route path="/shop/:_id" element={<Shop />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;

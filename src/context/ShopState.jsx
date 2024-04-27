import shopContext from "./ShopContext";
import React, { useState } from "react";

const ShopState = (props) => {

    const host = "http://localhost:5000/api";
    const shopsInitial = [];
    const categoryShopsInitial = [];
    const [allShops , setallShops] = useState(shopsInitial);
    const [categoryShops , setCategoryShops] = useState(categoryShopsInitial);
    const [particularShop, setParticularShop] = useState([]);
    const [searchShops, setSearchShops] = useState([]);
    const [user, setUser] = useState(null);

    const getAllShops = async () => {
        const response = await fetch(`${host}/shops/fetchallshops`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        setallShops(data);
    }

    const addShop = async (shopname, owner_name, category_tag, business_email, description, address,country, state, city, phone, shopPhotos, workPhotos) => {
        const formData = new FormData();

        formData.append('shopname',shopname);
        formData.append('owner_name',owner_name);
        formData.append('category_tag',category_tag);
        formData.append('business_email',business_email);
        formData.append('description',description);
        formData.append('address',address);
        formData.append('country',country);
        formData.append('state',state);
        formData.append('city',city);
        formData.append('phone',phone);
    
        for (const file of shopPhotos) {
            formData.append('shopPhotos', file);
        }

        for (const file of workPhotos) {
            formData.append('workPhotos', file);
        }

        console.log(formData)

        const response = await fetch(`${host}/shops/addshop`, {
            method: "POST",
            headers: {
                "auth_token" : localStorage.getItem("auth_token"),
            },
            body : formData,
        });
        const data = await response.json();
        setallShops(data.shopData);
        const responseSent = {
            status : response.status,
            msg : data.msg,
            error: data.errors ? data.errors[0].msg : undefined
        }
        return responseSent;
    }

    const deleteShop = async (id) => {
        const response = await fetch(`${host}/shops/deleteshop/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth_token" : localStorage.getItem("auth_token")
            },
        });
        const data = await response.json();
        setallShops(allShops.filter(shop => shop._id!== id));
    }

    const updateShop = async (id, updatedData, updatedShopPhotos, updatedWorkPhotos) => {
        const formData = new FormData();

        // Append updated data
        Object.entries(updatedData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // Append updated shop photos
        for (const file of updatedShopPhotos) {
            formData.append('updatedShopPhotos', file);
        }

        // Append updated work photos
        for (const file of updatedWorkPhotos) {
            formData.append('updatedWorkPhotos', file);
        }
        const response = await fetch(`${host}/shops/updateshop/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data",
                "auth_token" : localStorage.getItem("auth_token")
            },
            
        });
        const data = await response.json();
        setallShops(allShops.map(shop => shop._id === id? data : shop));
    }

    const fetchByShopCategory = async (category_tag) => {
        try {
            const response = await fetch(`${host}/shops/fetchshopsbycategory/${category_tag}`,{
            method : "POST"});
            const data = await response.json();
            const dataArray = Array.isArray(data) ? data : [data];
            setCategoryShops(dataArray);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchParticularShop = async (_id) => {
        try {
            const response = await fetch(`${host}/shops/fetchparticularshop/${_id}`,{
            method : "POST"});
            const shop = await response.json();
            setParticularShop(shop);
        } catch (error) {
            console.error(error);
        }
    }

    const search = async (query) => {
        try {
            const response = await fetch(`${host}/shops/search?query=${query}`,{
                method: "POST"
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSearchShops(data);
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <shopContext.Provider value={{user, setUser, allShops, getAllShops, addShop, deleteShop, updateShop,setCategoryShops, categoryShops, fetchByShopCategory, setParticularShop, particularShop, fetchParticularShop, searchShops, search}}>
        {props.children}
    </shopContext.Provider>
  )
}

export default ShopState
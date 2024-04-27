import React, { useContext, useState, useRef } from "react";
import shopContext from "../../context/ShopContext";
import GeneralHeader from "../../components/headers/GeneralHeader";
import categoriesData from "../../data/categories";
import toast from "react-hot-toast";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";

const AddShop = () => {
  const context = useContext(shopContext);
  const { addShop } = context;

  const categories = categoriesData;

  const initial = {
    shopname: "",
    owner_name: "",
    category_tag: "",
    business_email: "",
    description: "",
    address: "",
    city: "",
    country: "",
    state: "",
    phone: "",
    shopPhotos: [],
    workPhotos: [],
  };

  const [formData, setFormData] = useState(initial);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);

  const shopPhotosRef = useRef(null);
  const workPhotosRef = useRef(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseSent = await addShop(
        formData.shopname,
        formData.owner_name,
        formData.category_tag,
        formData.business_email,
        formData.description,
        formData.address,
        formData.country,
        formData.state,
        formData.city,
        formData.phone,
        formData.shopPhotos,
        formData.workPhotos
      );
      if (responseSent.status === 201) {
        toast.success(responseSent.msg)

        setFormData(initial);

        if (shopPhotosRef.current) {
          shopPhotosRef.current.value = "";
        }
        if (workPhotosRef.current) {
          workPhotosRef.current.value = "";
        }
      } else {
        toast.error(responseSent.error)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const selectedPhotos = Array.from(e.target.files);
      setFormData({
        ...formData,
        [e.target.name]: [...formData[e.target.name], ...selectedPhotos],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const removePhoto = (type, index) => {
    const updatedPhotos = [...formData[type]];
    updatedPhotos.splice(index, 1);
    setFormData({
      ...formData,
      [type]: updatedPhotos,
    });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    setFormData({
      ...formData,
      category_tag: selectedCategory,
    });
  };

  const handleCountryChange = (country) => {
    setCountryid(country.id);
    setFormData({
      ...formData,
      country: country.name,
      state: "",
      city: "",
    });
  };

  const handleStateChange = (state) => {
    setstateid(state.id);
    setFormData({
      ...formData,
      state: state.name,
      city: "",
    });
  };

  const handleCityChange = (city) => {
    setFormData({
      ...formData,
      city: city.name,
    });
  };

  return (
    <>
      <GeneralHeader heading="Add Your Shop" />
      <div className="flex justify-center">
        <form
          className="my-9 w-[90vw] rounded-xl bg-opacity-5"
          onSubmit={handleFormSubmit}
          method="post"
          encType="multipart/form-data"
          target="_parent"
          autoComplete="off"
        >
          <div className="m-2">
            <div className=" md:flex md:justify-between">
            <div className="sm:grid sm:grid-cols-2 ">
              <div className="my-9 mx-4 bg-transparent border rounded-xl shadow-md hover:bg-[#fae5f565] md:w-[25vw] xl:mr-16">
                <label className="mx-4" htmlFor="shopname">
                  Shop Name
                </label>
                <br />
                <input
                  className="my-2 mx-4 w-11/12 h-10 text-[15px] px-2 shadow-sm"
                  type="text"
                  name="shopname"
                  value={formData.shopname}
                  onChange={handleChange}
                  id="shopname"
                  placeholder="Enter your Shop's name"
                  required
                />
              </div>
              <div className="my-9 mx-4 bg-transparent border rounded-xl shadow-md hover:bg-[#fae5f565] md:w-[25vw]">
                <label className="mx-4" htmlFor="owner_name">
                  Owner Name
                </label>
                <br />
                <input
                  className="my-2 mx-4 w-11/12 h-10 text-[15px] px-2 shadow-sm"
                  type="text"
                  name="owner_name"
                  value={formData.owner_name}
                  onChange={handleChange}
                  id="owner_name"
                  placeholder="Enter Shop owner's name"
                  required
                />
              </div>
              <div className="my-9 mx-4 bg-transparent border rounded-xl shadow-md hover:bg-[#fae5f565] md:w-[25vw]">
              <label className="mx-4" htmlFor="business_email">
                Contact Number
              </label>
              <br />
              <input
                className="my-2 mx-4 w-11/12 h-10 text-[15px] px-2 shadow-sm"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                id="phone"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="my-9 mx-4 bg-transparent border rounded-xl shadow-md hover:bg-[#fae5f565] md:w-[25vw]">
              <label className="mx-4" htmlFor="business_email">
                Business Email
              </label>
              <br />
              <input
                className="my-2 mx-4 w-11/12 h-10 text-[15px] px-2 shadow-sm"
                id="email"
                type="email"
                name="business_email"
                value={formData.business_email}
                onChange={handleChange}
                placeholder="Enter business email"
                required
              />
            </div>
            </div>
            <div className="my-9 mx-4 bg-transparent border rounded-xl shadow-md hover:bg-[#fae5f565] md:w-[25vw]">
              <label className="mx-4">Art Category</label>
              {categories.map((category) => (
                <div key={category.id}>
                  <input
                    className="my-3 mx-4 shadow-sm"
                    type="radio"
                    name="category_tag"
                    value={category.tag}
                    onChange={handleCategoryChange}
                    id={category.id}
                    checked={formData.category_tag === category.tag}
                  />
                  <label className="mx-4" htmlFor={category.id}>
                    {category.name}
                  </label>
                  <br />
                </div>
              ))}
            </div>
            </div>
            
            
            
            <div className="my-9 mx-4 bg-transparent border rounded-xl overflow-y-auto shadow-md hover:bg-[#fae5f5]">
              <label className="mx-4" htmlFor="description">
                Description
              </label>
              <br />
              <textarea
                className="my-2 mx-4 w-11/12 h-96 text-[15px] px-2 shadow-sm"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                id="description"
                placeholder="Description"
                required
              />
            </div>
            <div className="my-9 mx-4 bg-transparent border rounded-xl shadow-md hover:bg-[#fae5f565]">
              <label className="mx-4" htmlFor="address">
                Address
              </label>
              <br />
              <textarea
                className="my-2 mx-4 w-11/12 h-40 text-[15px] px-2 shadow-sm"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                id="address"
                placeholder="Enter shop's address"
                required
              />
            </div>
            <div className="lg:grid lg:grid-cols-3">
            <div className="my-9 mx-4 bg-transparent border rounded-xl shadow-md hover:bg-[#fae5f565]">
              <label className="mx-4">Country</label>
              <CountrySelect
                id="country"
                containerClassName="my-2 mx-4 bg-transparent border rounded-xl shadow-md hover:bg-[#fae5f565]"
                inputClassName="mx-4 my-2 py-2 px-2 rounded-md"
                onChange={handleCountryChange}
                value={formData.country}
                placeHolder="Select Country"
              />
            </div>
            <div className="my-9 mx-4 bg-transparent border rounded-xl shadow-md hover:bg-[#fae5f565]">
              <label className="mx-4">State</label>
              <StateSelect
                id="state"
                containerClassName="my-2 mx-4 bg-transparent border rounded-xl shadow-md hover:bg-[#fae5f565]"
                inputClassName="mx-4 my-2 py-2 px-2 rounded-md"
                countryid={countryid}
                onChange={handleStateChange}
                value={formData.state}
                placeHolder="Select State"
              />
            </div>
            <div className="my-9 mx-4 bg-transparent border rounded-xl shadow-md hover:bg-[#fae5f565]">
              <label className="mx-4">City</label>
              <CitySelect
                id="city"
                containerClassName="my-2 mx-4 bg-transparent border rounded-xl shadow-md hover:bg-[#fae5f565]"
                inputClassName="mx-4 my-2 py-2 px-2 rounded-md"
                countryid={countryid}
                stateid={stateid}
                onChange={handleCityChange}
                value={formData.city}
                placeHolder="Select City"
              />
            </div>
            </div>
            
            <div className="my-9 mx-4 bg-transparent border rounded-xl shadow-md hover:bg-[#fae5f565]">
              <label className="mx-4" htmlFor="shopPhotos">
                Shop Photos
              </label>
              <br />
              <input
                className="my-2 mx-4 w-11/12 shadow-sm"
                type="file"
                name="shopPhotos"
                onChange={handleChange}
                id="shopPhotos"
                multiple
                accept=".jpeg,.jpg,.png,.gif,.avif"
                ref={shopPhotosRef}
              />
              <div className="image-preview-container flex space-x-2 space-y-2">
                {formData.shopPhotos.map((photo, index) => (
                  <div
                    key={index}
                    className="image-preview flex flex-col justify-center"
                  >
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Shop Photo ${index}`}
                    />
                    <button
                      type="button"
                      className="remove-button mx-4 my-2 bg-gray-200 hover:bg-sky-100 px-4 text-center rounded-md"
                      onClick={() => removePhoto("shopPhotos", index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="my-9 mx-4 bg-transparent border rounded-xl shadow-md hover:bg-[#fae5f565]">
              <label className="mx-4" htmlFor="workPhotos">
                Work Photos
              </label>
              <br />
              <input
                className="my-2 mx-4 w-11/12 shadow-sm"
                type="file"
                name="workPhotos"
                onChange={handleChange}
                id="workPhotos"
                multiple
                accept=".jpeg,.jpg,.png,.gif,.avif"
                ref={workPhotosRef}
              />
              <div className="image-preview-container flex space-x-2 space-y-2">
                {formData.workPhotos.map((photo, index) => (
                  <div
                    key={index}
                    className="image-preview flex flex-col justify-center"
                  >
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Work Photo ${index}`}
                    />
                    <button
                      type="button"
                      className="remove-button mx-4 my-2 bg-gray-200 hover:bg-sky-100 px-4 text-center rounded-md"
                      onClick={() => removePhoto("workPhotos", index)}
                    >
                      Remove
                    </button>
                    <hr className="mx-4 mb-4 border-[1.5px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex shadow-lg bg-[#fae5f565] w-28 h-12 m-8 my-7 justify-center rounded-xl">
            <button className="text-[17px]" type="submit">
              {" "}
              Add Shop{" "}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddShop;

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";

let AddFoodTruck;

const initialTruckState = {
  truckName: "",
  imageOfTruck: "",
  cuisineType: "",
  customerRatings: [],
  customerRatingAvg: "",
  currentLocation: {
    location: {
      latitude: "",
      longitude: "",
      distortion: "",
    },
    departureTime: "",
  },
  menu: [
    {
      itemName: "",
      itemDescription: "",
      itemPhotos: [],
      itemPrice: "",
      customerRatings: [],
      customerRatingAvg: "",
    },
  ],
};

AddFoodTruck = (props) => {
  const [newTruck, setNewTruck] = useState(initialTruckState);
  const [newMenuPhoto, setNewMenuPhoto] = useState([]);

  const textInput = useRef();

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    if (name === "departureTime") {
      setNewTruck({
        ...newTruck,
        currentLocation: { ...newTruck.currentLocation, [name]: value },
      });
    } else if (
      name === "latitude" ||
      name === "longitude" ||
      name === "distortion"
    ) {
      setNewTruck({
        ...newTruck,
        currentLocation: {
          ...newTruck.currentLocation,
          location: { ...newTruck.currentLocation.location, [name]: value },
        },
      });
    } else {
      setNewTruck({ ...newTruck, [name]: value });
    }
  };

  const handleMenuChange = (index, event) => {
    event.preventDefault();
    const { name, value } = event.target;

    let updateMenu = newTruck.menu;
    updateMenu[index][name] = value;
    setNewTruck({ ...newTruck, menu: updateMenu });
  };

  const handleMenuPhotoEdit = (index, event, menuIndex) => {
    event.preventDefault();
    const { value } = event.target;
    let updateMenu = newTruck.menu;
    updateMenu[menuIndex].itemPhotos[index] = value;
    setNewTruck({ ...newTruck, menu: updateMenu });
  };

  const handleMenuPhotoAdd = (index, event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let updateNewMenuPhoto = newMenuPhoto;

    console.log(updateNewMenuPhoto);

    updateNewMenuPhoto[index] = value;
    setNewMenuPhoto(newMenuPhoto);

    console.log(newMenuPhoto);
  };

  const handleAddImage = (index, event) => {
    event.preventDefault();
    let updateMenu = newTruck.menu;
    console.log(textInput.current.form[22]);
    updateMenu[index].itemPhotos.push(newMenuPhoto[index]);
    setNewTruck({ ...newTruck, menu: updateMenu });
    //setNewMenuPhoto(initialPhotoState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //Post request
    window.location.href = "/operator-dashboard";
  };

  return (
    <div>
      <h3>Add New Truck</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <h4>Basic Info</h4>
          <label>
            Truck Name
            <input
              type="text"
              name="truckName"
              placeholder="truck name"
              value={newTruck.truckName}
              onChange={handleChange}
            />
          </label>
          <label>
            Truck Image
            <input
              type="url"
              name="imageOfTruck"
              placeholder="image url"
              value={newTruck.imageOfTruck}
              onChange={handleChange}
            />
          </label>
          <label>
            Cuisine Type
            <input
              type="text"
              name="cuisineType"
              placeholder="cuisine type"
              value={newTruck.cuisineType}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <h4>Current Location</h4>
          <label>
            Latitude
            <input
              type="text"
              name="latitude"
              placeholder="latitude"
              value={newTruck.currentLocation.location.latitude}
              onChange={handleChange}
            />
          </label>
          <label>
            Longitude
            <input
              type="text"
              name="longitude"
              placeholder="longitude"
              value={newTruck.currentLocation.location.longitude}
              onChange={handleChange}
            />
          </label>
          <label>
            Distortion
            <input
              type="text"
              name="distortion"
              placeholder="distortion"
              value={newTruck.currentLocation.location.distortion}
              onChange={handleChange}
            />
          </label>
          <label>
            Departure Time
            <input
              type="text"
              name="departureTime"
              placeholder="departure time"
              value={newTruck.currentLocation.departureTime}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <h4>Menu</h4>
          {newTruck.menu.map((menuItem, index) => {
            const menuIndex = index;
            return (
              <div key={index}>
                <h5>Menu Item {index + 1}</h5>
                <label>
                  Item Name
                  <input
                    type="text"
                    name="itemName"
                    placeholder="item name"
                    value={menuItem.itemName}
                    onChange={(event) => handleMenuChange(index, event)}
                  />
                </label>
                <label>
                  Item Description
                  <input
                    type="text"
                    name="itemDescription"
                    placeholder="item description"
                    value={menuItem.itemDescription}
                    onChange={(event) => handleMenuChange(index, event)}
                  />
                </label>
                <label>
                  Item Price
                  <input
                    type="number"
                    name="itemPrice"
                    placeholder="item price $"
                    value={menuItem.itemPrice}
                    onChange={(event) => handleMenuChange(index, event)}
                  />
                </label>
                <div>
                  <p>Images</p>
                  {menuItem.itemPhotos.map((image, index) => {
                    return (
                      <input
                        key={index}
                        type="url"
                        name="itemPhotos"
                        placeholder="image url"
                        value={image}
                        onChange={(event) =>
                          handleMenuPhotoEdit(index, event, menuIndex)
                        }
                      />
                    );
                  })}
                  <div>
                    <input
                      key={index}
                      defaultValue=""
                      ref={textInput}
                      type="url"
                      name="newMenuPhoto"
                      placeholder="image url"
                      //value={newMenuPhoto[index]}
                      onChange={(event) => handleMenuPhotoAdd(index, event)}
                    />
                    <button
                      type="button"
                      onClick={(event) => handleAddImage(index, event)}
                    >
                      Add Image
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button>Save Changes</button>
      </form>
    </div>
  );
};

export default AddFoodTruck;

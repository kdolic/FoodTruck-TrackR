import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";

let EditFoodTruck;

EditFoodTruck = (props) => {
  const itemID = useParams();
  const id = itemID.itemID;
  const truck = props.trucks[id];

  let initialPhotoState = [];
  for (let i = 0; i < truck.menu.length; i++) {
    initialPhotoState.push("");
  }

  const [currentTruck, setCurrentTruck] = useState(truck);
  const [newMenuPhoto, setNewMenuPhoto] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const textInput = useRef(null);

  useEffect(() => {
    return setNewMenuPhoto(initialPhotoState);
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    if (name === "departureTime") {
      setCurrentTruck({
        ...currentTruck,
        currentLocation: { ...currentTruck.currentLocation, [name]: value },
      });
    } else if (
      name === "latitude" ||
      name === "longitude" ||
      name === "distortion"
    ) {
      setCurrentTruck({
        ...currentTruck,
        currentLocation: {
          ...currentTruck.currentLocation,
          location: { ...currentTruck.currentLocation.location, [name]: value },
        },
      });
    } else {
      setCurrentTruck({ ...currentTruck, [name]: value });
    }
  };

  const handleMenuChange = (index, event) => {
    event.preventDefault();
    const { name, value } = event.target;

    let updateMenu = currentTruck.menu;
    updateMenu[index][name] = value;
    setCurrentTruck({ ...currentTruck, menu: updateMenu });
  };

  const handleMenuPhotoEdit = (index, event, menuIndex) => {
    event.preventDefault();
    const { value } = event.target;
    let updateMenu = currentTruck.menu;
    updateMenu[menuIndex].itemPhotos[index] = value;
    setCurrentTruck({ ...currentTruck, menu: updateMenu });
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
    let updateMenu = currentTruck.menu;
    console.log(textInput.current.form[22]);
    updateMenu[index].itemPhotos.push(newMenuPhoto[index]);
    setCurrentTruck({ ...currentTruck, menu: updateMenu });
    setNewMenuPhoto(initialPhotoState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //Put request
    window.location.href = "/operator-dashboard";
  };

  return (
    <div>
      <h3>Edit Truck</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <h4>Basic Info</h4>
          <label>
            Truck Name
            <input
              type="text"
              name="truckName"
              placeholder="truck name"
              value={currentTruck.truckName}
              onChange={handleChange}
            />
          </label>
          <label>
            Truck Image
            <input
              type="url"
              name="imageOfTruck"
              placeholder="image url"
              value={currentTruck.imageOfTruck}
              onChange={handleChange}
            />
          </label>
          <label>
            Cuisine Type
            <input
              type="text"
              name="cuisineType"
              placeholder="cuisine type"
              value={currentTruck.cuisineType}
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
              value={currentTruck.currentLocation.location.latitude}
              onChange={handleChange}
            />
          </label>
          <label>
            Longitude
            <input
              type="text"
              name="longitude"
              placeholder="longitude"
              value={currentTruck.currentLocation.location.longitude}
              onChange={handleChange}
            />
          </label>
          <label>
            Distortion
            <input
              type="text"
              name="distortion"
              placeholder="distortion"
              value={currentTruck.currentLocation.location.distortion}
              onChange={handleChange}
            />
          </label>
          <label>
            Departure Time
            <input
              type="text"
              name="departureTime"
              placeholder="departure time"
              value={currentTruck.currentLocation.departureTime}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <h4>Menu</h4>
          {currentTruck.menu.map((menuItem, index) => {
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

export default EditFoodTruck;

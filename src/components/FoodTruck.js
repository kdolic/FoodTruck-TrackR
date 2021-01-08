import React from "react";
import { useParams } from "react-router";

const FoodTruck = (props) => {
  const itemID = useParams();
  const id = itemID.itemID;
  const truck = props.trucks[id];

  const handleEditTruck = () => {
    window.location.href = `/edit-truck/${id}`;
  };

  const handleReturnToDashboard = (event) => {
    //Post request
    window.location.href = "/operator-dashboard";
  };

  const handleDeleteTruck = (event) => {
    //Delete request
    window.location.href = "/operator-dashboard";
  }

  return (
    <div>
      <img src={truck.imageOfTruck} alt="foodtruck" />
      <h3>{truck.truckName}</h3>
      <div>
        <h4>Location</h4>
        <p>
          <strong>Latitude:</strong> {truck.currentLocation.location.latitude}
        </p>
        <p>
          <strong>Longitude:</strong> {truck.currentLocation.location.longitude}
        </p>
      </div>
      <div>
        <h4>Ratings</h4>
        <div>
          <h5>Rating Average</h5>
          <p>{truck.customerRatingAvg}</p>
        </div>
        <div>
          <h5>All Ratings</h5>
          {truck.customerRatings.map((rating, index) => {
            return <li key={index}>{rating}</li>;
          })}
        </div>
        <div>
          <h5>Menu</h5>
          {truck.menu.map((menuItem, index) => {
            return <li key={index}><strong>${menuItem.itemPrice}</strong> {menuItem.itemName}</li>;
          })}
        </div>
      </div>
      <button onClick={handleReturnToDashboard}>Return to Dashboard</button>
      <button onClick={handleEditTruck}>Edit Truck</button>
      <button onClick={handleDeleteTruck}>Delete Truck</button>
    </div>
  );
};

export default FoodTruck;

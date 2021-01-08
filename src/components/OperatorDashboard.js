import React from "react";

export default class OperatorDashboard extends React.Component {

  handleViewTruck = (index) => {
    window.location.href = `/trucksOwned/${index}`;
  };

  handleAddTruck = (event) => {
    window.location.href = "/add-truck"
  };

  render() {
    return (
      <div>
        <h3>Current Food Trucks</h3>
        <ol>
          {this.props.trucks.map((truck, index) => {
            return (
              <div key={index}>
                <li>
                  <h3>
                    {truck.truckName}
                    <button onClick={() => this.handleViewTruck(index)}>View</button>
                  </h3>
                </li>
              </div>
            );
          })}
        </ol>
        <button onClick={this.handleAddTruck}>Add Truck</button>
      </div>
    );
  }
}

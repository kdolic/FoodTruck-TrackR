import React, { useState } from "react";

const fakeUserLocation = {
  latitude: 37.7976,
  longitude: 145.9837,
};

const DinerDashboard = (props) => {
  const initialResults = props.trucks;
  const initialFilters = {
    nearMe: false,
    ratingAvg: null,
    cuisineType: null,
  };

  const [results, setResults] = useState(initialResults);
  const [filteredResults, setFilteredResults] = useState(initialResults);
  const [currentFilters, setCurrentFilters] = useState(initialFilters);

  const [noResults, setNoResults] = useState(false);
  const [nearMeIsVisible, setNearMeIsVisible] = useState(false);
  const [ratingAvgAreVisible, setRatingAvgAreVisible] = useState(false);
  const [cuisineTypesAreVisible, setCuisineTypesAreVisible] = useState(false);

  const toggleNearMeIsVisible = () => {
    setNearMeIsVisible(!nearMeIsVisible);
  };

  const toggleRatingAvgIsVisible = () => {
    setRatingAvgAreVisible(!ratingAvgAreVisible);
  };

  const toggleCuisineTypeIsVisible = () => {
    setCuisineTypesAreVisible(!cuisineTypesAreVisible);
  };

  const handleFilterByNearMe = (radius) => {
    let newFilteredResults = filteredResults.filter((res) => {
      console.log(res.currentLocation.location.longitude);
      let oneMile = 0.6;
      let maxDistance = radius * oneMile;
      return (
        res.currentLocation.location.latitude <=
          fakeUserLocation.latitude + maxDistance &&
        res.currentLocation.location.latitude >=
          fakeUserLocation.latitude - maxDistance &&
        res.currentLocation.location.longitude <=
          fakeUserLocation.longitude + maxDistance &&
        res.currentLocation.location.longitude >=
          fakeUserLocation.longitude - maxDistance
      );
    });
    //console.log(newFilteredResults);
    setCurrentFilters({ ...currentFilters, nearMe: true });
    setFilteredResults(newFilteredResults);
  };

  const handleFilterByAvgRating = (minNumberOfStars, maxNumberOfStars) => {
    let newFilteredResults = filteredResults.filter((res) => {
      return (
        res.customerRatingAvg >= minNumberOfStars &&
        res.customerRatingAvg <= maxNumberOfStars
      );
    });
    setCurrentFilters({
      ...currentFilters,
      ratingAvg: `${minNumberOfStars}-${maxNumberOfStars}`,
    });
    setFilteredResults(newFilteredResults);
  };

  const handleFilterByCuisineType = (event, cuisineType) => {
    let newFilteredResults = filteredResults.filter((res) => {
      return res.cuisineType === cuisineType;
    });
    setCurrentFilters({ ...currentFilters, cuisineType: cuisineType });
    setFilteredResults(newFilteredResults);
  };

  const handleApplyFilters = (event) => {
    setResults(filteredResults);
    setCuisineTypesAreVisible(false);
    setRatingAvgAreVisible(false);
    setNearMeIsVisible(false);
    if (filteredResults.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  };

  const handleUndoFilters = (event) => {
    setResults(initialResults);
    setFilteredResults(initialResults);
    setNoResults(false);
    setCurrentFilters(initialFilters);
  };

  return (
    <div>
      <h3>All Food Trucks</h3>
      {(currentFilters.nearMe ||
        currentFilters.ratingAvg ||
        currentFilters.cuisineType) && (
        <div>
          <h5>Filters</h5>
        <p>{currentFilters.nearMe ? "near me" : ""}</p>
        <p>{currentFilters.ratingAvg ? `Avg Rating: ${currentFilters.ratingAvg}` : ""}</p>
        <p>{currentFilters.cuisineType ? `cuisine type: ${currentFilters.cuisineType}` : ""}</p>
        </div>
      )}
      <button onClick={toggleNearMeIsVisible}>Filter By Location</button>
      <button onClick={toggleRatingAvgIsVisible}>
        Filter By Rating Average
      </button>
      <button onClick={toggleCuisineTypeIsVisible}>
        Filter By Cuisine Type
      </button>
      {nearMeIsVisible && (
        <div>
          <button onClick={() => handleFilterByNearMe(1)}>
            Filter By Near Me
          </button>
        </div>
      )}
      {ratingAvgAreVisible && (
        <div>
          <button onClick={(event) => handleFilterByAvgRating(1, 2)}>
            1-2 Stars
          </button>
          <button onClick={(event) => handleFilterByAvgRating(3, 4)}>
            3-4 Stars
          </button>
          <button onClick={(event) => handleFilterByAvgRating(5, 5)}>
            5 Stars
          </button>
        </div>
      )}
      {cuisineTypesAreVisible && (
        <div>
          {props.trucks.map((truck, index) => {
            return (
              <div key={index}>
                <button
                  onClick={(event) =>
                    handleFilterByCuisineType(event, truck.cuisineType)
                  }
                >
                  {truck.cuisineType}
                </button>
              </div>
            );
          })}
        </div>
      )}
      
      {(nearMeIsVisible || ratingAvgAreVisible || cuisineTypesAreVisible) && (
        <div>
          <div>
            <button onClick={handleApplyFilters}>Apply Filters</button>
          </div>
          <div>
            <button onClick={handleUndoFilters}>Undo Filters</button>
          </div>
        </div>
      )}
      <div>
        {noResults && (
          <div>
            Oops, it looks like there aren't any trucks that match your
            filter...
          </div>
        )}
      </div>
      {results.map((truck, index) => {
        return (
          <div key={index}>
            <img src={truck.imageOfTruck} alt="foodtruck" />
            <h3>{truck.truckName}</h3>
            <div>
              <h4>Location</h4>
              <p>
                <strong>Latitude:</strong>{" "}
                {truck.currentLocation.location.latitude}
              </p>
              <p>
                <strong>Longitude:</strong>{" "}
                {truck.currentLocation.location.longitude}
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
                  return (
                    <li key={index}>
                      <strong>${menuItem.itemPrice}</strong> {menuItem.itemName}
                    </li>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DinerDashboard;

# FoodTruck TrackR
## Lambda School Build Week ##

Deployment: https://food-trucktrackr.herokuapp.com/

## ☝️ Pitch

Every true "foodie" worth their salt knows that some of the best food in any city can be found on food trucks - but knowing when and where those trucks will be can be next to impossible, and discovering new ones often relies on word-of-mouth that is long on tales of delicious, but short on actual details.

Every true "foodie" worth their salt knows that some of the best food in any city can be found on food trucks - but knowing when and where those trucks will be can be next to impossible, and discovering new ones often relies on word-of-mouth that is long on tales of delicious, but short on actual details.

## ✅  MVP
**Web**
1. `User` can register / create an account as either a `operator` or `diner` by providing at minimum a unique `username`, a valid `email` and a `password`. 
2. `User` can log in as an `operator` or `diner` using the `username` and `password` provided on sign-up / account creation. 
3. Each `diner` must have the following properties:
- `username`: String
- `password`: String
- `currentLocation`: GPS coordinates or physical address
- `favoriteTrucks`: Array of the `diner`'s favorite trucks
- `currentLocation`: GPS coordinates or physical address
- `favoriteTrucks`: Array of the `diner`s favorite trucks
4. ****Each `operator` must have the following properties:
- `username`: String
- `password`: String
- `trucksOwned`: Array of `trucks` that the `operator` owns.
5. An authenticated `operator` can create, view, update and delete a `truck` object. A `truck` must have the following properties: 
- `imageOfTruck`: Image or image URL
- `cuisineType`: String
- `customerRatings`: Array of all `customerRating` values
- `customerRatingAvg`: Integer equal to the mean of the values contained in the `truck``s `customerRatings` array.
6. A `truck` will have `menu` comprised of `menuItems`. This object must have the following properties:
- `itemName`: String
- `itemDescription`: String
- `itemPhotos`: Array of images or image URLs
- `itemPrice`: Integer
- `customerRatings`: Array of all `customerRating` values
- `customerRatingAvg`: Integer equal to the mean of the values in `customerRatings` array.
6. A `truck` will have a ****`currentLocation.` This object must have the following properties:
- `location`: GPS coordinates or physical address of the current location of the `truck`
- `departureTime`: Date and time that the `truck` will depart the `currentLocation`
7**.** An **a**uthenticated `diner` can search for `trucks` by the following criteria: 
- `trucks` near the `diner`'s `currentLocation`. Query should return all `truck`s with a `currentLocation` within the default `radSize`.
R**esults must also be filterable by the following properties:**
- `cuisineType` of a `truck`
- `customerRatingAvg` of a `truck`
- `radSize`: Desired radius distance from `user`'s `currentLocation` (should use the default value for `radSize` if not specified by `diner`)

## 🏃‍♀️ Stretch
1. Authenticated operator can create, update and delete a promotion for a truck and / or a menuItem that will be displayed on their truck profile. When the promotion is created a push notification with details of the promotion should be sent to any diner who has that truck in their favoriteTrucks list
2. Authenticated diner can upload photos of menuItems or a truck when they are within a given radSize from a truck

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

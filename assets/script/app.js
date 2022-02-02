// Strict mode syntax
"use strict";

// Fetch Travel Advisor API function
const getTravelAPI = async (lat, lon) => {
  // Fixed variables
  const limit = 5;
  const currency = "GBP";
  const distance = 2;
  const isOpen = false;
  const units = "km";
  const language = "en_GB";
  try {
    const response = await fetch(
      `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${lat}&longitude=${lon}&limit=${limit}&currency=${currency}&distance=${distance}&open_now=${isOpen}&lunit=${units}&lang=${language}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          "x-rapidapi-key":
            "aecfde690amsh510c913a3f6a211p18e79fjsn70ac88404b3f",
        },
      }
    );
    if (response.ok) {
      // Return the response data json
      const data = await response.json();
      return renderOutput(data);
    } else {
      console.log(`Error: ${response.statusText}`);
    }
  } catch (error) {
    console.log(`Unable to connect to Travel Advisor`);
  }
};

let restaurants;

// Render Travel Advisor Output function
const renderOutput = (data) => {
  restaurants = data.data;
  // Loop over the data array
  restaurants.forEach((restaurant) => {
    console.log(restaurant);
    // Do Stuff here
  });
};

// Run Travel Advisor function - Birmingham
getTravelAPI(52.48142, -1.89983);

// map data fetch

let townInput = 'Birmingham'
let mapData;
fetch(
  `https://geocode.search.hereapi.com/v1/geocode?q=${townInput}&apiKey=CKReAVlxRYgsLhXPUI3tRrhdngw1rBQNvm426xif23M`
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    mapData = data;
  });


  // render a map

    /**
 * Moves the map to display over lat lon
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function moveMapToLocation(map){
  map.setCenter({lat:52.48, lng:-1.89});
  map.setZoom(14);
}

/**
 * Boilerplate map initialization code starts below:
 */

//Step 1: initialize communication with the platform
var platform = new H.service.Platform({
  apikey: 'CKReAVlxRYgsLhXPUI3tRrhdngw1rBQNvm426xif23M'
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map - this map is centered over Europe
var map = new H.Map(document.getElementById('mapContainer'),
  defaultLayers.vector.normal.map,{
  center: {lat:50, lng:5},
  zoom: 4,
  pixelRatio: window.devicePixelRatio || 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Now use the map as required...
window.onload = function () {
  moveMapToLocation(map);
}
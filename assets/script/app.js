// Strict mode syntax
"use strict";

// Fetch Travel Advisor API function
const getTravelAPI = async (lat, lon) => {
  // Fixed variables
  const limit = 5;
  const currency = "USD";
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

// Render Travel Advisor Output function
const renderOutput = (data) => {
  const restaurants = data.data;
  // Loop over the data array
  restaurants.forEach((restaurant) => {
    console.log(restaurant);
    // Do Stuff here
  });
};

// Run Travel Advisor fucntion - Birmingham
getTravelAPI(52.48142, -1.89983);

// Openlayers Map
// Icons
const iconNottingham = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([-2, 53])),
  name: "Somewhere near Nottingham",
});

const iconBrum = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([-1.90769, 52.47853])),
  name: "Somewhere in Brum",
});

const iconLondon = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([-0.125, 51.50714])),
  name: "Somewhere in London",
});

// Map
const map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
    new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [iconNottingham, iconBrum, iconLondon],
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 46],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: "./assets/images/icon.png",
        }),
      }),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-1.9076915516146231, 52.4785349725096]),
    zoom: 8,
  }),
});

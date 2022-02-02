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

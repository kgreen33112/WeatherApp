import "./style.css";

// Define input, form, and API
const cityInput = document.getElementById('locationInput');

const weatherForm = document.getElementById('checkWeatherForm');

const apiKey = "963S5TQ9QB2TY9UEN2WC93KPX";

const checkWeatherBtn = document.getElementById('checkWeatherBtn');

checkWeatherBtn.addEventListener("click", () => {
  displayWeatherForm();
});

// Display form
function displayWeatherForm() {
  const weatherForm = document.getElementById('checkWeatherForm');
  weatherForm.style.display = "block";
}

// Form event listener
weatherForm.addEventListener("submit", async(e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      
      displayWeather(weatherData);
    } catch (error) {
      console.log("Error:", error);
    }
  }
});

// Collect weather data
async function getWeatherData(city) {
  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      mode: "cors",
      headers: {
      "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch(error) {
    console.error("Fetch Error:", error);
    throw error;
  }
}

// Function to display weather
function displayWeather(weatherData) {
  console.log("Weather data received:", weatherData);
  const weatherContainer = document.getElementById('weatherContainer');
  
  weatherContainer.textContent = "";
  
  
  if (weatherData && weatherData.currentConditions)
    {
      const cityName = document.createElement('div');
      cityName.textContent = weatherData.address;
      cityName.classList.add("city");
      
      const cityTemp = document.createElement('h1');
      cityTemp.textContent = `${weatherData.currentConditions.temp} °F`;
      
            //cityTemp.className.add("city-temp");

      weatherContainer.appendChild(cityName);
      weatherContainer.appendChild(cityTemp);
     
    }
}
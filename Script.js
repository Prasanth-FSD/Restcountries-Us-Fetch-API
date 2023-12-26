const url = "https://restcountries.com/v3.1/all";
const apiKey = "11a1a70f88f93d84c02889beb29c768e";

const fetchWeather = (lat, lon, googleMaps) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    return fetch(weatherUrl)
        .then((response) => response.json())
        .then((weatherInfo) => ({ googleMaps, ...weatherInfo }));
};

const containerDiv = document.createElement('div');
containerDiv.className = 'container';

const titleElement = document.createElement('h1');
titleElement.id = 'title';
titleElement.className = 'text-center';
titleElement.textContent = 'Restcountries & Weather using Fetch API';

const countryContainer = document.createElement('div');
countryContainer.className = 'row row-cols-1 row-cols-md-3 g-4';
countryContainer.id = 'countryContainer';

containerDiv.appendChild(titleElement);
containerDiv.appendChild(countryContainer);

document.body.appendChild(containerDiv);

const handleWeatherButtonClick = (lat, lon, googleMaps, weatherContainer) => {
    fetchWeather(lat, lon, googleMaps)
        .then((weatherInfo) => {
            weatherContainer.innerHTML = `<br>
                 <p>Weather: ${weatherInfo.weather[0].description}</p>
                <p>Temperature: ${weatherInfo.main.temp} &#8451;</p>
                ${weatherInfo.googleMaps ? `<p>googleMaps: <a target="_blank" href="${weatherInfo.googleMaps}">Click To Locate</a></p>` : ''}
            `;
        })
        .catch((error) => {
            console.error("Error fetching weather data", error);
            weatherContainer.innerHTML = "<p>Error fetching weather data</p>";
        });
};

const result = fetch(url);
result
    .then((data) => data.json())
    .then((ele) => {
        for (let i = 0; i < ele.length; i++) {
            const card = document.createElement("div");
            card.className = "col";
            card.innerHTML = `
                <div class="card">
                    <div class="card-header">${ele[i].name.common}</div>
                    <img src="${ele[i].flags.png}" class="card-img-top" style="height: 150px;">
                    <div class="card-body">
                        <h5 class="card-title">Capital: ${ele[i].capital}</h5>
                        <h5 class="card-title">Region: ${ele[i].region}</h5>
                        <h5 class="card-title">Sub Region: ${ele[i].subregion}</h5>
                        <h5 class="card-title">Country Code: ${ele[i].cca2}</h5>
                        <h5 class="card-title">LatLng: ${ele[i].latlng}</h5>
                    </div>
                    <button class="btn btn-primary" onclick="handleWeatherButtonClick(${ele[i].latlng[0]}, ${ele[i].latlng[1]}, '${ele[i].maps?.googleMaps}', this.nextElementSibling)">Click for Weather</button>
                    <div class="weather-container"></div>
                </div>
            `;
            countryContainer.appendChild(card);
        }
    })
    .catch((error) => {
        console.error("Error fetching country data", error);
    });

const apiKey = 'f49f55a732fb887c3d8a063e5b76367a';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather(city) {
    try {
        console.log(`Fetching weather for city: ${city}`); 
        const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;  
        const response = await fetch(url);  
        console.log(`response status:${response.status}`);
        
        if (!response.ok) {
            console.log(`Error: ${response.statusText}`);
            throw new Error('city not found');
        }

        const data = await response.json();
        console.log('weather data received:', data);
        displayWeather(data);
    } catch (error) {
        console.log('error fetching weather:',error);
        document.getElementById('weatherResult').innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(data) {
    const weatherHtml = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
    document.getElementById('weatherResult').innerHTML = weatherHtml;
}



document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    console.log(`City entered: ${city}`);
    if (city) {
        getWeather(city);
    } else {
        document.getElementById('weatherResult').innerHTML = '<p>Please enter a city name</p>';
    }
});

document.getElementById('city').addEventListener('keydown', function(event) {
    if(event.key==="Enter")
    {
        const city = document.getElementById('city').value;
        console.log(`City entered: ${city}`);
        if (city) {
            getWeather(city);
        } else {
            document.getElementById('weatherResult').innerHTML = '<p>Please enter a city name</p>';
        }
    }
});

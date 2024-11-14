window.onload = function () {
    const form = document.getElementById("weather-form");
    const weatherDataDiv = document.getElementById('weatherData');

    form.addEventListener('submit', validateForm());
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;

        const localURL = `http://localhost:3000/weather?city=${city}&state=${state}`;
        const response = await fetch(localURL)
        const data = await response.json();

        const temperature = data.temperature;
        const weatherDescription = data.description
        const windSpeed = data.windSpeed;
        const condition = data.condition;

        function getTheme(condition) {
            switch (condition) {
                case 'Sunny':
                    return { backgroundColor: 'lightyellow', color: 'black' };
                case 'Clouds':
                    return { backgroundColor: 'gray', color: 'white' };
                case 'Rainy':
                    return { backgroundColor: 'blue', color: 'white' };
                case 'Snowy':
                    return { backgroundColor: 'lightgray', color: 'black' };
                default:
                    return { backgroundColor: 'yellow', color: 'black' };
            }
        }
        function getIcon(condition) {
            let icon = '';
            switch (condition) {
                case 'Clear':
                    icon = '/duck-svgrepo-com.svg';
                    break;
                case 'Clouds':
                    icon = '/cloud-svgrepo-com.svg';
                    break;
                case 'Rain':                
                    icon = '/rain-svgrepo-com.svg';
                    break;
                case 'Snow':
                    icon = '/snow-svgrepo-com.svg';
                    break;
                case 'Sunny':
                    icon = '/sun-sunny-svgrepo-com.svg';
                    break;
                default:
                    icon = '/duck-svgrepo-com.svg';
            }

            return icon;
        }

        weatherDataDiv.innerHTML = `
        <h2>Weather in ${city}, ${state}</h2>
            <p>${weatherDescription}</p>
            <p>Temperature: ${temperature} °F</p>
            <p>Wind Speed: ${windSpeed} mph</p>
            <p>Condition: ${condition}</p>
        `;

        const theme = getTheme(condition);
        weatherDataDiv.style.backgroundColor = theme.backgroundColor;
        const icon = getIcon(condition);
        weatherDataDiv.innerHTML += `<img src="${icon}" alt="${condition}">`;
    });
}

function validateForm(event) {

    const cityInput = document.getElementById("city")
    const stateInput = document.getElementById("state")

    if(stateInput.innerText.length > 2){
        document.getElementById("weatherData").innerHTML = `<p>State ID is invalid<p>`
        event.preventDefault();
    }
}
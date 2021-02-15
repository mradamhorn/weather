let apiKey = '98a0b814d992d116fe262181b9c7399d';
let currentWeather = document.querySelector('#currentWeather');
let weatherForecast = document.querySelector('#fiveDayForecast');
let currentWeather1 = document.querySelector('#currentWeather1');
let forecastRow = document.querySelector('.forecastRow');
let cityName = document.querySelector('#cityName');
let searchBtn = document.querySelector('.search-button');


let city = '';
let query = '';
let date = '';
let temp = '';
let humid = '';
let windSpeed = '';
let uvIndex = '';
let icon = '';

$(searchBtn).click(function () {

    // Clear previous results
    currentWeather.innerHTML = '';
    currentWeather1.innerHTML = '';
    weatherForecast.innerHTML = '';
    forecastRow.innerHTML = '';
    cityName.innerHTML = '';


    city = document.querySelector('#city-input').value;
    console.log(city)

    if (city === '') {
        return;
    } else {
        query = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=imperial';
        fetch(query).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            let latitude = data.coord.lat;
            let longitude = data.coord.lon;
            city = data.name;
            icon = data.weather[0].icon;
            temp = data.main.temp;
            humid = data.main.humidity;
            windSpeed = data.wind.speed;
            getForcast(latitude, longitude);

        })

    }

});

function getForcast(lat, lon) {
    let forcastQuery = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely&appid=' + apiKey + '&units=imperial';

    fetch(forcastQuery).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        uvIndex = data.current.uvi;

        fiveDayForecast(data.daily);
        displayWeather();

    })
}



function displayWeather() {
    let todayWeather = document.createElement('h1');
    todayWeather.setAttribute('id', 'city-selected');
    cityName.appendChild(todayWeather);
    todayWeather.innerHTML = city + '<hr>';

    let current = document.createElement('h3');
    current.setAttribute('id', 'current');
    currentWeather.appendChild(current);
    current.textContent = 'Current Weather';

    let currentDay = document.createElement('h5');
    let today = moment().format('MMMM D, YYYY');
    currentDay.setAttribute('id', 'currentDate');
    currentWeather1.appendChild(currentDay);
    currentDay.textContent = today;

    let weatherIcon = document.createElement('img');
    weatherIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + icon + '.png');
    weatherIcon.setAttribute('id', 'weather-icon');
    currentWeather1.appendChild(weatherIcon);

    let currentTemp = document.createElement('div');
    currentTemp.setAttribute('id', 'current-temp');
    currentWeather1.appendChild(currentTemp);
    currentTemp.textContent = 'Temperature: ' + temp + ' °F';

    let currentHumid = document.createElement('div');
    currentHumid.setAttribute('id', 'current-humid');
    currentWeather1.appendChild(currentHumid);
    currentHumid.textContent = 'Humidity: ' + humid + ' %';

    let currentWind = document.createElement('div');
    currentWind.setAttribute('id', 'current-wind');
    currentWeather1.appendChild(currentWind);
    currentWind.textContent = 'Wind Speed: ' + windSpeed + ' mph';

    let currentUVI = document.createElement('div');
    currentUVI.setAttribute('id', 'current-uvi');
    currentWeather1.appendChild(currentUVI);
    currentUVI.textContent = 'UV Index: ' + uvIndex;
}

function fiveDayForecast(data) {
    let fiveDayFC = document.createElement('h3');
    fiveDayFC.setAttribute('id', 'fiveDay');
    weatherForecast.appendChild(fiveDayFC);
    fiveDayFC.textContent = '5-Day Forecast';


    for (let i = 1; i < 6; i++) {
        let dayWeather = data[i - 1];
        let forecastCol = document.createElement('div');
        forecastCol.classList.add('col-2');
        let dayForecast = document.createElement('h6');
        let forecastDate = moment().add(i, 'days').format('MMMM D, YYYY');
        forecastRow.appendChild(forecastCol);
        forecastCol.appendChild(dayForecast);
        dayForecast.textContent = forecastDate;

        let dayIcon = document.createElement('img');
        dayIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + dayWeather.weather[0].icon + '.png');
        forecastCol.appendChild(dayIcon);

        let dayDetails = document.createElement('div');
        forecastCol.appendChild(dayDetails);
        dayDetails.innerHTML = 'Temp: ' + dayWeather.temp.day + ' °F'
            + '<br>Max: ' + dayWeather.temp.max + ' °F'
            + '<br>Min: ' + dayWeather.temp.min + ' °F'
            + '<br>Humidity: ' + dayWeather.humidity + ' %';
    }
}

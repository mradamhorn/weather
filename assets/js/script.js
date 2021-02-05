let apiKey = '98a0b814d992d116fe262181b9c7399d';
let currentWeather = document.querySelector('#currentWeather');
let weatherForecast = document.querySelector('#fiveDayForecast');
let currentWeather1 = document.querySelector('#currentWeather1');
let weatherForecast1 = document.querySelector('#weatherForecast1');
let weatherForecast2 = document.querySelector('#weatherForecast2');
let weatherForecast3 = document.querySelector('#weatherForecast3');
let weatherForecast4 = document.querySelector('#weatherForecast4');
let weatherForecast5 = document.querySelector('#weatherForecast5');
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

let oneIcon;
let twoIcon;
let threeIcon;
let fourIcon;
let fiveIcon;

let oneTemp;
let twoTemp;
let threeTemp;
let fourTemp;
let fiveTemp;

let oneTempMin;
let twoTempMin;
let threeTempMin;
let fourTempMin;
let fiveTempMin;

let oneTempMax;
let twoTempMax;
let threeTempMax;
let fourTempMax;
let fiveTempMax;

let oneHumid;
let twoHumid;
let threeHumid;
let fourHumid;
let fiveHumid;



$(searchBtn).click(function () {

    // Clear previous results
    currentWeather.innerHTML = '';
    currentWeather1.innerHTML = '';
    weatherForecast.innerHTML = '';
    weatherForecast1.innerHTML = '';
    weatherForecast2.innerHTML = '';
    weatherForecast3.innerHTML = '';
    weatherForecast4.innerHTML = '';
    weatherForecast5.innerHTML = '';
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

        oneIcon = data.daily[0].weather[0].icon;
        twoIcon = data.daily[1].weather[0].icon;
        threeIcon = data.daily[2].weather[0].icon;
        fourIcon = data.daily[3].weather[0].icon;
        fiveIcon = data.daily[4].weather[0].icon;

        oneTempDay = data.daily[0].temp.day;
        twoTempDay = data.daily[1].temp.day;
        threeTempDay = data.daily[2].temp.day;
        fourTempDay = data.daily[3].temp.day;
        fiveTempDay = data.daily[4].temp.day;

        oneTempMin = data.daily[0].temp.min;
        twoTempMin = data.daily[1].temp.min;
        threeTempMin = data.daily[2].temp.min;
        fourTempMin = data.daily[3].temp.min;
        fiveTempMin = data.daily[4].temp.min;

        oneTempMax = data.daily[0].temp.max;
        twoTempMax = data.daily[1].temp.max;
        threeTempMax = data.daily[2].temp.max;
        fourTempMax = data.daily[3].temp.max;
        fiveTempMax = data.daily[4].temp.max;

        oneHumid = data.daily[0].humidity;
        twoHumid = data.daily[1].humidity;
        threeHumid = data.daily[2].humidity;
        fourHumid = data.daily[3].humidity;
        fiveHumid = data.daily[4].humidity;

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

    fiveDayForecast();
}

function fiveDayForecast() {
    let fiveDayFC = document.createElement('h3');
    fiveDayFC.setAttribute('id', 'fiveDay');
    weatherForecast.appendChild(fiveDayFC);
    fiveDayFC.textContent = '5-Day Forecast';

    // Day 1 of forecast
    let dayOneForecast = document.createElement('h6');
    let dayOneDate = moment().add(1, 'days').format('MMMM D, YYYY');
    dayOneForecast.setAttribute('id', 'dayOneForecast');
    weatherForecast1.appendChild(dayOneForecast);
    dayOneForecast.textContent = dayOneDate;

    let dayOneIcon = document.createElement('img');
    dayOneIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + icon + '.png');
    weatherForecast1.appendChild(dayOneIcon);

    let dayOneDetails = document.createElement('div');
    dayOneDetails.setAttribute('id', 'dayOneDetails');
    weatherForecast1.appendChild(dayOneDetails);
    dayOneDetails.innerHTML = 'Temp: ' + oneTempDay + ' °F'
        + '<br>Max: ' + oneTempMax + ' °F'
        + '<br>Min: ' + oneTempMin + ' °F'
        + '<br>Humidity: ' + oneHumid + ' %';

    // Day 2 of forecast
    let dayTwoForecast = document.createElement('h6');
    let dayTwoDate = moment().add(2, 'days').format('MMMM D, YYYY');
    dayTwoForecast.setAttribute('id', 'dayTwoForecast');
    weatherForecast2.appendChild(dayTwoForecast);
    dayTwoForecast.textContent = dayTwoDate;

    let dayTwoIcon = document.createElement('img');
    dayTwoIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + icon + '.png');
    weatherForecast2.appendChild(dayTwoIcon);

    let dayTwoDetails = document.createElement('div');
    dayTwoDetails.setAttribute('id', 'dayTwoDetails');
    weatherForecast2.appendChild(dayTwoDetails);
    dayTwoDetails.innerHTML = 'Temp: ' + twoTempDay + ' °F'
        + '<br>Max: ' + twoTempMax + ' °F'
        + '<br>Min: ' + twoTempMin + ' °F'
        + '<br>Humidity: ' + twoHumid + ' %';

    // Day 3 of forecast
    let dayThreeForecast = document.createElement('h6');
    let dayThreeDate = moment().add(3, 'days').format('MMMM D, YYYY');
    dayThreeForecast.setAttribute('id', 'dayThreeForecast');
    weatherForecast3.appendChild(dayThreeForecast);
    dayThreeForecast.textContent = dayThreeDate;

    let dayThreeIcon = document.createElement('img');
    dayThreeIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + icon + '.png');
    weatherForecast3.appendChild(dayThreeIcon);

    let dayThreeDetails = document.createElement('div');
    dayThreeDetails.setAttribute('id', 'dayThreeDetails');
    weatherForecast3.appendChild(dayThreeDetails);
    dayThreeDetails.innerHTML = 'Temp: ' + threeTempDay + ' °F'
        + '<br>Max: ' + threeTempMax + ' °F'
        + '<br>Min: ' + threeTempMin + ' °F'
        + '<br>Humidity: ' + threeHumid + ' %';

    // Day 4 of forecast
    let dayFourForecast = document.createElement('h6');
    let dayFourDate = moment().add(4, 'days').format('MMMM D, YYYY');
    dayFourForecast.setAttribute('id', 'dayFourForecast');
    weatherForecast4.appendChild(dayFourForecast);
    dayFourForecast.textContent = dayFourDate;

    let dayFourIcon = document.createElement('img');
    dayFourIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + icon + '.png');
    weatherForecast4.appendChild(dayFourIcon);

    let dayFourDetails = document.createElement('div');
    dayFourDetails.setAttribute('id', 'dayFourDetails');
    weatherForecast4.appendChild(dayFourDetails);
    dayFourDetails.innerHTML = 'Temp: ' + fourTempDay + ' °F'
        + '<br>Max: ' + fourTempMax + ' °F'
        + '<br>Min: ' + fourTempMin + ' °F'
        + '<br>Humidity: ' + fourHumid + ' %';

    // Day 5 of forecast
    let dayFiveForecast = document.createElement('h6');
    let dayFiveDate = moment().add(5, 'days').format('MMMM D, YYYY');
    dayFiveForecast.setAttribute('id', 'dayFiveForecast');
    weatherForecast5.appendChild(dayFiveForecast);
    dayFiveForecast.textContent = dayFiveDate;

    let dayFiveIcon = document.createElement('img');
    dayFiveIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + icon + '.png');
    weatherForecast5.appendChild(dayFiveIcon);

    let dayFiveDetails = document.createElement('div');
    dayFiveDetails.setAttribute('id', 'dayFiveDetails');
    weatherForecast5.appendChild(dayFiveDetails);
    dayFiveDetails.innerHTML = 'Temp: ' + fiveTempDay + ' °F'
        + '<br>Max: ' + fiveTempMax + ' °F'
        + '<br>Min: ' + fiveTempMin + ' °F'
        + '<br>Humidity: ' + fiveHumid + ' %';
}

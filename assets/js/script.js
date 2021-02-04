let apiKey = '98a0b814d992d116fe262181b9c7399d';
let currentWeather = document.querySelector('#currentWeather');
let weatherForecast = document.querySelector('#weatherForecast');
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

let oneHumid;
let twoHumid;
let threeHumid;
let fourHumid;
let fiveHumid;


$(searchBtn).click(function () {

    // Clear previous results
    currentWeather.innerHTML = '';
    weatherForecast.innerHTML = '';
    cityName.innerHTML = '';


    city = document.querySelector('#city-input').value;
    console.log(city)

    if (city === ''){
        return;
    } else {
        query = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey+'&units=imperial';
        fetch(query).then(function(response){
            return response.json();
        }).then(function (data){
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

function getForcast(lat, lon){
    let forcastQuery = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=minutely&appid='+apiKey+'&units=imperial';

    fetch(forcastQuery).then(function(response){
        return response.json();
    }).then(function (data){
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
    current.setAttribute('id','current');
    currentWeather.appendChild(current);
    current.textContent = 'Current Weather';

    let weatherIcon = document.createElement('img');
    weatherIcon.setAttribute('src', 'https://openweathermap.org/img/wn/'+icon+'.png');
    weatherIcon.setAttribute('id','weather-icon');
    currentWeather.appendChild(weatherIcon);

    let currentTemp = document.createElement('p');
    currentTemp.setAttribute('id', 'current-temp');
    currentWeather.appendChild(currentTemp);
    currentTemp.textContent = 'Temperature: ' + temp + ' °F';

    let currentHumid = document.createElement('p');
    currentHumid.setAttribute('id', 'current-humid');
    currentWeather.appendChild(currentHumid);
    currentHumid.textContent = 'Humidity: ' + humid + ' %';

    let currentWind = document.createElement('p');
    currentWind.setAttribute('id', 'current-wind');
    currentWeather.appendChild(currentWind);
    currentWind.textContent = 'Wind Speed: ' + windSpeed + ' mph';

    let currentUVI = document.createElement('p');
    currentUVI.setAttribute('id', 'current-uvi');
    currentWeather.appendChild(currentUVI);
    currentUVI.textContent = 'UV Index: ' + uvIndex;
}

function fiveDayForecast() {
    let fcOne = document.querySelector('#forecast-1');
    let oneIcon = document.createElement('img');
    oneIcon.setAttribute('src', 'https://openweathermap.org/img/wn/'+icon+'.png');
    fcOne.appendChild(oneIcon);
    oneIcon.textContent = '';

    let  = document.createElement('p');
    fcOne.appendChild(oneTemp);
    oneTemp.textContent = '';

    let oneHumid = document.createElement('p');
    fcOne.appendChild(oneHumid);
    oneHumid.textContent = '';

}

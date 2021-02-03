let apiKey = '98a0b814d992d116fe262181b9c7399d';
let city = '';
let query = '';
let currentWeather = document.querySelector('#currentWeather');
let weatherForecast = document.querySelector('#weatherForecast');
let searchBtn = document.querySelector('.search-button')



$(searchBtn).click(function () {
    city = document.querySelector('#city-input').value;
    console.log(city)

    if (city === ''){
        return;
    } else {
        query = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey;
        fetch(query).then(function(response){
            return response.json();
        }).then(function (data){
            console.log(data);
            let latitude = data.coord.lat;
            let longitude = data.coord.lon;
            getForcast(latitude, longitude);
            
            function displayWeather() {
                let todayWeather = document.createElement('h2');
                currentWeather.appendChild(todayWeather);
                todayWeather.textContent = ''
            }
        })
    }
    
});

function getForcast(lat, lon){
    let forcastQuery = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=minutely&appid='+apiKey;

    fetch(forcastQuery).then(function(response){
        return response.json();
    }).then(function (data){
        console.log(data);
    })
}





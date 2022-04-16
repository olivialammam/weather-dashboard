// Display Current Date at top

var currentDate = moment().format('dddd, MMMM Do, YYYY')
$('#currentDay').append(document.createTextNode(currentDate))

// get present hour
var present = moment().hour();

var API_KEY = 'ba883830f9831efcb004b0fb81b18d9c';
var searchBtn = $('#search-button');


function searchWeather() {

    //1. fetcht the latand lon for the city entered 
    // https://api.openweathermap.org/data/2.5/weather?q=London&appid={API key}
var cityNameInput = $("#query").val(); 
console.log(cityNameInput); 
console.log("URL", 'https://api.openweathermap.org/data/2.5/weather?q='+ cityNameInput+'&appid='+API_KEY); 
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ cityNameInput+'&appid='+API_KEY)
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        var latitude = data.coord.lat; 
        var longitude = data.coord.lon;
        var API_URL = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ latitude+'&lon='+ longitude +'&appid='+API_KEY+'&exclude=minutely,alerts,hourly&units=imperial';
        
        //2. get the current and forecast weather for the city search based on latitude and longitude for the same 
    fetch(API_URL)
        .then(response => response.json())
        .then(data2 => {
            console.log("one call response", data2); 

        //display the api response on the HTML pagr 
        $('#currentTemperature').text("Temperature: "+ data2.current.temp);
        $('#currentWind').text("Wind: "+ data2.current.wind_speed);
        $('#currentHumidity').text("Humidity: "+ data2.current.humidity);
        $('#currentUvindex').text("UV Index: "+ data2.current.uvi);
    });
    });


    console.log("Testingthe function ");
   

}

//event listener 
searchBtn.on('click', function (event) {
    event.preventDefault();
    searchWeather()
}); 

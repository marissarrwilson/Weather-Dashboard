'use strict'
//Global Variables 
var apiKey = "6d5c05d695c258c26331ffda6614ba80";
var weatherBaseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var weatherQueryParams = '&units=imperial&APPID=' + apiKey;


//Create a function that will execute the Weather AJAX call
var searchCurrentWeather = function (city) {
    var queryURL = weatherBaseURL + city + weatherQueryParams;
    console.log("searchCurrentWeather: ", queryURL);

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {

            console.log(response);

            $("#query").val('');
            var theCity = response.name || '????';
            var theTemp = response.main.temp;
            var theHumidity = response.main.humidity;
            var theWindSpeed = response.wind.speed;
            // var uvIndex = response.;
            //Description of the weather 
            var weatherIcon = response.weather[0].icon;

            //AJAX RESULT - on HTML PAGE - CURRENT WEATHER 
            createHTML(theCity, theTemp, theWindSpeed, theHumidity, weatherIcon);

            //APPEND CITY LIST ON THE LEFT 
            createCityList(theCity);
        });

}

//And then add that string to the page
function createHTML(city, temp, windspeed, humidity, weatherIcon) {
    //Setting the date format in YYYY-MM-DD 
    var todayDate = new Date().toISOString().slice(0, 10);

    //Weather Icon from open weather map creating an img tag
    var icon = ("<img src='http://openweathermap.org/img/w/" + weatherIcon + ".png'/>");


    var htmlString = '<div>' +
        '<div class="weatherCity">' + city + ' ( ' + todayDate + ')' +
        '<div class="image">' + icon + '</div> </div>' +
        '<div class="weatherData"> Temperature: ' + temp + ' °F </div>' +
        '<div class="weatherData"> Humidity: ' + humidity + ' % </div>' +
        '<div class="weatherData"> Wind Speed: ' + windspeed + ' MPH </div>' +
        '</div>';

    // Add the result to the div 
    $('#weatherResults').html(htmlString);
}

//Append the City Name on LEFT-HAND PANEL 
function createCityList(cityName) {

    //Dynamically create a div for city list 
    var cityListString = '<div class="card text-danger list-group list-group-flush">' +
        '<p id=' + cityName + '>' + cityName +
        '</p> </div>';

    //Keep adding the names of the cities searched 
    $('#searchCityResults').append(cityListString);
}

//ON PAGE LOAD 
$(document).ready(function () {

    console.log("pageloading");

    //Use jQuery to assign a (callback) function to occur when the 'search' button is clicked
    $("#search").on('click', function () {
        console.log("Clicked search");

        //Use jQuery to get the value of the 'query' input box
        var newSearchTerm = $("#query").val();
        console.log(newSearchTerm);

        //Execute the Weather API call with the 'newSearchTerm' string as its argument 
        searchCurrentWeather(newSearchTerm);

        //Forecast WEather based on the city entered

    });

})
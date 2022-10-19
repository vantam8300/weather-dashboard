let APIKey = "6e0d48ab44b7aa9166f2a5bc381f27d6";

let city = $("#city");

let form = $(".project-form");

let coordinate= {}

// get latitude and longitude given city name
function getLatnLon(cityName) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

    fetch(queryURL)
    .then(function(response){
        return response.json();
    }).then(function (data) {
        let lon = data.coord.lon;
        let lat = data.coord.lat;
        let queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" 
        + lat + "&lon=" + lon + "&appid=" +APIKey;
        return fetch(queryURL);
    }).then(function(response){
        return response.json();
    }).then(function(data) {
        console.log(data);
    });
}


function handleSubmitForm(event) {
    event.preventDefault();

    //get city name
    let cityName = city.val();
    // get Lat and Lon
    getLatnLon(cityName);
   


}

form.on("submit", handleSubmitForm)
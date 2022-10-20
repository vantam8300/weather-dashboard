let APIKey = "6e0d48ab44b7aa9166f2a5bc381f27d6";

let city = $("#city");

let form = $(".project-form");

let displayToDayDiv = $(".display-today");

let display5daysDiv = $(".display-5days");

let displaycitiesDiv = $(".display-cities");

let cities;

if (localStorage.getItem("cities")) {
    cities = localStorage.getItem("cities").split(",");
} else {
    cities = [];
}



function handleSubmitForm(event) {
    event.preventDefault();

    //get city name
    let cityName = city.val();
    // get Lat and Lon given city name
    if (cityName) {
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";

        // save a new city
        saveCities(cityName);

        // fetch API
        fectchData(queryURL);
    }


}

function fectchData(queryURL) {
    fetch(queryURL)
        .then(function (response) {

            return response.json();

        }).then(function (data) {

            printToday(data);

            let lon = data.coord.lon;
            let lat = data.coord.lat;

            // pass lat and lon to 5 days forecast API
            let queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat="
                + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";

            return fetch(queryURL);

        }).then(function (response) {

            return response.json();

        }).then(function (data) {

            print5Days(data);

        });
}

// display list of searched cities
function displayCities() {
    displaycitiesDiv.text("")

    for (var i = 0; i < cities.length; i++) {
        displaycitiesDiv.append(`<input  type="button" class="btn btn-secondary w-100 my-1" value="${cities[i]}">`);
    }
}

// save search history
function saveCities(name) {
    if (!cities.includes(name)) {
        displaycitiesDiv.append(`<input  type="button" class="btn btn-secondary w-100 my-1" value="${name}">`);
        cities.push(name);
        localStorage.setItem("cities", cities);
    }
    city.val("")
}

// get day, month, and year from API response
function handleTime(time) {

    var day = moment.unix(time).format("(DD/MM/YYYY)");

    return day;

}

// print current day
function printToday(data) {
    displayToDayDiv.text("");

    var day = handleTime(data.dt)

    var name = data.name;

    var icon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";

    let header = $(`<h2>${name + " " + day} <img src="${icon}" width="50"></img> </h2>`);

    let temp = data.main.temp;
    let tempEl = $(`<p>Temp: ${temp}&#8457</p>`)

    let wind = data.wind.speed;
    let windEl = $(`<p>Wind: ${wind} MPH</p>`)

    let humidity = data.main.humidity;
    let humidityEl = $(`<p>Humidity: ${humidity} %</p>`)

    displayToDayDiv.append(header);
    displayToDayDiv.append(tempEl);
    displayToDayDiv.append(windEl);
    displayToDayDiv.append(humidityEl);
}

// print the next 5 days
function print5Days(data) {
    display5daysDiv.text("");

    display5daysDiv.append('<h2 class="row">5-Day Forecast: </h2>');
    display5daysDiv.append('<div class="row d-flex justify-content-between" id="fiveDaycontainer">');
    var fiveDaycontainer = $("#fiveDaycontainer");
    for (var i = 1; i < data.list.length; i = i + 8) {
        var oneDayContainer = $("<div class='col-2 bg-dark text-light'>")

        var day = handleTime(data.list[i].dt)
        let header = $(`<h5>${day}</h5>`);

        var icon = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
        let iconEl = `<img src="${icon}" width="50"></img>`

        let temp = data.list[i].main.temp;
        let tempEl = $(`<p>Temp: ${temp}&#8457</p>`)

        let wind = data.list[i].wind.speed;
        let windEl = $(`<p>Wind: ${wind} MPH</p>`)

        let humidity = data.list[i].main.humidity;
        let humidityEl = $(`<p>Humidity: ${humidity}%</p>`)

        oneDayContainer.append(header);
        oneDayContainer.append(iconEl);
        oneDayContainer.append(tempEl);
        oneDayContainer.append(windEl);
        oneDayContainer.append(humidityEl);

        fiveDaycontainer.append(oneDayContainer);
    }


}

form.on("submit", handleSubmitForm);

// when searched city is clicked
displaycitiesDiv.on("click", ".btn", function (event) {
    var cityName = $(event.currentTarget).val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";

    // fetch API
    fectchData(queryURL);
});

// display searched cities
displayCities();
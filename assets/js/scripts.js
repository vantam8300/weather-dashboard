var APIKey = "6e0d48ab44b7aa9166f2a5bc381f27d6";

var city = $("#city");

var form = $(".project-form");



function handleSubmitForm(event) {
    event.preventDefault();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city.value + "&appid=" + APIKey;
    fetch(queryURL)
    .then(function(response){
        return response.json();
    }).then(function (data) {
        console.log(data)
    });


}

form.on("submit", handleSubmitForm)
var x = $("p");
const API_KEY = "d50bea07e4bd84291a882ce2330ea734";
var scope = {};

$(document).ready(function () {
    getLocation();
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
    } else {
        return 0;
    }
}

function getWeather(position) {
    var weatherApi = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=" + API_KEY;
    var units = "&units=metric";
    $.getJSON(weatherApi + units)
        .done(function (data) {
            scope.unit = 'C';
            scope.city = data.name;
            scope.toggle = false;
            getCountryName(data.sys.country);
            scope.cel = Math.round(data.main.temp);
            scope.fah = Math.round((data.main.temp * 9) / 5 + 32);
            scope.des = data.weather[0].main;
            scope.temp = scope.cel;
            scope.description = data.weather[0].description;

            for (var [key, value] of Object.entries(scope)) {
                $("#" + key).html(value);
            }
        });
}

function getCountryName(code) {
    $.getJSON("https://restcountries.eu/rest/v2/alpha/" + code)
        .done(function (response) {
            scope.country = response.name;
            $("#country").html(response.name);
        });
}

$("a#tunit").on('click', function () { toggleUnit(); });

function toggleUnit() {
    if (!scope.toggle) {
        $("#temp").html(scope.fah);
        scope.unit = 'F';
        $("#unit").html(scope.unit);
        scope.toggle = !scope.toggle;
    } else {
        $("#temp").html(scope.cel);
        scope.unit = 'C';
        $("#unit").html(scope.unit);
        scope.toggle = !scope.toggle;
    }
}

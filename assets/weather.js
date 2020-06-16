var passText = document.getElementById("inputPassword");
var searchBtn = document.getElementById("searchBtn");
var mainTxt = document.getElementById("mainBody");
var daily = document.getElementById("daily");
var citiesSec = document.getElementById("cities");
var citiesList = document.getElementById("citiesList")
var cities = [];
var APIKey = "1185a689f92365d49ec83f25a53f8191";
cityName = "";
var mainQueryURL = "api.openweathermap.org/data/2.5/forecast/daily?q="+cityName+"&cnt={cnt}&appid="+APIKey;

function renderCities(){
    for (i = cities.length; i < cities.length; i--){
        var cityName = $("<li>");
        cityName.value = cities[i];
        citiesList.append(cityName);
    }
}





searchBtn.addEventListener("click", function(event){
    $.ajax({
        url: mainQueryURL,
        method: "GET"
    }).then(function(populate){
        cityName = passText.value
        cities.push(cityName);
        console.log(cities);
        console.log(cityName);
    })
})
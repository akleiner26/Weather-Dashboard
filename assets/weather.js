var passText = document.getElementById("inputPassword");
var searchBtn = document.getElementById("searchBtn");
var mainTxt = document.getElementById("mainBody");
var daily = document.getElementById("daily");
var citiesSec = document.getElementById("cities");
var citiesList = document.getElementById("citiesList")
var cities = [];
var APIKey = "1185a689f92365d49ec83f25a53f8191";
cityName = "";
mainBodyObj = {
    cityName : " ",
    date : "",
    weatherIcon : "",
    temp: "",
    windSpd: "",
    UV: "",
}
var currentQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid=" + APIKey

function renderCities(){
    for (i = cities.length; i < cities.length; i--){
        var cityListName = $("<li>");
        cityListName.value = cities[i];
        citiesList.append(cityListName);
    }
}

function kelvToFar(temp){
    return(temp - 273.15) * 1.80+32;
}

function renderMain(){
    cityName = passText.value;
    var textHead = $("<h1>")
    cityName = current.name;
    textHead.value = cityName + " " + moment().subtract(10, 'days').calendar() + " " + weatherIcon;

    var tempPar = $("<p>");
    currentTemp = kelvToFar(current.main.temp).value;
    tempPar.value = currentTemp;

    var humPar = $("<p>");
    currentHum = current.main.humidity;
    humPar.value = currentHum;

    var windPar = $("<p>");
    currentWind = current.wind.speed
    windPar.value = currentWind + " MPH"
}

$.ajax({
    url: currentQueryURL,
    method: "GET"
}).then(function(current){
   $(searchBtn).on("click", function(){
    cities.push(passText.value)
    cityName
}) 
})



// searchBtn.addEventListener("click", function(event){

//     }).then(function(populate){
//         cityName = passText.value
//         cities.push(cityName);
//         console.log(cities);
//         console.log(cityName);
//     })
// })
var passText = $("#inputPassword");
var searchBtn = $("#searchBtn");
var mainTxt = $("#mainBody");
var daily = $("#daily");
var citiesSec = $("#cities");
var citiesList = $("#citiesList")
var cities = [];
var APIKey = "1185a689f92365d49ec83f25a53f8191";
var lon;
var lat;
var cityName = "";
mainBodyObj = {
    cityName : " ",
    date : "",
    weatherIcon : "",
    temp: "",
    windSpd: "",
    UV: "",
}
citiesObj = {
    current: "",
    second: "",
    third:"",
    fourth: "",
    fifth: "",
}
var currentQueryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=" + APIKey
// var UVQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude={part}&appid="+APIKey    

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

    return cityName;
}

function renderUV(){
    var UVPar = $("<p>");
    currentUV = UV.current.uvi
    UVPar.value = currentUV
}

searchBtn.on("click", function(){
    console.log("I was pressed");
    cities.push(passText.val());
    mainTxt.setAttribute("display","block");
    citiesList.setAttribute("display","block");
    cityName=passText.val();

    $.ajax({
        url: currentQueryURL,
        method: "GET"
    }).then(function(current){
        renderMain();
        renderCities();
     lon = current.lon;
     lat = current.lat;
    }) 
})



// $.ajax({
//     url: UVQueryURL,
//     method: "GET"
// }).then (function(UV){
//     $(searchBtn).on("click", function(){
//         renderUV();
//     })
// })



// searchBtn.addEventListener("click", function(event){

//     }).then(function(populate){
//         cityName = passText.value
//         cities.push(cityName);
//         console.log(cities);
//         console.log(cityName);
//     })
// })
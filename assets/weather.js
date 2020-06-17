var passText = $("#inputPassword");
var searchBtn = $("#searchBtn");
var mainTxt = document.getElementById("mainBody");
var daily = document.getElementById("daily");
var citiesSec = document.getElementById("cities")
var citiesList = document.getElementById("citiesList");
var cities = [];
var APIKey = "1185a689f92365d49ec83f25a53f8191";
var lon;
var lat;
var cityName = "";
var dayOne = document.getElementById("dayOne");
var dayTwo = document.getElementById("dayTwo");
var dayThree = document.getElementById("dayThree");
var dayFour = document.getElementById("dayFour");
var dayFive = document.getElementById("dayFive");
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
// var currentQueryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=" + APIKey
// var UVQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude={part}&appid="+APIKey    

const makeUrl = (city) => {
    var currentQueryURL =
      'https://api.openweathermap.org/data/2.5/weather?q=' +
      city +
      '&appid=' +
      APIKey;
    return currentQueryURL;
  };

  const makeUVUrl = (lon, lat) => {
      var UVQueryURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${lat}&lon=${lon}`
    return UVQueryURL;
  }

  const fiveDayUrl = () => {
      var fiveDayQueryUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`
      return fiveDayQueryUrl;
  } 

  const renderFiveDay = (fiveDay) => {
    $("#fiveRow").empty();
    fiveDay.forEach(day =>{
        const html = `<div class="card border-dark mb-3" id="dayOne" style="max-width: 18rem;">
        <h4 id="date">${day.dt_txt}</h4>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png">
        <p>Temp: ${kelvToFar(day.main.temp)}</p>
        <p>Humidity: ${day.main.humidity}</p>
    </div>`
    $("#fiveRow").append(html);
    })
  }

function renderCities(){
    $("#citiesList").empty();
    cities.forEach(city => {
        const html = `<button type="button" class="btn" data-name=${city}>${city}</button>`;
        $("#citiesList").prepend(html);
    })
}

function kelvToFar(temp){
    return(temp - 273.15) * 1.80+32;
}

function renderMain(current){

    $(mainTxt).empty()

    cityName = passText.value;
    var textHead = $("<h1>")
    cityName = current.name;
    $(textHead).text(cityName + " " + moment().subtract(10, 'days').calendar());

    var iconNum = current.weather[0].icon;
    icons = "http://openweathermap.org/img/wn/" + iconNum + ".png"
    var imageTag = $("<img>").attr("src", icons);
    
    

    var tempPar = $("<p>");
    currentTemp = kelvToFar(current.main.temp);
    currentTemp = currentTemp.toFixed(0)
    $(tempPar).html("Current Temperature: " + currentTemp + "&deg;"+"F");

    var humPar = $("<p>");
    currentHum = current.main.humidity;
    $(humPar).text("Current Humidity: " + currentHum);

    var windPar = $("<p>");
    currentWind = current.wind.speed
    $(windPar).text("Current Wind Speed " + currentWind + " MPH");

    $(mainBody).append(textHead);
    $("#mainBody").append(imageTag);
    $(mainBody).append(tempPar);
    $(mainBody).append(humPar);
    $(mainBody).append(windPar);

    return cityName;
}

function renderUV(UVVal){
    const html = `<p class="UV"><strong>UV Index:</strong> ${UVVal}</p>`
    $(mainBody).append(html);
}

// function renderDaily(){
//     var headOne = $("<h4>");
//     dayOneDate = 
// }

searchBtn.on("click", function(){
    cityName=passText.val();
    console.log("I was pressed");
    if(!cities.includes(cityName)){
        cities.push(cityName);
    }
    console.log(cityName);
    console.log(cities);
    mainTxt.style.display = "block";
    citiesList.style.display = "block";
    citiesSec.style.display = "block";
    daily.style.display = "block";
    

    var queryString = makeUrl(cityName);
   

    $.ajax({
        url: queryString,
        method: "GET"
    }).then(function(current){
        renderMain(current);
        renderCities();
        var UVqueryString = makeUVUrl(current.coord.lon, current.coord.lat);
        $.ajax({
            url: UVqueryString,
            method: "GET"
        }).then(function(UVData){
            renderUV(UVData.value);
            $.ajax({
                url: fiveDayUrl(),
                method: "GET"
            }).then(function(data){

                const fiveDay = data.list.filter((day,i)=> (i+1)%8 === 0);
                renderFiveDay(fiveDay);
            })
        })
    })
})



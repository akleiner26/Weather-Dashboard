var passText = $("#inputPassword");
var searchBtn = $("#searchBtn");
var mainTxt = document.getElementById("mainBody");
var daily = document.getElementById("daily");
var citiesSec = document.getElementById("cities")
var citiesList = document.getElementById("citiesList");
var savedCities = localStorage.getItem("cities");

var cities = (!savedCities) ? [] : JSON.parse(savedCities);
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
    cityName: " ",
    date: "",
    weatherIcon: "",
    temp: "",
    windSpd: "",
    UV: "",
}
citiesObj = {
    current: "",
    second: "",
    third: "",
    fourth: "",
    fifth: "",
}



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
    fiveDay.forEach(day => {
        const html = `<div class="card border-dark mb-3" id="dayOne" style="max-width: 18rem;">
        <h4 id="date">${day.dt_txt.substring(0, 9)}</h4>
        <img class = "dayIcon" src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png">
        <p>Temp: ${kelvToFar(day.main.temp).toFixed(0)}</p>
        <p>Humidity: ${day.main.humidity}</p>
    </div>`
        $("#fiveRow").append(html);
    })
}

if (cities.length !== 0) {
    console.log(cities[cities.length - 1]);
    var cityName = cities[cities.length - 1];
    mainTxt.style.display = "block";
    citiesList.style.display = "block";
    citiesSec.style.display = "block";
    daily.style.display = "block";
    getAll();
}

function renderCities() {
    $("#citiesList").empty();
    cities.forEach(city => {
        const html = `<button type="button" display="block" class="btn backColor m-2 col-10 cityBtn" data-name=${city}>${city}</button>`;
        $("#citiesList").prepend(html);
        $(".cityBtn").on("click", function (city) {
            cityName = this.getAttribute("data-name");
            console.log("I was pressed");
            console.log(cityName);
            console.log(cities);
            mainTxt.style.display = "block";
            citiesList.style.display = "block";
            citiesSec.style.display = "block";
            daily.style.display = "block";

            var queryString = makeUrl(cityName);
            getAll();
        }
        )
    }
    )
}


function kelvToFar(temp) {
    return (temp - 273.15) * 1.80 + 32;
}

function renderMain(current) {

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
    $(tempPar).html("Current Temperature: " + currentTemp + "&deg;" + "F");

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

function renderUV(UVVal) {
    $("#UVID").empty();
    const html = `<p id="UVID" class="UV">UV Index: <span id="UVNum">${UVVal}</span></p>`
    $(mainBody).append(html);
    var UVhtml = $(".UV")
    console.log(UVVal);
    if (UVVal <= 2) {
        UVhtml.addClass("low");
    } else if (UVVal > 2 && UVVal <= 5) {
        UVhtml.addClass("moderate");
    } else if (UVVal > 5 && UVVal <= 7) {
        UVhtml.addClass("high");
    } else UVhtml.addClass("veryHigh")
}


searchBtn.on("click", function () {
    cityName = passText.val();
    if (!cities.includes(cityName)) {
        cities.push(cityName);
    }
    console.log(cityName);
    console.log(cities);
    mainTxt.style.display = "block";
    citiesList.style.display = "block";
    citiesSec.style.display = "block";
    daily.style.display = "block";

    getAll()

})

function getAll() {
    var queryString = makeUrl(cityName);
    $.ajax({
        url: queryString,
        method: "GET"
    }).then(function (current) {
        renderMain(current);
        renderCities();
        localStorage.setItem("cities", JSON.stringify(cities));
        var UVqueryString = makeUVUrl(current.coord.lon, current.coord.lat);
        $.ajax({
            url: UVqueryString,
            method: "GET"
        }).then(function (UVData) {
            renderUV(UVData.value);
            $.ajax({
                url: fiveDayUrl(),
                method: "GET"
            }).then(function (data) {

                const fiveDay = data.list.filter((day, i) => (i + 1) % 8 === 0);
                renderFiveDay(fiveDay);
            })
        })
    })
}
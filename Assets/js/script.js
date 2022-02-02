var CityInput = document.querySelector("#CityInput")
var CityInputBtn = document.querySelector("#CityInputBtn")
var APIKey = "b0ee139b845758874a0f6115b913322d"
var momentToday = moment().format("l")
$("#day1Date").html(moment().add(1, 'days').format('L'))
$("#day2Date").html(moment().add(2, 'days').format('L'))
$("#day3Date").html(moment().add(3, 'days').format('L'))
$("#day4Date").html(moment().add(4, 'days').format('L'))
$("#day5Date").html(moment().add(5, 'days').format('L'))

console.log(momentToday);
function searchCity (event){
    event.preventDefault();
    searchingFor=CityInput.value
    if (searchingFor){
    var geoAPIURL="http://api.openweathermap.org/geo/1.0/direct?q="+searchingFor+"&limit=5&appid="+APIKey;
    fetch(geoAPIURL).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                var latitude=data[0].lat;
                var longitude=data[0].lon;
                getWeather(latitude,longitude,searchingFor);
            });
        }else{
            alert("Error: " + response.statusText);
        }
    });
    };
    CityInput.value=""
};
function getWeather(lat,lon,currentCity){
    weathAPIURL="https://api.openweathermap.org/data/2.5/onecall?lat="+JSON.stringify(lat)+"&lon="+JSON.stringify(lon)+"&exclude=hourly,minutely,alerts&units=imperial&appid="+APIKey;
    fetch(weathAPIURL).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data);
                setCurrent(data,currentCity);
                setFuture(data);
            });
        };
    });


};
function setCurrent(theData,currentCity){
    //console.log(currentCity);
    $(".currentCity").html(currentCity +" " +momentToday);
    $(".temperature").html("Temp: "+ theData.current.temp+ "&#8457;");
    $(".windSpeed").html("Wind Speed: "+ theData.current.wind_speed + "mph");
    $(".humidity").html("Humidity: "+ theData.current.humidity +"%");
    $(".UVIndex").html(theData.current.uvi);
}
function setFuture(theData){
    //the Icons
    var wIcon1=theData.daily[0].weather[0].icon
    var wIcon2=theData.daily[1].weather[0].icon
    var wIcon3=theData.daily[2].weather[0].icon
    var wIcon4=theData.daily[3].weather[0].icon
    var wIcon5=theData.daily[4].weather[0].icon
    $("#icon1").html(`<img src='http://openweathermap.org/img/wn/${wIcon1}@2x.png'>`)
    $("#icon2").html(`<img src='http://openweathermap.org/img/wn/${wIcon2}@2x.png'>`)
    $("#icon3").html(`<img src='http://openweathermap.org/img/wn/${wIcon3}@2x.png'>`)
    $("#icon4").html(`<img src='http://openweathermap.org/img/wn/${wIcon4}@2x.png'>`)
    $("#icon5").html(`<img src='http://openweathermap.org/img/wn/${wIcon5}@2x.png'>`)

}

$(CityInputBtn).on('click',searchCity);
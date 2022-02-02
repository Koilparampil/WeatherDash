var CityInput = document.querySelector("#CityInput")
var CityInputBtn = document.querySelector("#CityInputBtn")
var APIKey = "b0ee139b845758874a0f6115b913322d"


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
                SetCurrent(data,currentCity);
            });
        };
    });


};
function SetCurrent(theData,currentCity){
    console.log(currentCity);
    $(".currentCity").html(currentCity);
    $(".temperature").html("Temp: "+ theData.current.temp+ "&#8457;");
    $(".windSpeed").html("Wind Speed: "+ theData.current.wind_speed + "mph");
    $(".humidity").html("Humidity: "+ theData.current.humidity +"%");
    $(".UVIndex").html(theData.current.uvi);
}


$(CityInputBtn).on('click',searchCity);
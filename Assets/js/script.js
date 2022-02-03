var CityInput = document.querySelector("#CityInput")
var CityInputBtn = document.querySelector("#CityInputBtn")
var APIKey = "b0ee139b845758874a0f6115b913322d"
var momentToday = moment().format("l")
$("#day1Date").html(moment().add(1, 'days').format('L'))
$("#day2Date").html(moment().add(2, 'days').format('L'))
$("#day3Date").html(moment().add(3, 'days').format('L'))
$("#day4Date").html(moment().add(4, 'days').format('L'))
$("#day5Date").html(moment().add(5, 'days').format('L'))
//console.log(momentToday);
cities=JSON.parse(localStorage.getItem("cities"))||[]
cityHistory(cities);
function getInput(event){
    event.preventDefault();
    searchingFor=CityInput.value
    if(searchingFor){
    searchCity(searchingFor);
    localStorage.setItem("LastCity", searchingFor);
    if (cities.includes(searchingFor)){

    }else{
        cities.push(searchingFor);
    }
    localStorage.setItem('cities',JSON.stringify(cities));
    cityHistory(cities)
    CityInput.value=""
    };
    $(".bttn").on('click',function(event){
        console.log("hey this pressed")
        console.log(event.target.innerHTML);
        searchCity(event.target.innerHTML);
    });
};
function searchCity (currentCity){
    if (currentCity){
    var geoAPIURL="https://api.openweathermap.org/geo/1.0/direct?q="+currentCity+"&limit=5&appid="+APIKey;
    fetch(geoAPIURL).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                var latitude=data[0].lat;
                var longitude=data[0].lon;
                getWeather(latitude,longitude,currentCity);
            });
        }else{
            alert("Error: " + response.statusText);
        }
    });
    };
};
function getWeather(lat,lon,currentCity){
    weathAPIURL="https://api.openweathermap.org/data/2.5/onecall?lat="+JSON.stringify(lat)+"&lon="+JSON.stringify(lon)+"&exclude=hourly,minutely,alerts&units=imperial&appid="+APIKey;
    fetch(weathAPIURL).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                //console.log(data);
                setCurrent(data,currentCity);
                setFuture(data);
            });
        };
    });


};
function setCurrent(theData,currentCity){
    //console.log(theData.current.uvi);
    var cIcon1= theData.current.weather[0].icon;
    $(".currentCity").html(currentCity +" " +momentToday+" "+`<img src='https://openweathermap.org/img/wn/${cIcon1}@2x.png'>`);
    $(".temperature").html("Temp: "+ theData.current.temp+ "&#8457;");
    $(".windSpeed").html("Wind Speed: "+ theData.current.wind_speed + "mph");
    $(".humidity").html("Humidity: "+ theData.current.humidity +"%");
    UVindex=theData.current.uvi
    if( UVindex >=8){
        $(".UVIndex").css("background-color", "red");
        $(".UVIndex").css("color", "white");
    }else if (UVindex>=6&& UVindex<8){
        $(".UVIndex").css("background-color", 'orange');
        $(".UVIndex").css("color", "white");
    }else if (UVindex>=4&& UVindex<6){
        $(".UVIndex").css("background-color", 'yellow');
        $(".UVIndex").css("color", "white");
    }else{
        $(".UVIndex").css("background-color", 'green');
        $(".UVIndex").css("color", "white");
    };
    $(".UVIndex").html(theData.current.uvi);
}
function setFuture(theData){
    //the Icons ....there has to be a way to do this in a loop
    var wIcon1=theData.daily[0].weather[0].icon;
    var wIcon2=theData.daily[1].weather[0].icon;
    var wIcon3=theData.daily[2].weather[0].icon;
    var wIcon4=theData.daily[3].weather[0].icon;
    var wIcon5=theData.daily[4].weather[0].icon;
    $("#icon1").html(`<img src='https://openweathermap.org/img/wn/${wIcon1}@2x.png'>`);
    $("#icon2").html(`<img src='https://openweathermap.org/img/wn/${wIcon2}@2x.png'>`);
    $("#icon3").html(`<img src='https://openweathermap.org/img/wn/${wIcon3}@2x.png'>`);
    $("#icon4").html(`<img src='https://openweathermap.org/img/wn/${wIcon4}@2x.png'>`);
    $("#icon5").html(`<img src='https://openweathermap.org/img/wn/${wIcon5}@2x.png'>`);
    //Max temp....there has to be a way to do this in a loop
    $("#tempMxF1").html("Max Temp: "+theData.daily[0].temp.max+ "&#8457;");
    $("#tempMxF2").html("Max Temp: "+theData.daily[1].temp.max+ "&#8457;");
    $("#tempMxF3").html("Max Temp: "+theData.daily[2].temp.max+ "&#8457;");
    $("#tempMxF4").html("Max Temp: "+theData.daily[3].temp.max+ "&#8457;");
    $("#tempMxF5").html("Max Temp: "+theData.daily[4].temp.max+ "&#8457;");
    //Min Temp....there has to be a way to do this in a loop
    $("#tempMnF1").html("Min Temp: "+theData.daily[0].temp.min+ "&#8457;");
    $("#tempMnF2").html("Min Temp: "+theData.daily[1].temp.min+ "&#8457;");
    $("#tempMnF3").html("Min Temp: "+theData.daily[2].temp.min+ "&#8457;");
    $("#tempMnF4").html("Min Temp: "+theData.daily[3].temp.min+ "&#8457;");
    $("#tempMnF5").html("Min Temp: "+theData.daily[4].temp.min+ "&#8457;");
    //WindSpeed
    $("#windF1").html("Wind Speed: "+theData.daily[0].wind_speed+ " mph");
    $("#windF2").html("Wind Speed: "+theData.daily[1].wind_speed+ " mph");
    $("#windF3").html("Wind Speed: "+theData.daily[2].wind_speed+ " mph");
    $("#windF4").html("Wind Speed: "+theData.daily[3].wind_speed+ " mph");
    $("#windF5").html("Wind Speed: "+theData.daily[4].wind_speed+ " mph");
    //Humidity
    $("#humidityF1").html("Humidity: "+theData.daily[0].humidity+ "%");
    $("#humidityF2").html("Humidity: "+theData.daily[1].humidity+ "%");
    $("#humidityF3").html("Humidity: "+theData.daily[2].humidity+ "%");
    $("#humidityF4").html("Humidity: "+theData.daily[3].humidity+ "%");
    $("#humidityF5").html("Humidity: "+theData.daily[4].humidity+ "%");


}
function cityHistory(cities){
    $("#nolistlist").html("")
    $.each(cities, function(i,cityH){
        $(`<button class=bttn data-City=${cityH}>${cityH}</button>`).appendTo("#nolistlist")

    })
}


$(".bttn").on('click',function(event){
    console.log("hey this pressed")
    console.log(event.target.innerHTML);
    searchCity(event.target.innerHTML);
});
$(CityInputBtn).on('click',getInput);
$("#clearBtn").on('click',function(){
    $("#nolistlist").empty();
    localStorage.removeItem("cities");
    cities=JSON.parse(localStorage.getItem("cities"))||[];
});
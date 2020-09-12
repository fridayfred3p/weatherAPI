//Upon load of window run the anoynomous function

    window.addEventListener('load', ()=> {
        $(document).ready(function() {
    //Setting variable for the lattitude and longitude of the user
    let long;
    let lat;
    
    const savedData = [];
    const temparture = document.getElementById("#temparture");
    const humid = document.querySelector("#humidity");
    const wind = document.querySelector("#windSpeed");
    const summary = document.querySelector("#description");
    const cityN = document.querySelector(".cityName");
    const day1 = document.querySelector(".firstDay");
    const day2 = document.querySelector(".secondDay");
    const day3 = document.querySelector(".thirdDay");
    const day4 = document.querySelector(".fourthDay");
    const day5 = document.querySelector(".fifthDay");
    const area = document.querySelector(".region")
    

    const day1Icon = $(".icon");
    const day2Icon = $(".icon2");
    const day3Icon = $(".icon3");
    const day4Icon = $(".icon4");
    const day5Icon = $(".icon5");
    
    const tempMon = document.querySelector("#temp1");
    const tempTues = document.querySelector("#temp2");
    const tempWed = document.querySelector("#temp3");
    const tempThurs = document.querySelector("#temp4");
    const tempFri = document.querySelector("#temp5");
    
    const humidMon = document.querySelector("#humid1");
    const humidTues = document.querySelector("#humid2");
    const humidWed = document.querySelector("#humid3");
    const humidThurs = document.querySelector("#humid4");
    const humidFri = document.querySelector("#humid5");
    
    const cityList = $(".history");
    
    


    // event listener
    const submitButton = document.querySelector(".btn");
    submitButton.addEventListener("click", function (event) {
        
        event.preventDefault();


        const cityInput = document.querySelector("#cityInput").value;
        savedData.push(cityInput);
        localStorage.setItem("userInput", JSON.stringify(savedData));
        console.log(cityInput);
        const weatherManualApi = "https://api.openweathermap.org/data/2.5/weather?q="+ cityInput +"&units=imperial&appid=35cafeda5ccb6feec8a6df5368bddb0a"

        const getsavedcity = JSON.parse(localStorage.getItem("userInput"));
    console.log(getsavedcity);
    if (getsavedcity.length) {
    for (let i = 0; i<getsavedcity.length; i++) {
    const listofcities = $("<li>").text(getsavedcity[i]);
    cityList.append(listofcities);
    };
    }else{
        return;
    };
    
        fetch(weatherManualApi).then(data => {
            return data.json();
        })
        .then(data => {
            console.log(data);
            const {temp, humidity} = data.main
        
            
            
            //Link dom elements to parameters
            cityN.innerText = data.name;
            temperature.innerText = temp;
            summary.textContent = data.weather[0].description;
            humid.innerText = humidity;
            wind.innerText = data.wind.speed;

            const Api = "https://api.openweathermap.org/data/2.5/onecall?lat="+ data.coord.lat +"&lon="+ data.coord.lon +"&units=imperial&%20exclude=minutely,hourly&appid=35cafeda5ccb6feec8a6df5368bddb0a"

            fetch(Api).then(data => {
                return data.json();
                
            })
            .then(data => {
                console.log(data);
                const monday = (new Date (data.daily[0].dt*1000));
                const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'};
                day1.textContent = (monday.toLocaleDateString('en-us', options));
                const tuesday = (new Date (data.daily[1].dt*1000));
                day2.textContent = (tuesday.toLocaleDateString('en-us', options));
                const wednesday = (new Date (data.daily[2].dt*1000));
                day3.textContent = (wednesday.toLocaleDateString('en-us', options));
                const thursday = (new Date (data.daily[3].dt*1000));
                day4.textContent = (thursday.toLocaleDateString('en-us', options));
                const friday = (new Date (data.daily[4].dt*1000));
                day5.textContent = (friday.toLocaleDateString('en-us', options));
            
                tempMon.textContent = data.daily[0].temp.max;
                tempTues.textContent = data.daily[1].temp.max;
                tempWed.textContent = data.daily[2].temp.max;
                tempThurs.textContent = data.daily[3].temp.max;
                tempFri.textContent = data.daily[4].temp.max;
                
                humidMon.textContent = data.daily[0].humidity;
                humidTues.textContent = data.daily[1].humidity;
                humidWed.textContent = data.daily[2].humidity;
                humidThurs.textContent = data.daily[3].humidity;
                humidFri.textContent = data.daily[4].humidity;
                
                const img1 = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + ".png");
                day1Icon.append(img1);
                const img2 = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + ".png");
                day2Icon.append(img2);
                const img3 = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + ".png");
                
                day3Icon.append(img3);
                const img4 = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + ".png");
                
                day4Icon.append(img4);
                const img5 = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + ".png");
                
                day5Icon.append(img5);
                
            })
        });

    })

    //If the user allows the page to get location
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const locationApi = "http://api.ipstack.com/check?access_key=b07674e59cdce26c45e8e8066dc3815f"
            const weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ long +"&units=imperial&%20exclude=minutely,hourly&appid=35cafeda5ccb6feec8a6df5368bddb0a"
            
            fetch(weatherApi).then(data => {
                return data.json();
            })
            .then(data => {
                console.log(data);
                const {temp, humidity, wind_speed, weather}= data.current;
                //Link dom elements to parameters
                temperature.innerText = temp;
                summary.textContent = (data.current.weather[0].description);
                humid.innerText = humidity;
                wind.innerText = wind_speed;

                
                const monday = (new Date (data.daily[0].dt*1000));
                const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'};
                day1.textContent = (monday.toLocaleDateString('en-us', options));
                const tuesday = (new Date (data.daily[1].dt*1000));
                day2.textContent = (tuesday.toLocaleDateString('en-us', options));
                const wednesday = (new Date (data.daily[2].dt*1000));
                day3.textContent = (wednesday.toLocaleDateString('en-us', options));
                const thursday = (new Date (data.daily[3].dt*1000));
                day4.textContent = (thursday.toLocaleDateString('en-us', options));
                const friday = (new Date (data.daily[4].dt*1000));
                day5.textContent = (friday.toLocaleDateString('en-us', options));

                
                tempMon.textContent = data.daily[0].temp.max;
                tempTues.textContent = data.daily[1].temp.max;
                tempWed.textContent = data.daily[2].temp.max;
                tempThurs.textContent = data.daily[3].temp.max;
                tempFri.textContent = data.daily[4].temp.max;
                
                humidMon.textContent = data.daily[0].humidity;
                humidTues.textContent = data.daily[1].humidity;
                humidWed.textContent = data.daily[2].humidity;
                humidThurs.textContent = data.daily[3].humidity;
                humidFri.innerHTML = data.daily[4].humidity;
                
                const img1 = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + ".png");
                day1Icon.append(img1);
                const img2 = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + ".png");
                day2Icon.append(img2);
                const img3 = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + ".png");
                
                day3Icon.append(img3);
                const img4 = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + ".png");
                
                day4Icon.append(img4);
                const img5 = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + ".png");
                
                day5Icon.append(img5);
                
                
                
            });

            fetch(locationApi).then(response => {
                return response.json();
            })
            .then(response => {
                const {city, region_name} = response;
                cityN.innerText = city;
                area.innerText = region_name;
                console.log(response);

            });
        
        });

        } else {
            prompt("Please refresh the page to automatically get current weather or enter a city to get weather update.");
        };
    });
});


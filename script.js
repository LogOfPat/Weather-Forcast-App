class Forecast {
    constructor(city, date, temp, wind, humidity){
        this.city = city;
        this.date = date;
        this.temp = temp;
        this.wind = wind;
        this.humidity = humidity;
    }
}

//API key
const APIkey = 'ef8090169357620ce4ba8071aaf9a2e1';


//global variables.  Current city set to austin by default
let currentCity = 'austin';
// Fetch API data
fetchAPI = async function(APIurl){
    fetch(APIurl)
        .then(response =>{
            if (!response.ok){
                throw new Error('Network error');
            }
            return response.json();
        })
        .then(data => { // what is done with the data
            console.log("api loaded\n" + data);

            makeForecast(data);
        })
        .catch (error => {
            console.error('Error', error);
        })
};

getForecast = function(){
    let openWeather = `http://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${APIkey}&units=imperial`;
    fetchAPI(openWeather);
};

getWeather = function(i, data){
    let forecast = new Forecast(
        data.city.name,
        data.list[i].dt_txt,
        data.list[i].main.temp,
        data.list[i].wind.speed,
        data.list[i].main.humidity
    )
    return forecast;

};

makeForecast = function(data){
    let forecast = [
        day1 = [],
        day2 = [],
        day3 = [],
        day4 = [],
        day5 = []
    ]
    let count = 0;
    for (let i = 0; i < 40; i = i+8) {       
        forecast[count] = getWeather(i, data);
        console.log(`\nDay ${count + 1}`);
        console.log(forecast[count]);
        count = count + 1;
    }
    console.log(forecast);
    renderForecast(forecast);
};

    renderForecast = function(forecast) {
        let cardNum = 0;
        if(cardNum === 0){
            let element = document.getElementById("card0");
            element.children[0].textContent = `City: ${forecast[cardNum].city}`;
            element.children[1].textContent = `Temp: ${forecast[cardNum].temp}°F`;
            element.children[2].textContent = `Wind: ${forecast[cardNum].wind}MPH`;
            element.children[3].textContent = `Humidity: ${forecast[cardNum].humidity}%`;
            cardNum = cardNum + 1;
        }
            for(i = cardNum; i < 5; i++){
                let card = document.getElementById(`card${cardNum}`).children[0];
                card.children[0].textContent = `${forecast[cardNum].date.substr(0,10)}`
                card.children[1].children[0].textContent = `Temp: ${forecast[cardNum].temp}°F`;
                card.children[1].children[1].textContent = `Wind: ${forecast[cardNum].wind}MPH`;
                card.children[1].children[2].textContent = `Humidity: ${forecast[cardNum].humidity}%`;
                cardNum++;
            } 

    };

// BUTTON LISTENERS
// the element of the input form
const input =  document.getElementById("city-search");

const inputListener = input.addEventListener('click',(event) => {
    // const isButton = event.target.nodeName === 'BUTTON';
    // if (!isButton){
    //     return;
    // }
    event.preventDefault();
    console.log('check');
    getInputData();
});

getInputData = function(){
    currentCity = document.getElementById("input-form").value;
    console.log(currentCity);
    console.log("Input submitted!");
    saveInput(currentCity);
    getForecast(currentCity);
};

// the element the buttons are wrapped in
const cityList = document.getElementById("list");

// checks for when a button is pressed
const buttonListListener = cityList.addEventListener('click',(event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton){
        return;
    }
    getButtonListData(event);
});

// Get city from button pressed
getButtonListData = function(event){
    currentCity = event.target.textContent;
    console.log(event.target.textContent);
    console.log("Button clicked!")
    getForecast(currentCity);
};

getForecast(currentCity);

//SAVE LOCAL DATA

saveInput = function (city){

}

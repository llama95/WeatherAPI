const https = require("https");
const http = require("http");
const api = require("./api.json");

function printError(error){
    console.error(error.message);
}

function printWeather(query,temp){
    const message = (`Current temp in ${query} is ${(temp-(273.15))*(1.8)+(32)}`);
    console.log(message);
}

function get(query){
    //connect to our api with our api key and enter the specified city in query
    const req = http.get(`http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=867e8a5d577511e63532526aa1e289c7`, response => {
        // read the data make an empty body string
        let body = " ";
        response.on('data', chunk => {
            //upon a response that has data --> add the chunk to the body string
            body += chunk;
        });
        response.on('end', () => {
            if (response.statusCode === 200){
            //when we hit the json end tag
                try {
                    const main = JSON.parse(body);
                    //parse the json body and assign it to js
                    printWeather(main.name, main.main.temp)
                    //call the method and print the weather
                } catch (error) {
                    printError(error);
                }}
            else{
                const statusErrorCode = new Error("Error. Please enter a city name or zip code");
                printError(statusErrorCode);
            }
        });

    });
}
module.exports.get = get;



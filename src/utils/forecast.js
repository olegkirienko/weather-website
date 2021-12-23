const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const API_KEY = process.env.FORECAST_API_KEY;
    const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to forecast service!", undefined);
        } else if (response.body.error) {
            callback("Unable to find forecast. Try aother search", undefined);
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
            });
        }
    });
};

module.exports = forecast;
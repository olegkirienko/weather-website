const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Oleh Kiriienko"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About App",
        name: "Oleh Kiriienko"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Oleh Kiriienko"
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            data: null,
            error: "Please provide address"
        });
    }

    geocode(req.query.address, (error, { latitede, longitude, location } = {}) => {
        if (error) {
            return res.send({
                data: null,
                error
            });
        }
    
        forecast(latitede, longitude, (error, { temperature, feelslike } = {}) => {
            if (error) {
                return res.send({
                    data: null,
                    error
                });
            }    

            res.send({
                data: {
                    forecast: `The weather is ${temperature} degree. It feels like ${feelslike} degree`,
                    location,
                    address: req.query.address
                },
                error: null
            });
        });
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Oleh Kiriienko",
        errorMessage: "Help article not found"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Oleh Kiriienko",
        errorMessage: "Page not found"
    });
});

app.listen(port, () => {
    console.log("Server is up and running on port %\d", port);
});
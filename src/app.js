const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Steven",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Steven",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Steven",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address.",
    });
  }

  geocode(req.query.address, (error, { long, lat, location } = {}) => {
    if (error) {
      return res.send({
        error: "You encountered an error.",
      });
    }

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({
          error: "You encountered an error.",
        });
      }
      res.send({
        location: location,
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render({
    error: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render({
    error: "404 error. Page not found.",
  });
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

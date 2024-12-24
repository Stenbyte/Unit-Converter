const express = require("express");
const app = express();
const path = require("path");

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get("/convertLength", (req, res) => {
  const convertLength = (value, fromUnit, toUnit) => {
    const rates = {
      millimeter: 0.001,
      centimeter: 0.01,
      meter: 1,
      kilometer: 1000,
      inch: 0.0254,
      foot: 0.3048,
      yard: 0.9144,
      mile: 1609.34,
    };
    return ((value * rates[fromUnit]) / rates[toUnit]).toFixed(2);
  };
  const { value, from, to } = req.query;
  const convertedValue = convertLength(parseFloat(value), from, to);
  res.send(`
    <div class="result">
      ${value} ${from} = ${convertedValue} ${to}
    </div>
  `);
});

app.get("/convertWeight", (req, res) => {
  const convertWeight = (value, fromUnit, toUnit) => {
    const rates = {
      milligram: 0.001,
      gram: 1,
      kilogram: 1000,
      ounce: 28.3495,
      pound: 453.592,
    };
    return ((value * rates[fromUnit]) / rates[toUnit]).toFixed(2);
  };
  const { value, from, to } = req.query;
  const convertedValue = convertWeight(parseFloat(value), from, to);
  res.send(`
    <div class="result">
      ${value} ${from} = ${convertedValue} ${to}
    </div>
  `);
});

app.get("/convertTemperature", (req, res) => {
  const convertTemperature = (value, fromUnit, toUnit) => {
    if (fromUnit === "Celsius" && toUnit === "Fahrenheit")
      return (value * 9) / 5 + 32;
    if (fromUnit === "Celsius" && toUnit === "Kelvin") return value + 273.15;
    if (fromUnit === "Fahrenheit" && toUnit === "Celsius")
      return ((value - 32) * 5) / 9;
    if (fromUnit === "Fahrenheit" && toUnit === "Kelvin")
      return ((value - 32) * 5) / 9 + 273.15;
    if (fromUnit === "Kelvin" && toUnit === "Celsius") return value - 273.15;
    if (fromUnit === "Kelvin" && toUnit === "Fahrenheit")
      return ((value - 273.15) * 9) / 5 + 32;
    return value;
  };
  const { value, from, to } = req.query;
  const convertedValue = convertTemperature(parseFloat(value), from, to);
  res.send(`
    <div class="result">
      ${value} ${from} = ${convertedValue} ${to}
    </div>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

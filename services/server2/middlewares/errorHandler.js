const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function errorHandler(err, req, res, next) {
  if (err.name === "notFound") {
    res.status(404).json({ message: "Resource not found" });
  } else if (err.name === "SequelizeValidationError") {
    res.status(400).json({ message: err.errors[0].message });
  } else if (err.name === "JsonWebTokenError") {
    res.status(401).json({ message: "Invalid token" });
  } else if (err.name === "SequelizeUniqueConstraintError") {
    res.status(400).json({ message: err.errors[0].message });
  } else if (err.name === "InvalidCredential") {
    res.status(401).json({ message: "Wrong email or password" });
  } else if (err.name === "emailRequired") {
    res.status(401).json({ message: "Please fill email" });
  } else if (err.name === "passwordRequired") {
    res.status(401).json({ message: "Please fill password" });
  } else if (err.name === "InvalidToken") {
    res.status(401).json({ message: "Invalid token" });
  } else if (err.name === "imageRequired") {
    res.status(401).json({ message: "Please choose Vet logo" });
  } else if (err.name === "scheduleExist") {
    res.status(400).json({ message: "Schedule already exist" });
  } else if (err.name === "AggregateError") {
    res.status(400).json({ message: err.errors[0].errors.errors[0].message });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = errorHandler;

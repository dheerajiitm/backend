const mongoose = require("mongoose");

const personSchema = require("./schema.js")

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
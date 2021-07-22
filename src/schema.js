
const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

const personSchema = new Schema({
    name: {
        type: String,
        minlength: 2,
        required: true
    },
    email : {
        type: String,
        unique: true,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email');
            }
        }
    },
})

module.exports = personSchema
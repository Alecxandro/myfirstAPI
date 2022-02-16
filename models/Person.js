const mongoose = require('mongoose');

const Person = mongoose.model('Person',{
    userName: String,
    email: String,
    wage: Number,
    approved: Boolean,
})



module.exports = Person;
// Start Point - string (required), 
// End Point – string (required),
// Date – string (required),
// Time – string (required),
// Car Image – string (required),
// Car Brand – string (required),
// Seats – number (required),
// Price – number (required),
// Description – string (required),
// Creator – object Id (reference to the User model),
// Buddies – a collection of Users (reference to the User model)

const mongoose = require('mongoose')
const tripSchema = new mongoose.Schema({
    startPoint: {
        type: String,
        required: true
    },
    endPoint: {
        type: String,
        required: true
    },    
    date: {
        type: String,
        required: true
    },    
    time: {
        type: String,
        required: true
    },    
    carImage: {
        type: String,
        required: true
    },    
    carBrand: {
        type: String,
        required: true
    },    
    seats: {
        type: Number,
        required: true
    },    
    price: {
        type: Number,
        required: true
    },    
    description: {
        type: String,
        required: true
    },
    tripsHistory: {
        type: Object,
        ref: 'User',
        required: true,
    },
    Buddies: [{
        type: Object,
        ref: 'User',
        default: [],
    }]

})

const Trip = mongoose.model('Trip', tripSchema)
module.exports = Trip

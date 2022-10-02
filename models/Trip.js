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
    data: {
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
        type: String,
        required: true
    },    
    price: {
        type: String,
        required: true
    },    
    description: {
        type: String,
        required: true
    },
    tripsHistory: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    Buddies: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }]

})

const Trip = mongoose.model('User', tripSchema)
module.exports = Trip
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {SALT_ROUNDS} = require('../config/env')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        // possibleValues: ["male", "female"],
        // description: {type: String, possibleValues: ["male", "female"]  }
        // enum: ["male", "female"],
        required: true,
    },
    tripsHistory: [{
        type: mongoose.Types.ObjectId,
        ref: 'Trip',
    }]

})

userSchema.pre('save', function(next){
    bcrypt.hash(this.password, SALT_ROUNDS)
    .then(hashedPassword => {
        
        this.password = hashedPassword
        next()
    })
})

const User = mongoose.model('User', userSchema)

module.exports = User

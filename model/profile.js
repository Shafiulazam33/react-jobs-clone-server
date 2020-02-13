const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
    
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
    jobposts: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Jobpost'
        }]
    }
})

const Profile = mongoose.model('Profile', profileSchema)
module.exports = Profile
const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const jobpostSchema = new Schema({
company_name: {
    type: String,
    required: true
},
 website: {
    type: String,
    required: true
},
  logo_url: {
    type: String,
    required: true
},
   short_description: {
    type: String,
    required: true
},
    job_title: {
        type: String,
        required: true
    },
     location: {
        type: String,
        required: true
    },
      remote: {
        type: Boolean,
        required: true
    },
       job_type: {
        type: String,
        required: true
    },
     salary: {
        type: String,
        required: true
    },
     experience: {
        type: String,
        required: true
    }, 
    apply_link: {
        type: String,
        required: true
    },
     tags: {
        type: [String],
        required: true
    },
     description: {
        type: String,
        required: true
    } ,
     featured:{
        type: Boolean,
        required: true
     }},
     { timestamps: true }
    )
    const Jobpost = mongoose.model('Jobpost', jobpostSchema)
module.exports = Jobpost
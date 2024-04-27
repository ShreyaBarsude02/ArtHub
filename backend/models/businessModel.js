const mongoose = require('mongoose');
const {Schema} = mongoose;

const businessSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    owner_name : {
        type : String,
        required: true
    },
    shopname : {
        type: String,
        required: true
    },
    category_tag : {
        type: String,
        required: true
    },
    business_email :{
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    address : {
        type : String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city : {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    shopPhotos: [{
        type: String,
      }],
      workPhotos: [{
        type: String,
      }],
    date: {
        type: Date,
        default: Date.now
    }
})

const business = mongoose.model('business', businessSchema);
module.exports = business;
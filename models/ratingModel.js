const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    name :{
        type: String,
    },
    description: {
        type:String,
    },
    rating: {
        type:Number,
    },

    image: {
        type:String,
    },
    
},
{
    timestamps: true,
}
)

module.exports = mongoose.model("Rating", ratingSchema);
const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
    description :{
        type: String,
    },
    image: {
        type:String,
    },
    
},
{
    timestamps: true,
}
)

module.exports = mongoose.model("Gallery", gallerySchema);
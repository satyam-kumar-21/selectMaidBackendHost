const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
    description1: {
        type: String,
    },
    description2 :{
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

module.exports = mongoose.model("About", aboutSchema);
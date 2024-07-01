const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    heading: {
        type: String,
    },
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

module.exports = mongoose.model("Service", serviceSchema);
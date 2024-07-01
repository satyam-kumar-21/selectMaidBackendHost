const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    address :{
        type: String,
    },
    phone: {
        type:String,
    },
    email: {
        type:String,
    },
    image: {
        type:String,
    },
    
},
{
    timestamps: true,
}
)

module.exports = mongoose.model("Branch", branchSchema);
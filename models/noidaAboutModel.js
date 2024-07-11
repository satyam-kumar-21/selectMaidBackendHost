const mongoose = require("mongoose");

const noidaAboutSchema = new mongoose.Schema({
    description: {
        type: String,
    },
},
{
    timestamps: true,
}
)

module.exports = mongoose.model("NoidaAbout", noidaAboutSchema);
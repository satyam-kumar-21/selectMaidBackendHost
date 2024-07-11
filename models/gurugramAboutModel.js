const mongoose = require("mongoose");

const gurugramAboutSchema = new mongoose.Schema({
    description: {
        type: String,
    },
},
{
    timestamps: true,
}
)

module.exports = mongoose.model("GurugramAbout", gurugramAboutSchema);
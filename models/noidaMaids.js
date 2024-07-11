const mongoose = require('mongoose');

const maidInNoidaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    image: {
        type: String, // URL of the image
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('MaidInNoida', maidInNoidaSchema);

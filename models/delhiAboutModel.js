const mongoose = require('mongoose');

const delhiAboutSchema = new mongoose.Schema({
    description: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('DelhiAbout', delhiAboutSchema);

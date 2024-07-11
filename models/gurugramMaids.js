const mongoose = require('mongoose');

const maidInGurugramSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    details: {
        type: String,
        
    },
    image: {
        type: String
        
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('MaidInGurugram', maidInGurugramSchema);

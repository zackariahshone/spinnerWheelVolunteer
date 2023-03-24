const mongoose = require('mongoose');
require('dotenv').config()

const connectionString = 'mongodb+srv://zackariahshone:Zs72756AR4010!@nonprofitcluster.oe6muis.mongodb.net/?retryWrites=true&w=majority';
const connection = mongoose.connect(connectionString);

mongoose.set({
        'debug': true,
    });

module.exports = connection
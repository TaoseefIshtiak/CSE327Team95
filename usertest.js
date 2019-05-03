const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var User = require("./models/user");

mongoose.connect('mongodb://localhost/test'); 
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
   	});

beforeEach((done) => {
    mongoose.connection.collections.pokemons.drop(() => {
        done();
    }); 
});
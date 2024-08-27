const mongoose = require('mongoose');
const config = require('config');

const dbgr = require('debug')("development:mongoose")

mongoose
.connect(`${config.get("MONGODB_URI")}/scatch`)  //dynamic value need to be created to connect to mongodb
.then(function(){
    dbgr("connected");
})
.catch(function(err){
    console.log(err);
})

module.exports = mongoose;

// mongoose.connect(...): Initiates a connection to the MongoDB database using the URI provided.
// The URI is fetched from the config module and concatenated with /scatch to specify the database name.
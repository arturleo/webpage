let mongoose = require('mongoose');

let url = 'mongodb://localhost:27017/chpn';
mongoose.connect(url,
    { useNewUrlParser: true }
);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Successful connection to "+url)
});


module.exports = mongoose;
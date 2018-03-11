const uri = 'mongodb://mongo:27017/test'
// const uri = 'mongodb://localhost:27018/test'

const mongoose = require('mongoose');
mongoose.connect(uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected!')
});

var userSchema = mongoose.Schema({
    username: String,
    gender: String,
    name: {
        title: String,
        first: String,
        last: String,
    },
    location: {
        street: String,
        city: String,
        state: String,
        zip: Number
    }
})

exports.User = mongoose.model('User', userSchema)

// const assert = require('assert')
// exports.User.find((err, rs) => {
//     assert.equal(null, err)
//     console.log(rs)
// })
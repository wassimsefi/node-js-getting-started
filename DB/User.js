const mongoose = require('mongoose');

const user = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,

  userName: {
    type: String, require: true 
  },
  password: { type: String, require: true },
  image:{type:[Number], require: true },

});

module.exports = User = mongoose.model('User', user);

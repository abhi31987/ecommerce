const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({ 
  Firstname: String,
  Lastname: String,
  Email: String,
  Mobile: Number,
  Message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;

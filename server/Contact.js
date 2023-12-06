const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();


app.use(cors());
app.use(express.json()); 


mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce-mvc', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const loginSchema = new mongoose.Schema({ 
  Firstname:String,
  Lastname: String,
  Email: String,
  Mobile:Number,
  Message:String,

});

const Login = mongoose.model('Contact', loginSchema);

app.post('/contact', async (req, res) => {
  const {Firstname,Lastname,Email,Mobile,Message} = req.body;

  try {
    const login = new Login({
      Firstname,
      Lastname, 
      Email,
      Mobile,
      Message, 
    });



    await login.save();
    console.log('Successfully logged in', login._id);

    res.status(201).json({ message: 'Login successfully.' });
  } catch (error) {
    console.error('Not logged in', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

app.listen(503, () => {
  console.log('Backend server is running on http://localhost:503');
});
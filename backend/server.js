require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const MONGODB_URI = process.env.MONGODB_URI;

app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(express.json());
app.use('/api', routes);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

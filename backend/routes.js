require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Change destination as needed
const authenticateToken = require('./authMiddleware');
const CrochetItem = require('./crochetItem');
const User = require('./User');
const JWT_SECRET = process.env.JWT_SECRET;

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if password meets requirements (contains a number and an uppercase letter)
    if (!/(?=.*\d)(?=.*[A-Z])/.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one number and one uppercase letter' });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const accessToken = jwt.sign({ username: user.username }, JWT_SECRET);

    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CRUD Operations for Crochet Items
// GET all crochet items
router.get('/crochet-items', async (req, res) => {
  try {
    const items = await CrochetItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single crochet item by ID
router.get('/crochet-items/:id', async (req, res) => {
    try {
      const itemId = req.params.id;
      if (!itemId) {
        return res.status(400).json({ message: 'Item ID is missing' });
      }
      
      const item = await CrochetItem.findById(itemId);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      
      res.json(item);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });  

// POST a new crochet item with image upload
router.post('/crochet-items', authenticateToken, upload.single('image'), async (req, res) => {
  const item = new CrochetItem({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageURL: req.file.path // Multer stores the uploaded file path in req.file.path
  });
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a crochet item
router.put('/crochet-items/:id', authenticateToken, async (req, res) => {
  try {
    const item = await CrochetItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    item.name = req.body.name;
    item.description = req.body.description;
    item.price = req.body.price;
    // imageURL should not be updated here, it's better to keep it immutable
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a crochet item
router.delete('/crochet-items/:id', authenticateToken, async (req, res) => {
    try {
      await CrochetItem.findByIdAndDelete(req.params.id);
      res.json({ message: 'Item deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

module.exports = router;

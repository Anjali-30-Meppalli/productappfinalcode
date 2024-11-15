import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import './connection.js'; // Database connection
import User from './models/user.js'; // User model
import jwt from 'jsonwebtoken'; // JWT for authentication
import authenticateUser from './middleware/auth.js'; // Authentication middleware
import product from './models/product.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Registration endpoint
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists (by email or username)
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this username or email already exists' });
    }

    // You can add password strength validation here if needed
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Hash the password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password });
    await newUser.save();

    return res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
app.post('/log', async (req, res) => {
  const { username, password } = req.body;

  // Hardcoded admin credentials (You can store these securely in environment variables)
  //const adminUsername = process.env.ADMIN_USERNAME || 'admin123';
  //const adminPassword = process.env.ADMIN_PASSWORD || '123';
  //const userdetails = await User.findOne({username})
  try {
    // Check if the user is the admin
    /*const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Invalid credentials');
    if (isMatch)  {
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return res.status(200).json({userdetails, message: 'Login successful', token, role: 'admin'})

    }*/
    /* if (username === adminUsername && password === adminPassword) {
       const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
       return res.status(200).json({ message: 'Login successful', token, role: 'admin' });
     }*/

    // Normal user authentication
    const user = await User.findOne({ username });
    //console.log(user);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the stored hashed password

    /*const isPasswordValid = await bcrypt.compare(password, user.password);
    const hashpassword = await bcrypt.hash(password,10)
    console.log(isPasswordValid);
    console.log(hashpassword,user.password)*/

    if (password === user.password) {
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Login successful', token, role: user.role, userdetails: user });
    } else {
      console.log('called')
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user profile (protected route)
app.get('/user/profile/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    const user = await User.findById(req.params.id).select('-password'); // Exclude password
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/admin/users', async (req, res) => {
  try {


    // Fetch user details from MongoDB
    const user = await User.find();

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Internal server error');
  }
});

app.get('/product-list', async (req, res) => {
  const productDetails = await product.find()
  if (productDetails) {
    res.status(200).json(productDetails)
  }
})
app.get('/product-list/:id', async (req, res) => {
  try {
    const id = req.params.id
    const productDetails = await product.findOne({ _id: id })
    if (productDetails) {
      res.status(200).json(productDetails);
    }
    else {
      res.status(404).send("data not found")
    }
  }
  catch (err) {
    res.status(500).send("internal server error ")
  }
})

app.post('/add-product', async (req, res) => {
  try {
    const { title, price, category, image } = req.body;
    const newProduct = new product({ title, price, category, image });
    await newProduct.save()
    res.status(200).send("Product added")
  }
  catch (err) {
    res.status(500).send("internal server error")
  }
})
app.put('/add-product', async (req, res) => {
  const data = req.body
  try {
    const result = await product.updateOne({ _id: data._id }, { $set: data });
    console.log('Update successful:', result);
    res.status(200).send("Product update")
  } catch (error) {
    console.error('Error updating product:', error);
  }
})

app.delete('/delete-product/:id', async (req, res) => {

  const productId = req.params.id
  try {
    const result = await product.findOneAndDelete({ _id: productId });
    res.status(200).send("product deleted")
    console.log('Delete successful:', result);
  } catch (error) {
    res.status(500).send("Internal server error")
    console.error('Error deleting product:', error);
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
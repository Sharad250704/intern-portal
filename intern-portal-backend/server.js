import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy data for interns
const interns = [
  {
    id: 1,
    name: "Sharad Pandey",
    email: "sharad@example.com",
    referralCode: "sharad2025",
    donationsRaised: 15750,
    rewards: [
      { id: 1, name: "Certificate of Excellence", unlocked: true },
      { id: 2, name: "Mentorship Session", unlocked: true },
      { id: 3, name: "Tech Conference Ticket", unlocked: false },
      { id: 4, name: "Cash Bonus $500", unlocked: false }
    ]
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@example.com",
    referralCode: "priya2025",
    donationsRaised: 22300,
    rewards: [
      { id: 1, name: "Certificate of Excellence", unlocked: true },
      { id: 2, name: "Mentorship Session", unlocked: true },
      { id: 3, name: "Tech Conference Ticket", unlocked: true },
      { id: 4, name: "Cash Bonus $500", unlocked: false }
    ]
  },
  {
    id: 3,
    name: "Rahul Kumar",
    email: "rahul@example.com",
    referralCode: "rahul2025",
    donationsRaised: 8900,
    rewards: [
      { id: 1, name: "Certificate of Excellence", unlocked: true },
      { id: 2, name: "Mentorship Session", unlocked: false },
      { id: 3, name: "Tech Conference Ticket", unlocked: false },
      { id: 4, name: "Cash Bonus $500", unlocked: false }
    ]
  },
  {
    id: 4,
    name: "Anita Singh",
    email: "anita@example.com",
    referralCode: "anita2025",
    donationsRaised: 31200,
    rewards: [
      { id: 1, name: "Certificate of Excellence", unlocked: true },
      { id: 2, name: "Mentorship Session", unlocked: true },
      { id: 3, name: "Tech Conference Ticket", unlocked: true },
      { id: 4, name: "Cash Bonus $500", unlocked: true }
    ]
  },
  {
    id: 5,
    name: "Vikram Patel",
    email: "vikram@example.com",
    referralCode: "vikram2025",
    donationsRaised: 12450,
    rewards: [
      { id: 1, name: "Certificate of Excellence", unlocked: true },
      { id: 2, name: "Mentorship Session", unlocked: true },
      { id: 3, name: "Tech Conference Ticket", unlocked: false },
      { id: 4, name: "Cash Bonus $500", unlocked: false }
    ]
  }
];
app.get('/api/interns', (req, res) => {
  try {
    const leaderboard = interns
      .map(intern => ({
        id: intern.id,
        name: intern.name,
        donationsRaised: intern.donationsRaised,
        referralCode: intern.referralCode
      }))
      .sort((a, b) => b.donationsRaised - a.donationsRaised);
    
    res.json({
      success: true,
      data: leaderboard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching leaderboard data'
    });
  }
});

app.get('/api/intern/:id', (req, res) => {
  try {
    const internId = parseInt(req.params.id);
    const intern = interns.find(i => i.id === internId);
    
    if (!intern) {
      return res.status(404).json({
        success: false,
        message: 'Intern not found'
      });
    }
    
    res.json({
      success: true,
      data: intern
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching intern data'
    });
  }
});


// Dummy login endpoint
app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt for:', email);
    
    // Dummy authentication - just check if email exists
    // For demo purposes, accept any password
    const intern = interns.find(i => i.email === email);
    
    if (!intern) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email address'
      });
    }
    
    // For demo: accept any password, just check if password field is provided
    if (!password || password.trim() === '') {
      return res.status(401).json({
        success: false,
        message: 'Password is required'
      });
    }
    
    // Return intern data (excluding sensitive info)
    const { password: _, ...internData } = intern;
    res.json({
      success: true,
      message: 'Login successful',
      data: internData
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login'
    });
  }
});


// Dummy signup endpoint
app.post('/api/signup', (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    console.log('Signup attempt:', { name, email, password: '***' });
    
    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }
    
    // Check if email already exists
    const existingIntern = interns.find(i => i.email === email);
    if (existingIntern) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }
    
    // Create new intern (dummy data)
    const newIntern = {
      id: interns.length + 1,
      name: name,
      email: email,
      referralCode: `${name.toLowerCase().replace(/\s+/g, '')}2025`,
      donationsRaised: 0,
      rewards: [
        { id: 1, name: "Certificate of Excellence", unlocked: false },
        { id: 2, name: "Mentorship Session", unlocked: false },
        { id: 3, name: "Tech Conference Ticket", unlocked: false },
        { id: 4, name: "Cash Bonus $500", unlocked: false }
      ]
    };
    
    interns.push(newIntern);
    
    console.log('New user created:', newIntern.email);
    
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: newIntern
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating account'
    });
  }
});


app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});


app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
});

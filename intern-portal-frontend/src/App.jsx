import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={<Login setCurrentUser={setCurrentUser} />} 
          />
          <Route 
            path="/signup" 
            element={<Signup setCurrentUser={setCurrentUser} />} 
          />
          <Route 
            path="/dashboard" 
            element={<Dashboard currentUser={currentUser} setCurrentUser={setCurrentUser} />} 
          />
          <Route 
            path="/leaderboard" 
            element={<Leaderboard currentUser={currentUser} />} 
          />
          <Route 
            path="/" 
            element={<Navigate to={currentUser ? "/dashboard" : "/login"} replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

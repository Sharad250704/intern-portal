import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      } else {
        navigate('/login');
      }
    }
  }, [currentUser, setCurrentUser, navigate]);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const getRewardProgress = () => {
    if (!currentUser) return 0;
    const unlockedRewards = currentUser.rewards?.filter(reward => reward.unlocked).length || 0;
    const totalRewards = currentUser.rewards?.length || 1;
    return (unlockedRewards / totalRewards) * 100;
  };

  const getNextReward = () => {
    if (!currentUser?.rewards) return null;
    return currentUser.rewards.find(reward => !reward.unlocked);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (!currentUser) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h1>Intern Portal</h1>
        <div className="nav-links">
          <button 
            className="nav-btn"
            onClick={() => navigate('/leaderboard')}
          >
            Leaderboard
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome back, {currentUser.name}! 👋</h2>
          <p>Track your progress and see your impact</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>Total Donations Raised</h3>
              <p className="stat-value">{formatCurrency(currentUser.donationsRaised)}</p>
            </div>
          </div>

          <div className="stat-card secondary">
            <div className="stat-icon">🎫</div>
            <div className="stat-content">
              <h3>Your Referral Code</h3>
              <p className="stat-value referral-code">{currentUser.referralCode}</p>
              <small>Share this code to earn rewards!</small>
            </div>
          </div>

          <div className="stat-card tertiary">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <h3>Rewards Progress</h3>
              <p className="stat-value">{Math.round(getRewardProgress())}%</p>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${getRewardProgress()}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="rewards-section">
          <h3>🎁 Rewards & Achievements</h3>
          <div className="rewards-grid">
            {currentUser.rewards?.map((reward) => (
              <div 
                key={reward.id} 
                className={`reward-card ${reward.unlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="reward-status">
                  {reward.unlocked ? '✅' : '🔒'}
                </div>
                <h4>{reward.name}</h4>
                <p className="reward-description">
                  {reward.unlocked ? "Congratulations! You've earned this reward." : "Keep raising donations to unlock this reward."}
                </p>
              </div>
            ))}
          </div>
          
          {getNextReward() && (
            <div className="next-reward">
              <h4>🎯 Next Reward: {getNextReward().name}</h4>
              <p>Keep up the great work to unlock your next achievement!</p>
            </div>
          )}
        </div>

        <div className="action-section">
          <h3>🚀 Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn primary">
              Share Referral Code
            </button>
            <button className="action-btn secondary">
              Track New Donation
            </button>
            <button className="action-btn tertiary" onClick={() => navigate('/leaderboard')}>
              View Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

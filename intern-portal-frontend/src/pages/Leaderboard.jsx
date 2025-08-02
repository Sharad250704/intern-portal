import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { internAPI } from '../services/api';

const Leaderboard = ({ currentUser }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await internAPI.getLeaderboard();
      if (response.success) {
        setLeaderboard(response.data);
      }
    } catch (error) {
      setError('Failed to load leaderboard data');
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRankClass = (rank) => {
    switch (rank) {
      case 1: return 'gold';
      case 2: return 'silver';
      case 3: return 'bronze';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="loading">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <nav className="dashboard-nav">
        <h1>Intern Portal - Leaderboard</h1>
        <div className="nav-links">
          <button 
            className="nav-btn"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="leaderboard-content">
        <div className="leaderboard-header">
          <h2>🏆 Top Fundraisers</h2>
          <p>See how you rank against other interns</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="leaderboard-stats">
          <div className="stat-item">
            <span className="stat-label">Total Participants</span>
            <span className="stat-value">{leaderboard.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Raised</span>
            <span className="stat-value">
              {formatCurrency(leaderboard.reduce((sum, intern) => sum + intern.donationsRaised, 0))}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Your Rank</span>
            <span className="stat-value">
              {currentUser ? leaderboard.findIndex(intern => intern.id === currentUser.id) + 1 : 'N/A'}
            </span>
          </div>
        </div>

        <div className="leaderboard-table">
          <div className="table-header">
            <div className="rank-col">Rank</div>
            <div className="name-col">Name</div>
            <div className="code-col">Referral Code</div>
            <div className="amount-col">Amount Raised</div>
          </div>

          {leaderboard.map((intern, index) => (
            <div 
              key={intern.id} 
              className={`table-row ${getRankClass(index + 1)} ${
                currentUser?.id === intern.id ? 'current-user' : ''
              }`}
            >
              <div className="rank-col">
                <span className="rank-badge">
                  {getRankIcon(index + 1)}
                </span>
              </div>
              <div className="name-col">
                <div className="intern-info">
                  <span className="intern-name">{intern.name}</span>
                  {currentUser?.id === intern.id && (
                    <span className="you-badge">You</span>
                  )}
                </div>
              </div>
              <div className="code-col">
                <code className="referral-code">{intern.referralCode}</code>
              </div>
              <div className="amount-col">
                <span className="amount">{formatCurrency(intern.donationsRaised)}</span>
              </div>
            </div>
          ))}
        </div>

        {leaderboard.length === 0 && !loading && (
          <div className="empty-state">
            <h3>No data available</h3>
            <p>Check back later for leaderboard updates!</p>
          </div>
        )}

        <div className="leaderboard-footer">
          <p>💡 <strong>Tip:</strong> Share your referral code to climb the leaderboard!</p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

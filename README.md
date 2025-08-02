# 🚀 Intern Portal - Full Stack Application

A comprehensive intern dashboard application built with React (Frontend) and Node.js/Express (Backend).

## 📋 Features

### ✅ Completed Features

#### Frontend (React + Vite)
- 🔐 **Login/Signup Pages** with dummy authentication
- 📊 **Dashboard** showing:
  - Intern name and welcome message
  - Total donations raised with currency formatting
  - Personal referral code
  - Rewards/achievements progress
  - Interactive progress bars and statistics
- 🏆 **Leaderboard Page** displaying:
  - Top fundraisers ranked by donations
  - Current user highlighting
  - Responsive table with rank badges
  - Total statistics overview
- 📱 **Responsive Design** - Works on mobile and desktop
- 🎨 **Modern UI** with gradients, cards, and smooth animations

#### Backend (Node.js + Express)
- 🛠️ **RESTful API** with the following endpoints:
  - `POST /api/login` - Dummy authentication
  - `POST /api/signup` - Create new accounts
  - `GET /api/intern/:id` - Get specific intern data
  - `GET /api/interns` - Get leaderboard data
  - `GET /api/health` - Health check
- 💾 **Dummy Data** for 5 sample interns
- 🔄 **CORS enabled** for frontend communication
- 📝 **Comprehensive error handling**

## 🏗️ Project Structure

```
intern-portal/
├── intern-portal-frontend/     # React frontend
│   ├── src/
│   │   ├── pages/             # Login, Signup, Dashboard, Leaderboard
│   │   ├── components/        # Reusable components
│   │   ├── services/          # API service layer
│   │   └── assets/           # Static assets
│   ├── package.json
│   └── vite.config.js
├── intern-portal-backend/      # Node.js backend
│   ├── server.js             # Main server file
│   ├── package.json
│   └── .env                  # Environment variables
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

1. **Clone and navigate to the project:**
   ```bash
   cd intern-portal
   ```

2. **Setup Backend:**
   ```bash
   cd intern-portal-backend
   npm install
   npm run dev    # Starts on http://localhost:5000
   ```

3. **Setup Frontend (in a new terminal):**
   ```bash
   cd intern-portal-frontend
   npm install
   npm run dev    # Starts on http://localhost:5174
   ```

4. **Access the application:**
   - Frontend: http://localhost:5174
   - Backend API: http://localhost:5000/api

## 🔐 Demo Credentials

Use these credentials to test the application:

| Email | Password | Name | Donations | Status |
|-------|----------|------|-----------|---------|
| sharad@example.com | any password | Sharad Pandey | $15,750 | 2 rewards unlocked |
| priya@example.com | any password | Priya Sharma | $22,300 | 3 rewards unlocked |
| rahul@example.com | any password | Rahul Kumar | $8,900 | 1 reward unlocked |
| anita@example.com | any password | Anita Singh | $31,200 | All rewards unlocked |
| vikram@example.com | any password | Vikram Patel | $12,450 | 2 rewards unlocked |

**Note:** For demo purposes, any password will work with existing email addresses.

## 📡 API Endpoints

### Authentication
- `POST /api/login`
  ```json
  {
    "email": "sharad@example.com",
    "password": "any_password"
  }
  ```

- `POST /api/signup`
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com", 
    "password": "password123"
  }
  ```

### Data Retrieval
- `GET /api/interns` - Get leaderboard (all interns sorted by donations)
- `GET /api/intern/:id` - Get specific intern details
- `GET /api/health` - Server health check

## 🎯 Features Showcase

### Dashboard Highlights
- **Real-time Statistics**: Donation amounts, referral codes, progress tracking
- **Rewards System**: Visual progress bars and achievement badges
- **Interactive Cards**: Hover effects and responsive design
- **Quick Actions**: Easy navigation and sharing features

### Leaderboard Features
- **Ranking System**: Gold, silver, bronze highlighting for top 3
- **Current User Highlighting**: Special styling for logged-in user
- **Comprehensive Stats**: Total participants, total raised, user rank
- **Mobile Responsive**: Optimized table layout for all screen sizes

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 🎨 Design Features

- **Modern Gradient Design**: Purple-blue theme throughout
- **Responsive Layout**: Mobile-first approach
- **Interactive Elements**: Hover effects, smooth transitions
- **Professional Typography**: Clear hierarchy and readability
- **Card-based UI**: Clean, organized information display

## 🔧 Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Backend:**
- `npm run dev` - Start with nodemon (auto-restart)
- `npm start` - Start production server

### Environment Variables

Backend `.env` file:
```env
PORT=5000
NODE_ENV=development
```

## 📈 Future Enhancements

- 🔐 Real authentication with JWT tokens
- 💾 Database integration (MongoDB/PostgreSQL)
- 📧 Email notifications for achievements
- 📱 Mobile app version
- 📊 Advanced analytics and charts
- 🎮 Gamification features
- 📤 Social sharing capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for the Intern Portal Challenge**

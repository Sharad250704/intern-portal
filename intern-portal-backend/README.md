# Intern Portal Backend

## Environment Variables
Create a `.env` file with the following:

```
PORT=5000
NODE_ENV=development
```

## API Endpoints

### Health Check
- `GET /api/health` - Check if server is running

### Authentication
- `POST /api/login` - Login with email and password
- `POST /api/signup` - Create new account

### Intern Data
- `GET /api/intern/:id` - Get specific intern data
- `GET /api/interns` - Get all interns (leaderboard)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

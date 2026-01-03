# Disaster Relief & Resource Sharing Platform (MERN)

Production-ready platform to coordinate disaster response, manage resources, and deliver real-time alerts.

## Features
- JWT authentication with role-based access control
- Disaster management with map view and timeline updates
- Resource sharing and request matching
- Volunteer management and assignments
- Real-time alerts via Socket.io
- Reports and analytics dashboard
- Cloudinary-based file uploads
- Swagger API docs
- Docker-ready deployment

## Tech Stack
- Frontend: React, Vite, Tailwind, React Router, Axios
- Backend: Node.js, Express, MongoDB (Mongoose)
- Realtime: Socket.io
- Auth: JWT + bcrypt
- Testing: Jest

## Setup

### 1) Backend
```bash
cd server
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend
```bash
cd client
cp .env.example .env
npm install
npm run dev
```

### 3) Seed Demo Data
```bash
cd server
npm run seed
```

### 4) Swagger API Docs
Open: `http://localhost:5000/api/docs`

### 5) Docker (optional)
```bash
docker compose up --build
```

## API Overview
- `POST /api/auth/register` Register user
- `POST /api/auth/login` Login user
- `GET /api/auth/verify-email` Verify email
- `POST /api/auth/password-reset` Request password reset
- `POST /api/auth/reset-password` Reset password
- `GET /api/disasters` List disasters
- `POST /api/disasters` Create disaster (admin/organization)
- `POST /api/disasters/:id/timeline` Add timeline update
- `GET /api/resources` List resources
- `POST /api/resources` Create resource with uploads
- `GET /api/requests` List resource requests
- `POST /api/requests` Create request
- `POST /api/requests/:id/match` Match resource
- `GET /api/volunteers` List volunteers
- `POST /api/volunteers/profile` Update volunteer profile
- `POST /api/volunteers/:id/assign` Assign volunteer
- `GET /api/alerts` List alerts
- `POST /api/alerts` Create alert
- `GET /api/reports` List reports
- `POST /api/reports` Create report
- `GET /api/dashboard/stats` Dashboard stats

## Project Structure
```
server/
  controllers/
  routes/
  models/
  middleware/
  utils/
  config/
  docs/
  seed/
client/
  src/
    components/
    pages/
    context/
    services/
    hooks/
```

## Environment Variables
See `server/.env.example` and `client/.env.example` for required settings.

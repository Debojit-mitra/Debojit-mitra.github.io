# Portfolio Website

![Portfolio Home Page](https://i.ibb.co/6FwTmK8/Screenshot-2024-12-24-113507.webp)

A modern, responsive portfolio website built with Next.js and Express.js, featuring a dynamic admin dashboard for content management.

## Features

- 🎨 Modern UI with Material-UI and Framer Motion animations
- 🔒 Secure admin dashboard with authentication
- 📱 Fully responsive design
- ⚡ Server-side rendering with Next.js
- 🎯 Dynamic content management
- 📊 Project showcase with filtering
- 🛠️ Skills and expertise section
- 📅 Timeline/experience section
- 📬 Contact form with backend integration
- 🌓 Dark/Light theme toggle

## Tech Stack

### Frontend

- Next.js 15.x
- React 19.x
- Material-UI 7.x
- Redux Toolkit
- Framer Motion
- Axios
- Emotion (CSS-in-JS)

### Backend

- Node.js
- Express.js 4.x
- MongoDB with Mongoose
- JWT Authentication
- Express Validator
- bcryptjs for password hashing
- Morgan for logging

## Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB instance
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/Debojit-mitra/Debojit-mitra.github.io
cd Debojit-mitra.github.io
```

2. Install backend dependencies

```bash
cd backend
npm install
```

3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

4. Set up environment variables

Backend (.env):

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000
```

Frontend (.env.local):

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

### Running the Application

1. Start the backend server

```bash
cd backend
npm run dev
```

2. Start the frontend development server

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

## Project Structure

### Frontend

```
frontend/
├── pages/           # Next.js pages
├── src/
│   ├── components/  # React components
│   ├── redux/       # Redux state management
│   └── utils/       # Utility functions
└── styles/          # Global styles
```

### Backend

```
backend/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # MongoDB models
├── routes/          # API routes
└── utils/          # Utility functions
```

## Features in Detail

### Admin Dashboard

- Project management (CRUD operations)
- Skills and expertise management
- Timeline/experience management
- Message center for contact form submissions
- Profile information management

### Public Features

- Dynamic project showcase with filtering
- Skills and expertise display
- Interactive timeline
- Contact form with validation
- Responsive design for all devices
- Smooth animations and transitions
- Theme customization

## License

MIT License - See [LICENSE](LICENSE). file for details

### Made with ❤️ by Debojit

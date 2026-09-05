# PulseAI Analytics Dashboard

A production-ready, full-stack AI SaaS analytics dashboard featuring real-time data simulation, interactive charts, AI assistant integration, and a polished dark-mode responsive UI.

![PulseAI Dashboard](https://img.shields.io/badge/Status-Production_Ready-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)

## 🌟 Features

### Frontend (React + Vite)
- **Modern UI/UX**: Dark mode with smooth transitions, responsive design
- **Real-time Data**: Live-updating KPIs and charts using React Query
- **Interactive Charts**: Revenue growth line charts and user acquisition bar charts
- **AI Assistant**: Chat interface with simulated AI responses
- **Project Management**: Filterable project grid with status tracking
- **Activity Feed**: Real-time system events and user actions

### Backend (Express + TypeScript)
- **RESTful API**: Well-documented endpoints for all functionality
- **Security**: Helmet headers, CORS configuration, rate limiting
- **Mock Data**: Realistic simulated data for demonstration
- **Error Handling**: Comprehensive error handling with standardized responses
- **Type Safety**: Full TypeScript support

## 📁 Project Structure

```
pulseai/
├── client/                 # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── ui/        # Reusable UI atoms
│   │   │   ├── layout/    # Layout components
│   │   │   ├── dashboard/ # Dashboard widgets
│   │   │   ├── projects/  # Project components
│   │   │   └── assistant/ # AI chat interface
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API client logic
│   │   ├── types/         # TypeScript interfaces
│   │   ├── views/         # Page views
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── tailwind.config.js
├── server/                # Express backend
│   ├── src/
│   │   ├── config/        # Environment configuration
│   │   ├── routes/        # API route definitions
│   │   ├── controllers/   # Request handlers
│   │   ├── services/      # Data logic & mock generators
│   │   ├── middleware/    # Error handling, CORS
│   │   └── app.ts
│   ├── package.json
│   └── .env.example
├── README.md
└── scripts/
    └── setup.sh
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pulseai
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**
   
   Server:
   ```bash
   cd ../server
   cp .env.example .env
   ```
   
   Client:
   ```bash
   cd ../client
   cp .env.example .env
   ```

5. **Start the development servers**
   
   Terminal 1 (Backend):
   ```bash
   cd server
   npm run dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd client
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 🎨 Features Showcase

### Dashboard
- **KPI Cards**: Revenue, Total Users, Active Projects, AI Generations
- **Revenue Chart**: 30-day revenue trend with area visualization
- **User Acquisition**: New vs Active users comparison
- **Activity Feed**: Real-time system events

### Projects
- **Project Grid**: Visual project cards with progress bars
- **Filtering**: Filter by status (Active, Pending, Completed)
- **Search**: Search projects by title or description
- **Status Indicators**: Color-coded status badges

### AI Assistant
- **Chat Interface**: User-friendly message history
- **Simulated AI**: Realistic AI responses with typing indicators
- **Message Persistence**: Chat history maintained in session

### Settings
- **Theme Toggle**: Switch between light and dark modes
- **Notifications**: Manage notification preferences
- **Security**: Two-factor authentication settings

## 🔧 Configuration

### Server Environment Variables
```env
PORT=3001
API_BASE_URL=http://localhost:3001
FRONTEND_URL=http://localhost:5173
CORS_ORIGINS=http://localhost:5173
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
```

### Client Environment Variables
```env
VITE_API_URL=http://localhost:3001/api
```

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/dashboard/stats` | Dashboard KPIs and stats |
| GET | `/api/analytics/revenue` | Revenue time-series data |
| GET | `/api/analytics/users` | User acquisition data |
| GET | `/api/projects` | List projects (with filters) |
| GET | `/api/activity` | Recent activity logs |
| POST | `/api/assistant/chat` | Send message to AI assistant |

### Projects Filtering
```
GET /api/projects?status=active&search=website
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS
- **Recharts** - Charting library
- **Framer Motion** - Animations
- **React Query** - Data fetching
- **Lucide React** - Icon library
- **Headless UI** - UI primitives

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Helmet** - Security headers
- **CORS** - Cross-origin requests
- **UUID** - Unique identifiers

## 📝 Development

### Running Tests
```bash
# Server tests
cd server
npm test

# Client tests
cd client
npm test
```

### Building for Production
```bash
# Build server
cd server
npm run build

# Build client
cd client
npm run build
```

### Linting
```bash
# Client linting
cd client
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev)
- Charts by [Recharts](https://recharts.org)
- UI Components by [Headless UI](https://headlessui.com)

## 📞 Support

For issues, questions, or contributions, please open an issue in the repository.

---

**Built with ❤️ by the PulseAI Team**

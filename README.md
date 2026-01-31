# BlogPeek

> **Instantly explore curated thoughts — clean, fast, and distraction-free.**

A minimal, interactive blog explorer built with the MEAN stack (MongoDB, Express.js, Angular, Node.js). This portfolio project demonstrates clean architecture, modern UI/UX, and industry best practices.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-20%20LTS-green.svg)
![Angular](https://img.shields.io/badge/angular-17%2B-red.svg)

---

## 🎯 Features

- **Clean Split-View Design** — Blog titles on the left, preview on the right
- **Responsive Layout** — Desktop, tablet, and mobile support (320px to 4K)
- **Smooth Animations** — Micro-interactions and transitions
- **RESTful API** — Express.js backend with security middleware
- **SPA Behavior** — No page reloads during navigation
- **Accessibility** — WCAG 2.1 AA compliance

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Angular 17+ | SPA framework with routing and services |
| **Styling** | SCSS | Modern theming and responsive design |
| **Backend** | Express.js 4.18+ | RESTful API and middleware |
| **Runtime** | Node.js 20 LTS | JavaScript runtime |
| **Security** | Helmet.js | Security headers protection |

## 📁 Project Structure

```
blogpeek/
├── server/                 # Backend (Node.js + Express)
│   ├── app.js              # Main server entry point
│   ├── config/             # Configuration files
│   ├── routes/             # API route definitions
│   ├── controllers/        # Business logic
│   ├── data/               # Static blog data
│   ├── middleware/         # Custom middleware (CORS, errors)
│   └── utils/              # Utility functions
├── client/                 # Frontend (Angular)
│   └── src/app/
│       ├── components/     # UI components
│       ├── services/       # API services
│       └── models/         # TypeScript interfaces
└── docs/                   # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20 LTS or higher
- npm 10+
- Angular CLI 17+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blogpeek
   ```

2. **Set up the backend**
   ```bash
   cd server
   cp .env.example .env
   npm install
   npm run dev
   ```

3. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   ng serve
   ```

4. **Open in browser**
   - Frontend: http://localhost:4200
   - API: http://localhost:3000/api/posts

## 📖 Documentation

- [Architecture Overview](docs/architecture.md)
- [API Reference](docs/api-reference.md)
- [Security Guidelines](docs/security-guidelines.md)

## 🔒 Security Features

- **Helmet.js** — Security headers (XSS, CSP, clickjacking)
- **CORS** — Whitelist-based origin control
- **Input validation** — Request sanitization
- **Error sanitization** — No sensitive data in responses

## 📈 Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Lighthouse Score | > 90 |
| Bundle Size | < 500KB |

## 🎨 Design

BlogPeek uses a dark, modern aesthetic inspired by:
- Medium's clean typography
- Notion's calm spacing
- Linear's minimal color usage

**Color Palette:** Dark Navy (`#0F172A`) with Sky Blue accents (`#38BDF8`)

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

---

**Built with ❤️ as a portfolio demonstration of MEAN stack development.**

# THAKSA E-Learning — Frontend

<div align="center">
  <h3>🎓 A modern, full-featured e-learning platform built with React + Vite + Material UI</h3>
  <p>Workshops · Training & Placement · Final Year Projects · Courses · Batches · Dashboard</p>
</div>

---

## 📸 Screenshots

### 🏠 Homepage — Hero
![Homepage Hero](./public/screenshots/home_hero.png)

### 🗂️ Homepage — Module Cards
![Module Cards](./public/screenshots/home_cards.png)

### 🔧 Workshops Page
![Workshops](./public/screenshots/workshops.png)

### 💼 Training & Placement Page
![Training](./public/screenshots/training.png)

### 🚀 Final Year Projects Page
![Final Year Projects](./public/screenshots/fyp.png)

### 📚 Courses Page
![Courses](./public/screenshots/courses.png)

### 🔐 Login Page
![Login](./public/screenshots/login.png)

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev/) | 19.x | UI framework |
| [Vite](https://vitejs.dev/) | 7.x | Build tool & dev server |
| [MUI (Material UI)](https://mui.com/) | 7.x | Component library |
| [React Router DOM](https://reactrouter.com/) | 7.x | Client-side routing |
| [Axios](https://axios-http.com/) | 1.x | HTTP requests |
| [React Player](https://github.com/cookpete/react-player) | 3.x | Video playback |

**Fonts:** Plus Jakarta Sans (body) · Sora (headings) via Google Fonts

---

## 📁 Project Structure

```
Frontend/
├── public/
│   └── screenshots/        # README screenshots
├── src/
│   ├── api/                # Axios instance setup
│   ├── components/         # Shared reusable components
│   ├── context/            # React context providers
│   ├── hooks/              # Custom hooks
│   ├── layout/             # Navbar, Footer, PublicLayout
│   ├── pages/
│   │   ├── HomePage/       # Landing page + sections
│   │   ├── WorkshopPage/   # Workshops (7 sections)
│   │   ├── TrainingPage/   # Training & Placement
│   │   ├── FinalYearProjectsPage/
│   │   ├── CoursesPage/
│   │   ├── ContactPage/
│   │   ├── LoginPage/
│   │   ├── SignupPage/
│   │   ├── dashboard/      # Student dashboard
│   │   ├── admin/          # Admin panel
│   │   └── instructor/     # Instructor panel
│   ├── routes/
│   │   └── AppRoutes.jsx   # All route definitions
│   ├── services/           # API service functions
│   ├── theme/
│   │   └── appTheme.js     # Global MUI theme
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

---

## ⚡ Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher → [Download](https://nodejs.org/)
- **npm** v9 or higher (comes with Node.js)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/THAKSA_E-LEARNING.git
cd THAKSA_E-LEARNING/Frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment (Optional)

By default the frontend proxies API requests to `http://localhost:3000`. If your backend runs on a different port, update `vite.config.js`:

```js
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:3000'  // change port if needed
    }
  }
}
```

### 4. Run the Development Server

```bash
npm run dev
```

The app will start at **http://localhost:5173**

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server (hot reload) |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint for code quality checks |

---

## 🗺️ Pages & Routes

| Route | Page | Access |
|-------|------|--------|
| `/` | Homepage | Public |
| `/workshops` | Workshop Page | Public |
| `/training` | Training & Placement | Public |
| `/final-year-projects` | Final Year Projects | Public |
| `/courses` | Courses Listing | Public |
| `/courses/:id` | Course Detail | Public |
| `/batches` | Batches | Public |
| `/contact` | Contact | Public |
| `/login` | Login | Guest only |
| `/signup` | Register | Guest only |
| `/dashboard` | Student Dashboard | 🔒 Student |
| `/admin` | Admin Panel | 🔒 Admin |
| `/instructor` | Instructor Panel | 🔒 Instructor |

---

## 🎨 Key Features

- ✅ **Role-based access control** — Student, Instructor, Admin
- ✅ **Animated hero section** with 3 module cards
- ✅ **Workshop Page** — 7 sections (founders, details, colleges, testimonials, FAQ, contact)
- ✅ **WhatsApp floating button** (9908597337) on all module pages
- ✅ **Responsive** — mobile-first layout
- ✅ **Dark-mode-ready** component architecture
- ✅ **Live session tracking** and attendance management
- ✅ **Course progress** and assessment module

---

## 🔗 Backend

The backend API server runs separately. See [`../Backend/README.md`](../Backend/README.md) for setup instructions.

---

## 📄 License

© 2025 THAKSA Academy. All rights reserved.

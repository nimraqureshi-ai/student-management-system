# 🎓 Student Management System

A full-stack web application for managing student records, academic courses, and university announcements — built with **Node.js**, **Express**, and a clean responsive frontend.

> **Course:** Web Technologies (CSC-251) — Spring 2026  
> **Institution:** University Institute of Information Technology, PMAS-AAUR  
> **Instructor:** Dr. Muhammad Habib

---

## 📌 Project Overview

The **Student Management System** is a complete full-stack CRUD web application that allows university administrators to manage student enrollments, course offerings, and official announcements — all through a live, browser-based interface connected to a RESTful backend API.

---

## ✨ Features

### 🏠 Dashboard
- Live statistics cards (total students, active students, courses, average CGPA)
- Recent students overview table
- Latest announcements preview
- Quick action buttons

### 👨‍🎓 Student Management (Full CRUD)
| Operation | Description |
|-----------|-------------|
| **Create** | Add new students with name, roll no, department, semester, email, phone, CGPA |
| **Read** | View all students in a searchable, filterable table |
| **Update** | Edit any student's details via modal form |
| **Delete** | Remove student records with confirmation prompt |

- Search by name, roll number, or email
- Filter by Department and Status (Active / Inactive)
- CGPA progress bar visualization

### 📚 Course Management (Full CRUD)
| Operation | Description |
|-----------|-------------|
| **Create** | Add new courses with code, name, instructor, credit hours, max capacity |
| **Read** | View all courses with enrollment progress bars |
| **Update** | Edit course details and update enrolled student count |
| **Delete** | Remove course entries |

### 📢 Announcements (Create, Read, Delete)
- Post university-wide announcements with title, content, priority, and author
- Filter by priority (High / Medium / Low)
- Quick-post sidebar form + full modal form
- Color-coded priority badges

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js (v18+) |
| **Framework** | Express.js v4.18 |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Styling** | Custom CSS (responsive, no Bootstrap dependency) |
| **Typography** | Google Fonts — Playfair Display + DM Sans |
| **Storage** | In-Memory (JavaScript arrays with UUID keys) |
| **HTTP Client** | Fetch API (browser-native) |
| **Package Manager** | npm |
| **Deployment** | Render.com |

---

## 🗂️ Project Structure

```
student-management/
├── server.js                  # Express server — all API routes & in-memory data
├── package.json               # Project metadata and dependencies
├── .env.example               # Environment variable template
├── .gitignore
├── public/
│   ├── index.html             # Dashboard (Home Page)
│   ├── students.html          # Students CRUD page
│   ├── courses.html           # Courses CRUD page
│   ├── announcements.html     # Announcements page
│   ├── css/
│   │   └── style.css          # Full stylesheet with CSS variables
│   └── js/
│       └── shared.js          # API helpers, toast notifications, sidebar
├── API_DOCUMENTATION.md       # Full REST API reference
└── REPORT.md                  # Assignment report & deployment guide
```

---

## 🔌 REST API Endpoints

### Students
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/students` | Get all students (supports `?search=`, `?department=`, `?status=`) |
| `GET` | `/api/students/:id` | Get single student |
| `POST` | `/api/students` | Create new student |
| `PUT` | `/api/students/:id` | Update student |
| `DELETE` | `/api/students/:id` | Delete student |

### Courses
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/courses` | Get all courses |
| `GET` | `/api/courses/:id` | Get single course |
| `POST` | `/api/courses` | Create new course |
| `PUT` | `/api/courses/:id` | Update course |
| `DELETE` | `/api/courses/:id` | Delete course |

### Announcements
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/announcements` | Get all announcements (sorted newest first) |
| `POST` | `/api/announcements` | Post new announcement |
| `DELETE` | `/api/announcements/:id` | Delete announcement |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/stats` | Get aggregated dashboard statistics |

> See [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md) for full request/response examples.

---

## 🚀 Getting Started (Run Locally)

### Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/student-management-system.git

# 2. Navigate into the project
cd student-management-system

# 3. Install dependencies
npm install

# 4. Start the server
npm start
```

### Open in Browser
```
http://localhost:3000
```

---

## 🌐 Deployment (Render.com)

1. Push your project to a GitHub repository
2. Go to [render.com](https://render.com) → **New +** → **Web Service**
3. Connect your GitHub repository
4. Set the following:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Environment:** Node
   - **Plan:** Free
5. Click **Create Web Service** — your live URL will be ready in ~2 minutes

**Live URL:** `https://student-management-system.onrender.com` *(replace with your actual URL)*

---

## 📋 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
```

On Render, `PORT` is automatically set by the platform.

---

## 📖 Learning Resources

- [Node.js Official Documentation](https://nodejs.org/docs)
- [Express.js Official Guide](https://expressjs.com/en/guide/routing.html)
- [MDN Web Docs — Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Traversy Media — Node.js Crash Course](https://www.youtube.com/watch?v=fBNz5xF-Kx4)
- [REST API Design Principles](https://restfulapi.net)
- [Render Deployment Guide](https://render.com/docs/deploy-node-express-app)

---

## 📄 License

This project was developed as an academic assignment for CSC-251 Web Technologies at PMAS-AAUR.

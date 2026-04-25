# Student Management System — Assignment Report
**Course:** Web Technologies (CSC-251) | Spring 2026  
**Instructor:** Dr. Muhammad Habib  
**Assignment:** 4 — Full-Stack Website Development & Deployment (Node.js + Express)  
**CLO:** CLO-3

---

## 1. Project Overview
**Website Name:** Student Management System  
**Description:** A fully functional full-stack web application for managing student records, academic courses, and university announcements. Built independently using Node.js and Express with a clean, responsive frontend.

---

## 2. Learning Resources Used
- **Node.js Official Docs:** https://nodejs.org/docs  
- **Express.js Official Guide:** https://expressjs.com/en/guide/routing.html  
- **MDN Web Docs** — Fetch API, HTML/CSS reference  
- **YouTube:** Traversy Media — "Node.js Crash Course", "Express.js Crash Course"  
- **REST API Design:** restfulapi.net  
- **UUID Package:** https://www.npmjs.com/package/uuid  
- **Render Deployment Guide:** https://render.com/docs/deploy-node-express-app  

---

## 3. Technologies Used
| Layer | Technology |
|---|---|
| Runtime | Node.js (v18+) |
| Framework | Express.js v4.18 |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Fonts | Google Fonts (Playfair Display + DM Sans) |
| Storage | In-Memory (JavaScript arrays with UUID keys) |
| Package Manager | npm |
| Deployment | Render.com |
| Version Control | GitHub |

---

## 4. Features Implemented

### ✅ Backend
- Express server with proper middleware (JSON, URL-encoded, static files)
- RESTful API with full CRUD for Students, Courses, and Announcements
- Search and filter functionality via query parameters
- Input validation and descriptive error responses
- UUID-based unique IDs for all records
- Dashboard stats endpoint aggregating data

### ✅ Frontend
- **Home / Dashboard** — Live stats cards, recent students table, latest announcements
- **Students Page** — Full CRUD with search, department & status filters
- **Courses Page** — Full CRUD with enrollment tracking progress bars
- **Announcements Page** — Post, view, filter by priority, delete announcements
- Responsive sidebar navigation with active route highlighting
- Modal forms for add/edit operations
- Toast notifications for all user actions
- Responsive design (mobile-friendly)

### ✅ API Routes (REST)
All routes follow REST conventions:
- `GET /api/students` — List all
- `POST /api/students` — Create
- `GET /api/students/:id` — Get one
- `PUT /api/students/:id` — Update
- `DELETE /api/students/:id` — Delete
(Same pattern for `/api/courses` and `/api/announcements`)

---

## 5. Project Structure
```
student-management/
├── server.js              # Main Express server (routes + in-memory data)
├── package.json           # Dependencies
├── .env.example           # Environment variable template
├── public/
│   ├── index.html         # Dashboard (Home page)
│   ├── students.html      # Students management
│   ├── courses.html       # Courses management
│   ├── announcements.html # Announcements
│   ├── css/
│   │   └── style.css      # All styles
│   └── js/
│       └── shared.js      # Shared JS (API helpers, toast, sidebar)
├── API_DOCUMENTATION.md   # Full API docs
└── REPORT.md              # This file
```

---

## 6. Deployment Steps (Render.com)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Student Management System"
git remote add origin https://github.com/YOUR_USERNAME/student-management-system.git
git push -u origin main
```

### Step 2: Deploy on Render
1. Go to https://render.com and sign up / log in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name:** student-management-system
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free
5. Click **"Create Web Service"**
6. Wait ~2 minutes for the build to complete
7. Your live URL will be: `https://student-management-system.onrender.com`

### Step 3: Verify
- Visit your live URL
- Test all CRUD operations
- Check API endpoints at `/api/students`, `/api/courses`

### Alternative Platforms
- **Railway:** railway.app — Similar process, connect GitHub → Deploy
- **Vercel:** Good for frontend, but requires `vercel.json` for Express
- **Cyclic:** cyclic.sh — Zero config Node.js deployment

---

## 7. Environment Variables
Create a `.env` file for local development:
```
PORT=3000
NODE_ENV=development
```
On Render, set `PORT` is handled automatically.

---

## 8. Running Locally
```bash
# Clone the project
git clone https://github.com/YOUR_USERNAME/student-management-system.git
cd student-management-system

# Install dependencies
npm install

# Start the server
npm start

# Open in browser
# http://localhost:3000
```

---

## 9. API Testing (using curl)
```bash
# Get all students
curl http://localhost:3000/api/students

# Add a student
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Ali Hassan","rollNo":"CS-2024-099","department":"Computer Science","email":"ali@student.edu"}'

# Update a student (replace ID)
curl -X PUT http://localhost:3000/api/students/STUDENT_ID \
  -H "Content-Type: application/json" \
  -d '{"cgpa":3.9,"status":"Active"}'

# Delete a student
curl -X DELETE http://localhost:3000/api/students/STUDENT_ID
```

---

## 10. Submission Checklist
- [x] Source code (GitHub)
- [x] Live deployed website link
- [x] API documentation (API_DOCUMENTATION.md)
- [x] Deployment steps (Section 6 above)
- [x] Report with learning resources (Section 2 above)
- [x] Home page
- [x] At least 3 functional pages (Students, Courses, Announcements)
- [x] Form submission with backend processing
- [x] Data storage and retrieval (in-memory)
- [x] Responsive design
- [x] Full CRUD functionality

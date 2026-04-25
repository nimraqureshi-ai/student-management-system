const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── In-Memory Storage ────────────────────────────────────────────────────────
let students = [
  { id: uuidv4(), name: 'Ahmed Khan', rollNo: 'CS-2021-001', department: 'Computer Science', semester: 6, email: 'ahmed.khan@student.edu', phone: '0300-1234567', cgpa: 3.75, status: 'Active', enrolledDate: '2021-09-01' },
  { id: uuidv4(), name: 'Fatima Malik', rollNo: 'SE-2022-012', department: 'Software Engineering', semester: 4, email: 'fatima.malik@student.edu', phone: '0311-9876543', cgpa: 3.92, status: 'Active', enrolledDate: '2022-09-01' },
  { id: uuidv4(), name: 'Usman Raza', rollNo: 'CS-2020-045', department: 'Computer Science', semester: 8, email: 'usman.raza@student.edu', phone: '0333-4567890', cgpa: 3.41, status: 'Active', enrolledDate: '2020-09-01' },
  { id: uuidv4(), name: 'Ayesha Siddiqui', rollNo: 'IT-2023-007', department: 'Information Technology', semester: 2, email: 'ayesha.s@student.edu', phone: '0321-6543210', cgpa: 3.88, status: 'Active', enrolledDate: '2023-09-01' },
  { id: uuidv4(), name: 'Bilal Ahmed', rollNo: 'SE-2021-033', department: 'Software Engineering', semester: 6, email: 'bilal.ahmed@student.edu', phone: '0345-7890123', cgpa: 2.95, status: 'Inactive', enrolledDate: '2021-09-01' },
];

let courses = [
  { id: uuidv4(), code: 'CSC-251', name: 'Web Technologies', creditHours: 3, instructor: 'Dr. Muhammad Habib', department: 'Computer Science', semester: 4, maxStudents: 40, enrolledStudents: 35 },
  { id: uuidv4(), code: 'CSC-301', name: 'Database Systems', creditHours: 3, instructor: 'Dr. Asif Nawaz', department: 'Computer Science', semester: 5, maxStudents: 35, enrolledStudents: 30 },
  { id: uuidv4(), code: 'SE-201', name: 'Software Engineering', creditHours: 3, instructor: 'Dr. Sana Ullah', department: 'Software Engineering', semester: 3, maxStudents: 45, enrolledStudents: 40 },
  { id: uuidv4(), code: 'IT-101', name: 'Introduction to IT', creditHours: 2, instructor: 'Mr. Tariq Ali', department: 'Information Technology', semester: 1, maxStudents: 50, enrolledStudents: 48 },
];

let announcements = [
  { id: uuidv4(), title: 'Assignment 4 Due Date', content: 'Web Technologies Assignment 4 is due on 17th April 2026. Submit via GitHub or zipped project.', date: '2026-04-10', priority: 'High', author: 'Dr. Muhammad Habib' },
  { id: uuidv4(), title: 'Mid-Term Schedule Released', content: 'Mid-term examinations will be held from May 5-15, 2026. Check the notice board for your schedule.', date: '2026-04-08', priority: 'Medium', author: 'Admin Office' },
  { id: uuidv4(), title: 'Fee Submission Deadline', content: 'Last date for fee submission without fine is April 30, 2026. Late submission will incur a penalty.', date: '2026-04-05', priority: 'High', author: 'Finance Department' },
];

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ─── Helper ───────────────────────────────────────────────────────────────────
function getStats() {
  return {
    totalStudents: students.length,
    activeStudents: students.filter(s => s.status === 'Active').length,
    totalCourses: courses.length,
    avgCgpa: (students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(2),
    departments: [...new Set(students.map(s => s.department))].length,
    announcements: announcements.length,
  };
}

// ─── HTML Page Routes ─────────────────────────────────────────────────────────
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/students', (req, res) => res.sendFile(path.join(__dirname, 'public', 'students.html')));
app.get('/courses', (req, res) => res.sendFile(path.join(__dirname, 'public', 'courses.html')));
app.get('/announcements', (req, res) => res.sendFile(path.join(__dirname, 'public', 'announcements.html')));

// ─── API: Dashboard Stats ─────────────────────────────────────────────────────
app.get('/api/stats', (req, res) => {
  res.json({ success: true, data: getStats() });
});

// ─── API: Students (CRUD) ─────────────────────────────────────────────────────

// GET all students
app.get('/api/students', (req, res) => {
  const { search, department, status } = req.query;
  let filtered = [...students];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.rollNo.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q)
    );
  }
  if (department) filtered = filtered.filter(s => s.department === department);
  if (status) filtered = filtered.filter(s => s.status === status);

  res.json({ success: true, count: filtered.length, data: filtered });
});

// GET single student
app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === req.params.id);
  if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
  res.json({ success: true, data: student });
});

// POST create student
app.post('/api/students', (req, res) => {
  const { name, rollNo, department, semester, email, phone, cgpa, status, enrolledDate } = req.body;

  if (!name || !rollNo || !department || !email) {
    return res.status(400).json({ success: false, message: 'Name, Roll No, Department, and Email are required' });
  }

  const exists = students.find(s => s.rollNo === rollNo || s.email === email);
  if (exists) return res.status(409).json({ success: false, message: 'Student with this Roll No or Email already exists' });

  const newStudent = {
    id: uuidv4(), name, rollNo, department,
    semester: parseInt(semester) || 1,
    email, phone: phone || '',
    cgpa: parseFloat(cgpa) || 0.0,
    status: status || 'Active',
    enrolledDate: enrolledDate || new Date().toISOString().split('T')[0],
  };

  students.push(newStudent);
  res.status(201).json({ success: true, message: 'Student added successfully', data: newStudent });
});

// PUT update student
app.put('/api/students/:id', (req, res) => {
  const idx = students.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Student not found' });

  const { name, rollNo, department, semester, email, phone, cgpa, status, enrolledDate } = req.body;

  students[idx] = {
    ...students[idx],
    name: name || students[idx].name,
    rollNo: rollNo || students[idx].rollNo,
    department: department || students[idx].department,
    semester: semester ? parseInt(semester) : students[idx].semester,
    email: email || students[idx].email,
    phone: phone !== undefined ? phone : students[idx].phone,
    cgpa: cgpa !== undefined ? parseFloat(cgpa) : students[idx].cgpa,
    status: status || students[idx].status,
    enrolledDate: enrolledDate || students[idx].enrolledDate,
  };

  res.json({ success: true, message: 'Student updated successfully', data: students[idx] });
});

// DELETE student
app.delete('/api/students/:id', (req, res) => {
  const idx = students.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Student not found' });
  const deleted = students.splice(idx, 1)[0];
  res.json({ success: true, message: 'Student deleted successfully', data: deleted });
});

// ─── API: Courses (CRUD) ──────────────────────────────────────────────────────

app.get('/api/courses', (req, res) => {
  res.json({ success: true, count: courses.length, data: courses });
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
  res.json({ success: true, data: course });
});

app.post('/api/courses', (req, res) => {
  const { code, name, creditHours, instructor, department, semester, maxStudents } = req.body;
  if (!code || !name || !instructor) {
    return res.status(400).json({ success: false, message: 'Code, Name, and Instructor are required' });
  }
  const exists = courses.find(c => c.code === code);
  if (exists) return res.status(409).json({ success: false, message: 'Course with this code already exists' });

  const newCourse = {
    id: uuidv4(), code, name,
    creditHours: parseInt(creditHours) || 3,
    instructor, department: department || 'General',
    semester: parseInt(semester) || 1,
    maxStudents: parseInt(maxStudents) || 40,
    enrolledStudents: 0,
  };
  courses.push(newCourse);
  res.status(201).json({ success: true, message: 'Course added successfully', data: newCourse });
});

app.put('/api/courses/:id', (req, res) => {
  const idx = courses.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Course not found' });
  const { code, name, creditHours, instructor, department, semester, maxStudents, enrolledStudents } = req.body;
  courses[idx] = {
    ...courses[idx],
    code: code || courses[idx].code,
    name: name || courses[idx].name,
    creditHours: creditHours ? parseInt(creditHours) : courses[idx].creditHours,
    instructor: instructor || courses[idx].instructor,
    department: department || courses[idx].department,
    semester: semester ? parseInt(semester) : courses[idx].semester,
    maxStudents: maxStudents ? parseInt(maxStudents) : courses[idx].maxStudents,
    enrolledStudents: enrolledStudents !== undefined ? parseInt(enrolledStudents) : courses[idx].enrolledStudents,
  };
  res.json({ success: true, message: 'Course updated successfully', data: courses[idx] });
});

app.delete('/api/courses/:id', (req, res) => {
  const idx = courses.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Course not found' });
  const deleted = courses.splice(idx, 1)[0];
  res.json({ success: true, message: 'Course deleted successfully', data: deleted });
});

// ─── API: Announcements (CRUD) ────────────────────────────────────────────────

app.get('/api/announcements', (req, res) => {
  const sorted = [...announcements].sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json({ success: true, count: sorted.length, data: sorted });
});

app.post('/api/announcements', (req, res) => {
  const { title, content, priority, author } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title and content are required' });
  }
  const newAnn = {
    id: uuidv4(), title, content,
    date: new Date().toISOString().split('T')[0],
    priority: priority || 'Medium',
    author: author || 'Admin',
  };
  announcements.unshift(newAnn);
  res.status(201).json({ success: true, message: 'Announcement posted successfully', data: newAnn });
});

app.delete('/api/announcements/:id', (req, res) => {
  const idx = announcements.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Announcement not found' });
  const deleted = announcements.splice(idx, 1)[0];
  res.json({ success: true, message: 'Announcement deleted', data: deleted });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🎓 Student Management System running on http://localhost:${PORT}\n`);
  console.log(`  📋 Students API  → http://localhost:${PORT}/api/students`);
  console.log(`  📚 Courses API   → http://localhost:${PORT}/api/courses`);
  console.log(`  📢 Announcements → http://localhost:${PORT}/api/announcements\n`);
});

module.exports = app;

# API Documentation — Student Management System
**Course:** Web Technologies (CSC-251) | **Instructor:** Dr. Muhammad Habib  
**Base URL:** `http://localhost:3000` (local) | `https://your-app.render.com` (deployed)

---

## Authentication
No authentication required (in-memory storage for this assignment).

---

## Dashboard

### GET /api/stats
Returns summary statistics for the dashboard.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalStudents": 5,
    "activeStudents": 4,
    "totalCourses": 4,
    "avgCgpa": "3.58",
    "departments": 3,
    "announcements": 3
  }
}
```

---

## Students API

### GET /api/students
Get all students. Supports optional query filters.

**Query Parameters:**
| Param | Type | Description |
|---|---|---|
| search | string | Search by name, roll no, or email |
| department | string | Filter by department name |
| status | string | `Active` or `Inactive` |

**Example:** `GET /api/students?search=ahmed&status=Active`

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "uuid-string",
      "name": "Ahmed Khan",
      "rollNo": "CS-2021-001",
      "department": "Computer Science",
      "semester": 6,
      "email": "ahmed.khan@student.edu",
      "phone": "0300-1234567",
      "cgpa": 3.75,
      "status": "Active",
      "enrolledDate": "2021-09-01"
    }
  ]
}
```

---

### GET /api/students/:id
Get a single student by ID.

**Response:** `{ "success": true, "data": { ...student } }`  
**Error:** `{ "success": false, "message": "Student not found" }` (404)

---

### POST /api/students
Create a new student.

**Request Body:**
```json
{
  "name": "Sara Ahmed",
  "rollNo": "CS-2024-010",
  "department": "Computer Science",
  "semester": 1,
  "email": "sara@student.edu",
  "phone": "0300-0000000",
  "cgpa": 3.5,
  "status": "Active",
  "enrolledDate": "2024-09-01"
}
```
**Required:** `name`, `rollNo`, `department`, `email`

**Response:** `201 Created` with new student object  
**Error:** `400` if required fields missing | `409` if roll no or email already exists

---

### PUT /api/students/:id
Update an existing student. All fields optional (only sends changed fields).

**Request Body:** Same structure as POST (all fields optional)

**Response:** Updated student object  
**Error:** `404` if not found

---

### DELETE /api/students/:id
Delete a student permanently.

**Response:** `{ "success": true, "message": "Student deleted successfully", "data": { ...deletedStudent } }`  
**Error:** `404` if not found

---

## Courses API

### GET /api/courses
Get all courses.

**Response:**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "id": "uuid-string",
      "code": "CSC-251",
      "name": "Web Technologies",
      "creditHours": 3,
      "instructor": "Dr. Muhammad Habib",
      "department": "Computer Science",
      "semester": 4,
      "maxStudents": 40,
      "enrolledStudents": 35
    }
  ]
}
```

---

### GET /api/courses/:id
Get a single course by ID.

---

### POST /api/courses
Create a new course.

**Request Body:**
```json
{
  "code": "CSC-401",
  "name": "Artificial Intelligence",
  "creditHours": 3,
  "instructor": "Dr. Noman Ali",
  "department": "Computer Science",
  "semester": 7,
  "maxStudents": 35
}
```
**Required:** `code`, `name`, `instructor`

---

### PUT /api/courses/:id
Update an existing course.

---

### DELETE /api/courses/:id
Delete a course.

---

## Announcements API

### GET /api/announcements
Get all announcements, sorted by newest first.

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "uuid-string",
      "title": "Assignment 4 Due Date",
      "content": "Web Technologies Assignment 4 is due...",
      "date": "2026-04-10",
      "priority": "High",
      "author": "Dr. Muhammad Habib"
    }
  ]
}
```

---

### POST /api/announcements
Post a new announcement.

**Request Body:**
```json
{
  "title": "Holiday Notice",
  "content": "University will remain closed on Friday.",
  "priority": "Medium",
  "author": "Admin Office"
}
```
**Required:** `title`, `content`  
**Priority values:** `High`, `Medium`, `Low`

---

### DELETE /api/announcements/:id
Delete an announcement.

---

## Error Responses

All errors follow this structure:
```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

| Status | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request (missing required fields) |
| 404 | Not Found |
| 409 | Conflict (duplicate entry) |

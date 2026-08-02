# Hospital Management REST API

A Hospital Management REST API built using **Node.js**, **Express.js**, **MongoDB**, **JWT Authentication**, and **Multer** following the **MVC Architecture**.

---

## Features

- JWT Authentication
- Role-Based Authorization
- Password Encryption (bcrypt)
- Department Management
- Doctor Management
- Patient Management
- Appointment Management
- Prescription Management
- Medical Report Upload
- Dashboard Statistics
- MongoDB Relationships (Populate)
- RESTful APIs
- File Upload using Multer

---

## Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- Express Validator
- CORS
- Morgan

---

## Folder Structure

```
Hospital-Management-API
│
├── config
├── controllers
├── middleware
├── models
├── routes
├── uploads
├── app.js
├── package.json
└── .env
```

---

## Installation

Clone the project

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
PORT=9000
MONGO_URI=mongodb://127.0.0.1:27017/HospitalManagement
JWT_SECRET=Hospital@123
JWT_EXPIRE=7d
```

Run project

```bash
npm start
```

---

## API Endpoints

### Authentication

- POST /api/register
- POST /api/login
- PUT /api/change-password

### Department

- POST /api/departments
- GET /api/departments
- GET /api/departments/:id
- PUT /api/departments/:id
- DELETE /api/departments/:id

### Doctor

- POST /api/doctors
- GET /api/doctors
- GET /api/doctors/:id
- PUT /api/doctors/:id
- DELETE /api/doctors/:id

### Patient

- POST /api/patients
- GET /api/patients
- GET /api/patients/:id
- PUT /api/patients/:id
- DELETE /api/patients/:id

### Appointment

- POST /api/appointments
- GET /api/appointments
- GET /api/appointments/:id
- PUT /api/appointments/:id
- DELETE /api/appointments/:id

### Prescription

- POST /api/prescriptions
- GET /api/prescriptions
- GET /api/prescriptions/:id
- PUT /api/prescriptions/:id
- DELETE /api/prescriptions/:id

### Medical Reports

- POST /api/reports
- GET /api/reports
- GET /api/reports/:id
- PUT /api/reports/:id
- DELETE /api/reports/:id

### Dashboard

- GET /api/dashboard

---

## Authentication

All protected APIs require

```
Authorization: Bearer <JWT_TOKEN>
```

---

## User Roles

- Admin
- Doctor
- Receptionist
- Patient

---

## Author

Jainish Rana

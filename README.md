# 🏥 Hospital Management REST API

A secure and scalable **Hospital Management REST API** built with **Node.js**, **Express.js**, and **MongoDB**. This project provides authentication and complete CRUD operations for managing hospital resources such as doctors, patients, departments, appointments, prescriptions, and reports.

---

## 📌 Features

* 🔐 User Authentication (JWT)
* 👨‍⚕️ Doctor Management
* 🏥 Department Management
* 🧑‍🤝‍🧑 Patient Management
* 📅 Appointment Scheduling
* 💊 Prescription Management
* 📄 Medical Report Management
* 📊 Dashboard APIs
* 🔒 Password Encryption using bcrypt
* 🌐 RESTful API Architecture
* 📁 File Upload Support
* ⚡ MongoDB Atlas Integration

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas & Mongoose
* **Authentication:** JSON Web Token (JWT)
* **Password Hashing:** bcrypt
* **Environment Variables:** dotenv
* **Logging:** Morgan
* **CORS:** Enabled

---

## 📂 Project Structure

```
Hospital-Management-REST-API
│
├── config
│   └── db.js
│
├── controllers
│
├── middleware
│
├── models
│
├── routes
│
├── uploads
│
├── utils
│
├── .env
├── app.js
├── package.json
└── README.md
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Hospital-Management-REST-API.git
```

### 2. Navigate to Project

```bash
cd Hospital-Management-REST-API
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create a `.env` File

```env
PORT=9000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=MyHospitalApiSecret

JWT_EXPIRE=7d

SESSION_SECRET=MyHospitalSession
```

### 5. Start the Server

```bash
npm start
```

or

```bash
nodemon app.js
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint               |
| ------ | ---------------------- |
| POST   | `/api/register`        |
| POST   | `/api/login`           |
| PUT    | `/api/change-password` |

### Departments

| Method | Endpoint               |
| ------ | ---------------------- |
| GET    | `/api/departments`     |
| POST   | `/api/departments`     |
| PUT    | `/api/departments/:id` |
| DELETE | `/api/departments/:id` |

### Doctors

| Method | Endpoint           |
| ------ | ------------------ |
| GET    | `/api/doctors`     |
| POST   | `/api/doctors`     |
| PUT    | `/api/doctors/:id` |
| DELETE | `/api/doctors/:id` |

### Patients

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | `/api/patients`     |
| POST   | `/api/patients`     |
| PUT    | `/api/patients/:id` |
| DELETE | `/api/patients/:id` |

### Appointments

| Method | Endpoint                |
| ------ | ----------------------- |
| GET    | `/api/appointments`     |
| POST   | `/api/appointments`     |
| PUT    | `/api/appointments/:id` |
| DELETE | `/api/appointments/:id` |

### Prescriptions

| Method | Endpoint                 |
| ------ | ------------------------ |
| GET    | `/api/prescriptions`     |
| POST   | `/api/prescriptions`     |
| PUT    | `/api/prescriptions/:id` |
| DELETE | `/api/prescriptions/:id` |

### Reports

| Method | Endpoint           |
| ------ | ------------------ |
| GET    | `/api/reports`     |
| POST   | `/api/reports`     |
| PUT    | `/api/reports/:id` |
| DELETE | `/api/reports/:id` |

### Dashboard

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | `/api/dashboard` |

---

## 🔑 Authentication

Protected routes require a JWT token.

Add the following header in Postman:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🧪 Testing

Use **Postman** or any API testing tool.

Example Base URL:

```
http://localhost:9000
```

---

## 📸 Sample Response

```json
{
  "success": true,
  "message": "Login Successful",
  "token": "JWT_TOKEN"
}
```
<img width="1366" height="768" alt="hotel-management" src="https://github.com/user-attachments/assets/abd1bcc2-fc6f-4e10-90c8-a24f4e4babfe" />


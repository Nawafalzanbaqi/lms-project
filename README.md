# 🎓 LMS Platform — Full-Stack Learning Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg )](https://opensource.org/licenses/MIT )
[![.NET](https://img.shields.io/badge/.NET-8-blueviolet )](https://dotnet.microsoft.com/en-us/download/dotnet/8.0 )
[![React](https://img.shields.io/badge/React-18-blue )](https://react.dev/ )
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue )](https://www.typescriptlang.org/ )

A production-ready Learning Management System (LMS) built with a scalable Clean Architecture backend and a modern frontend.

---

### 📋 Table of Contents
1. [✨ Key Features](#-key-features)
2. [🛠️ Tech Stack](#️-tech-stack)
3. [🚀 Getting Started](#-getting-started)
4. [🔑 Login Credentials](#-login-credentials)
5. [📁 Project Structure](#-project-structure)
6. [🧩 Future Improvements](#-future-improvements)
7. [👨‍💻 Author](#-author)

---

## ✨ Key Features

| Category | Feature | Description |
| :--- | :--- | :--- |
| 🔐 **Auth & Security** | JWT & Role-Based Access | Secure login system using JWT with distinct roles (Admin, Trainee). |
| 👨‍💼 **Admin Panel** | User & Course Management | Full control over users (approve/disable) and complete course management (CRUD). |
| 📊 **Analytics** | Analytics Dashboard | Interactive dashboard displaying user and course statistics using Recharts. |
| 👨‍🎓 **Trainee Interface** | Course Enrollment | Trainees can register, await approval, view enrolled courses, and track progress. |
| 🗄️ **Database** | EF Core & Migrations | Utilizes SQL Server with Entity Framework Core for robust database management. |

---

## 🛠️ Tech Stack

| Area | Technology |
| :--- | :--- |
| 🖥️ **Backend** | `ASP.NET Core 8`, `Entity Framework Core`, `JWT`, `Clean Architecture`, `Swagger` |
| 🎨 **Frontend** | `React`, `TypeScript`, `Vite`, `TailwindCSS`, `Axios`, `React Router`, `Recharts` |
| 🗄️ **Database** | `SQL Server` |

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/lms-project.git
cd lms-project
```
2️⃣ Backend Setup
```Bash
cd LMS.API
dotnet restore
dotnet run
API URL: http://localhost:5282
Swagger UI: http://localhost:5282/swagger
```
3️⃣ Database Setup
```Bash
cd LMS.Infrastructure
dotnet ef database update
```
4️⃣ Frontend Setup
```Bash
cd lms-frontend
npm install
npm run dev
Frontend URL: http://localhost:5173
```
🔑 Login Credentials
Admin Account:
```
Username: admin
Password: Admin123
```
Trainee Account:
Register a new account from the UI and wait for admin approval.

---

## 📁 Project Structure

<details> <summary><strong>🏗️ Backend Structure (Clean Architecture )</strong></summary>
Plain Text
LMS
├── LMS.API             → ASP.NET Core API
├── LMS.Application     → Business logic
├── LMS.Domain          → Entities
└── LMS.Infrastructure  → Database & Repositories
</details> <details> <summary><strong>🖼️ Frontend Structure</strong></summary>
Plain Text
lms-frontend
└── src
    ├── api
    ├── components
    ├── context
    ├── pages
    └── routes
</details>


## 🧩 Future Improvements
 📤 File Uploads
 
 📈 Course Progress Tracking
 
 📜 Exams & Certificates
 
 🔔 Notifications
 
 📧 Email Verification
 
 🔄 CI/CD Pipeline

 ---
 
## 👨‍💻 Author
Nawaf
Full-Stack Developer (ASP.NET + React)

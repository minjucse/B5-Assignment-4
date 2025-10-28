# 📚 Minimal Library Management System

## 📖 Project Overview
The **Minimal Library Management System** is a web application built with **React**, **Redux Toolkit Query (RTK Query)**, and **TypeScript**.  
It provides essential functionality for managing books and borrowing records in a clean and simple UI.  

---

## ✨ Features
- View a list of books.  
- Add, update, and delete books.  
- Borrow books and view a borrow summary.  
- Availability status: **Available ✅ / Not Available ❌**.  
- No authentication required – all routes are public.  

---

## 🛠️ Tech Stack
- **React 18**  
- **TypeScript**  
- **Redux Toolkit Query (RTK Query)**  
- **React Router v6**  
- **Tailwind CSS** + **shadcn/ui**  

---

## 📂 Project Structure
```bash
project-root/
│── src/
│   ├── app/          # Redux store setup
│   ├── components/   # Reusable UI components
│   ├── modules/      # Feature-based modules (books, borrow, etc.)
│   ├── pages/        # Page components (Home, Books, Borrow, Summary)
│   ├── redux/        # API slices (RTK Query)
│   ├── types/        # TypeScript types & interfaces
│   └── main.tsx      # App entry point
│
└── README.md

## 🚀 Getting Started

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/library-management.git
cd library-management

### 2️⃣ Install Dependencies
```bash
npm install

### 3️⃣ Run Development Server
```bash
npm run dev

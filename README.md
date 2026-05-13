# Smart Event Management & Ticketing Platform

## Overview
A full-stack web application built for Advanced Events (Pty) Ltd to manage events, ticket bookings, enquiries, and user accounts. Built with Node.js, Express, EJS, and MongoDB, the system simulates a real-world event booking platform with secure authentication, role-based access control, and admin analytics.

## Key Features
- Home / Event Listing page with search and filtering
- User authentication (register, login, logout) with hashed passwords
- Event Management (admin only) — full CRUD operations
- Ticket booking with automated capacity validation
- User booking history and admin analytics dashboard
- Contact / Enquiry management system
- Role-based access control (Admin vs Standard User)
- Responsive UI built with Bootstrap and custom CSS

## Technology Stack
- Node.js
- Express.js
- EJS templates
- MongoDB with Mongoose
- bcrypt for password hashing
- express-session for session state
- dotenv for environment variable management
- method-override for PUT/DELETE support
- nodemon for local development

## Team Members and Roles

### 👩‍💼 Role 1: Team Lead / Project Coordinator
**Mickayla Combrink (602923)**
- Oversee project progress and ensure deadlines are met
- Coordinate tasks among team members and manage GitHub collaboration
- Ensure MVC architecture is consistently applied across all modules
- Prepare and lead the final presentation

### 🖥️ Role 2: Backend Developer
**Hanre Koen (601225)**
- Implement core server logic using Node.js and Express
- Develop controllers for authentication, event management, booking, and enquiries
- Integrate middleware for error handling, authentication, and authorization

### 🎨 Role 3: Frontend Developer
**Hendrik Stephanus Smith (600519)**
- Build EJS templates for all five mandatory pages
- Implement search and filtering features on the event listing page
- Ensure responsive design using CSS/Bootstrap

### 🗄️ Role 4: Database Engineer
**Emmanuel Chinomso Ugo Nzotta (600692)**
- Design MongoDB schemas using Mongoose (Users, Events, Bookings, Enquiries)
- Implement schema validation and relationships
- Optimize queries for event filtering and analytics dashboards

### 🔒 Role 5: Security / DevOps Engineer
**Emmanuel Teodor Booysen Joao (601270)**
- Implement password hashing (bcrypt) and secure authentication (express-session)
- Enforce role-based access control via middleware (isAuthenticated, isAdmin)
- Manage environment variables securely with dotenv
- Maintain .gitignore and ensure no sensitive data in version control
- Set up GitHub workflows for collaboration and deployment readiness

## Setup Instructions

### Prerequisites
- Node.js v18 or higher
- npm
- MongoDB Atlas account or local MongoDB installation

### Installation
1. Clone the repository:
```bash
git clone https://github.com/R4idenW4sT4ken/WPR371-Project.git
```

2. Navigate to the project folder:
```bash
cd WPR371-Project
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env` file in the project root with the following variables:
```text
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.jydcqps.mongodb.net/community_portal?retryWrites=true&w=majority
SESSION_SECRET=your_session_secret_here
PORT=3000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
```

5. Start the application in development mode:
```bash
npm run dev
```

6. Open your browser at:
```text
http://localhost:3000
```

## Environment Variables
- `MONGO_URI` — MongoDB connection string
- `SESSION_SECRET` — Secret key for express-session
- `PORT` — Port to run the app on (default `3000`)
- `ADMIN_EMAIL` — Admin account email, created automatically on first startup
- `ADMIN_PASSWORD` — Admin account password, created automatically on first startup

## MVC Architecture
The project follows a strict MVC pattern:
- **Models** — Mongoose schemas for Users, Events, Bookings, Enquiries (`/models`)
- **Views** — EJS templates for all pages (`/Views`)
- **Controllers** — Business logic separated from routes (`/controllers`)
- **Routes** — Express routers for auth and page routes (`/Routes`)
- **Middleware** — Authentication and authorization (`/middleware/auth.js`)

## Security Implementation
- Passwords hashed with **bcrypt** (salt rounds: 10) before storage
- Sessions managed with **express-session** using a secret from `.env`
- `isAuthenticated` middleware protects all user routes
- `isAdmin` middleware protects all admin routes
- Sensitive values loaded from `.env`, never hardcoded
- `.env` excluded from version control via `.gitignore`
- Git history sanitised to remove any previously committed sensitive data

## Troubleshooting
- If MongoDB does not connect, verify your `MONGO_URI` in `.env`
- Use `npm run dev` for auto-restart during development
- If team images do not appear, ensure files exist in `Public/images/team/`

## Reflection
This project simulated a real-world software development team environment. Each member contributed meaningfully across their role, with particular focus on security, clean MVC architecture, and GitHub collaboration practices. Key challenges included resolving merge conflicts across branches and ensuring sensitive credentials were never exposed in version control.
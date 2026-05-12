# Smart Event Management & Ticketing Platform

## Project Overview
A full-stack web application built for Advanced Events (Pty) Ltd to manage events, ticket sales, and customer engagement. Built with Node.js, Express, EJS, and MongoDB.

## Technologies Used
- **Backend:** Node.js, Express.js
- **Frontend:** EJS, HTML5, CSS3, Bootstrap
- **Database:** MongoDB, Mongoose
- **Security:** bcrypt, express-session
- **Tools:** dotenv, nodemon, method-override

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
- Ensure responsive design using CSS/Bootstrap/Tailwind

### 🗄️ Role 4: Database Engineer
**Emmanuel Chinomso Ugo Nzotta (600692)**
- Design MongoDB schemas using Mongoose
- Implement schema validation and relationships
- Optimize queries for event filtering and analytics dashboards

### 🔒 Role 5: Security / DevOps Engineer
**Emmanuel Teodor Booysen Joao (601270)**
- Implement password hashing (bcrypt) and secure authentication
- Enforce role-based access control (Admin vs User)
- Manage environment variables securely with dotenv
- Set up GitHub workflows for collaboration and deployment readiness

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally

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

4. Create a `.env` file in the root directory with the following:
MONGO_URI=mongodb://localhost:27017/wpr371
SESSION_SECRET=supersecretkey123
PORT=3000

5. Start the development server:
```bash
   node app.js
```

6. Open your browser and go to:
http://localhost:3000

## Security Implementation
- Passwords are hashed using **bcrypt** with 10 salt rounds before storage
- User sessions managed with **express-session**
- Role-based access control separates Admin and standard User permissions
- Environment variables managed securely with **dotenv**
- Authentication and authorization enforced via custom middleware
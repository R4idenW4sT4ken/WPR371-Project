# Smart Event Management & Ticketing Platform

## Overview
A Node.js and Express web application for managing community events, bookings, enquiries, and user accounts. The app uses EJS for server-side rendering and MongoDB for persistent data storage.

## Key Features
- Event listing, creation, editing, and deletion
- Booking and enquiry management
- User authentication and session handling
- Admin and regular user role-based access control
- Responsive UI built with Bootstrap and custom styles
- Static assets served from `Public/`

## Technology Stack
- Node.js
- Express.js
- EJS templates
- MongoDB with Mongoose
- bcrypt for password hashing
- express-session for session state
- dotenv for configuration
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
- Node.js installed (recommended v18+)
- npm installed
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

4. Create a `.env` file in the project root with:
```text
MONGO_URI="mongodb+srv://user2:12345@cluster0.jydcqps.mongodb.net/community_portal?retryWrites=true&w=majority"

user email = user2
user password = 12345
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
- `SESSION_SECRET` — Session secret for express-session
- `PORT` — Port to run the app on (default `3000`)
- `ADMIN_EMAIL` — Optional admin account email created automatically on first startup
- `ADMIN_PASSWORD` — Optional admin account password created automatically on first startup

## Notes on Recent Changes
- Team images now load from `Public/images/team/`
- `member.image` values in `app.js` are filenames only, not full paths
- Static assets are served from the `Public/` directory
- `about.ejs` now uses the same team image URL pattern as `home.ejs`

## Security Implementation
- Passwords are hashed with **bcrypt** before storage
- Sessions are managed with **express-session**
- Role-based access is enforced by middleware
- Sensitive values are loaded from `.env`

## Troubleshooting
- If MongoDB does not connect, verify `MONGO_URI` and that the database service is running
- If team images do not appear, ensure the files exist in `Public/images/team/` and match the names in `app.js`
- Use `npm run dev` for auto-restart during development

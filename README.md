# TeamPulse: Team Management Platform

## Project Description
TeamPulse is a full stack Team Members Management Application built for student team administration. It allows users to:
- add team members with profile image upload,
- view all members from MongoDB,
- open a dedicated details page for each member,
- manage members through a clean multi-page React interface.

The app uses React Router for page navigation and Express + MongoDB APIs for persistent data.

## Team Details
- Paritosh Singh   (RA2311056010146)
- Kavya Goel       (RA2311056010176)
- Sanskar Agrawal  (RA2311056010138)

## Technologies Used
- Frontend: React.js, React Router DOM, Axios, CSS
- Backend: Node.js, Express.js, MongoDB (Mongoose), Multer
- Tools: Vite, VS Code

## Features Implemented
### Core Requirements
- Home Page with team title: TeamPulse: Team Management Platform
- Add Member Page with input validation and image upload
- View Members Page with API-driven member listing
- Member Details Page with full information for selected member
- APIs integrated with browser-testable GET endpoints

### 3 Extra Features
1. Member Search and Filter:
   - Live search by name/role on View Members page
   - Role dropdown filter for faster browsing
2. Dark and Light Theme Toggle:
   - Theme toggle in navbar
   - User preference persists using localStorage
3. Member Stats Dashboard:
   - Home page shows total members
   - Unique roles count
   - Latest addition, fetched live from API

## Folder Structure
```text
FSD/
  backend/
    controllers/
    middleware/
    models/
    routes/
    uploads/
    server.js
  frontend/
    src/
      api/
      components/
      pages/
      App.jsx
      main.jsx
      styles.css
  README.md
```

## Installation Steps
1. Clone/download this project.
2. Open terminal in project root.
3. Install backend dependencies:
   - `cd backend`
   - `npm install`
4. Configure backend environment:
   - create `.env` inside `backend/`
   - use values from `.env.example`
5. Install frontend dependencies:
   - `cd ../frontend`
   - `npm install`
6. Configure frontend environment:
   - create `.env` inside `frontend/`
   - use values from `.env.example`

## API Endpoints
Base URL: `http://localhost:5000`

- `POST /api/members`
  - Add a new team member
  - Body: multipart/form-data
  - Required fields: `name`, `role`, `email`, `contactNumber`, `profileImage`

- `GET /api/members`
  - Retrieve all team members

- `GET /api/members/:id`
  - Retrieve details of one team member by id

- `GET /api/members/stats`
  - Retrieve dashboard stats:
    - totalMembers
    - uniqueRoles
    - latestAddition

Note: Alias routes are also available at `/members` for compatibility.

## How to Run the App
1. Start backend:
   - Open terminal 1
   - `cd backend`
   - `npm run dev`

2. Start frontend:
   - Open terminal 2
   - `cd frontend`
   - `npm run dev`

3. Open in browser:
   - Frontend: `http://localhost:5173`
   - API health check: `http://localhost:5000/api/health`

## Browser Testing for API Calls
- `http://localhost:5000/api/members`
- `http://localhost:5000/api/members/<member_id>`
- `http://localhost:5000/api/members/stats`

## Notes
- Profile images are stored in `backend/uploads/`.
- Keep MongoDB server running before starting backend.
- This project is styled with responsive layout and subtle transitions for presentation quality.

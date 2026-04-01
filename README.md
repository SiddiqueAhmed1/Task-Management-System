# Task Management System
 
A full-stack task management application built with **NestJS** (backend) and **Next.js** (frontend), featuring JWT authentication, project management, and task tracking.
 
---
 
## Tech Stack
 
### Backend
- **NestJS** — Node.js framework
- **Prisma ORM** — Database ORM
- **PostgreSQL** (Neon) — Cloud database
- **JWT** — Authentication
- **Passport.js** — Authentication middleware
- **bcrypt** — Password hashing
- **class-validator** — Request validation
 
### Frontend
- **Next.js 15** (App Router) — React framework
- **Tailwind CSS** — Styling
- **Shadcn UI** — Component library
- **Axios** — HTTP client
- **js-cookie** — Cookie management
- **Sonner** — Toast notifications
 
---
 
## Project Structure
 
```
Task-Management-System/
├── backend/          # NestJS API
└── frontend/         # Next.js App
```
 
---
 
## Getting Started
 
### Prerequisites
 
Make sure you have the following installed:
 
- [Node.js](https://nodejs.org/) v18+
- [Git](https://git-scm.com/)
- A [Neon](https://neon.tech/) PostgreSQL database (or any PostgreSQL instance)
 
---
 
## Backend Setup
 
### 1. Clone the repository
 
```bash
git clone https://github.com/SiddiqueAhmed1/Task-Management-System.git
cd Task-Management-System/backend
```
 
### 2. Install dependencies
 
```bash
npm install
```
 
> If you get a peer dependency error, the project includes a `.npmrc` file that handles it automatically.
 
### 3. Configure environment variables
 
Create a `.env` file in the `backend/` directory:
 
```env
DATABASE_URL="your_neon_postgresql_connection_string"
JWT_SECRET="your_jwt_secret_key"
PORT=5000
```
 
> **Note:** Get your `DATABASE_URL` from your [Neon dashboard](https://neon.tech/). `JWT_SECRET` can be any random string.
 
### 4. Run database migrations
 
```bash
npx prisma migrate deploy
```
 
> Use `migrate deploy` on a new machine (applies existing migrations).
> Use `migrate dev` only when making schema changes during development.
 
### 5. Generate Prisma Client
 
```bash
npx prisma generate
```
 
### 6. Start the server
 
```bash
npm run start:dev
```
 
Backend runs on **http://localhost:5000**
 
---
 
## Frontend Setup
 
### 1. Navigate to frontend directory
 
```bash
cd ../frontend
```
 
### 2. Install dependencies
 
```bash
npm install
```
 
### 3. Configure environment variables
 
Create a `.env.local` file in the `frontend/` directory:
 
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```
 
### 4. Start the development server
 
```bash
npm run dev
```
 
Frontend runs on **http://localhost:3000**
 
---
 
## API Endpoints
 
### Auth (Public)
 
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive JWT token |
 
### Projects (JWT required)
 
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/projects` | Get all projects for current user |
| POST | `/projects` | Create a new project |
| GET | `/projects/:id` | Get a single project |
| PATCH | `/projects/:id` | Update a project |
| DELETE | `/projects/:id` | Delete a project |
 
### Tasks (JWT required)
 
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks/project/:projectId` | Get all tasks for a project |
| POST | `/tasks` | Create a new task |
| PATCH | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |
 
### Dashboard (JWT required)
 
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard` | Get stats for current user |
 
### Users (Admin only)
 
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| POST | `/users` | Create a new user |
| PATCH | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |
 
---
 
## Features
 
- **JWT Authentication** — Secure login and registration
- **Role-based Access** — Admin and User roles
- **Project Management** — Create, edit, delete projects
- **Task Management** — Create, edit, delete, and track tasks
- **Task Filtering** — Filter by status and priority
- **Task Search** — Search tasks by title
- **Dashboard Stats** — Overview of projects and tasks
- **Due Dates** — Set due dates for tasks
- **Cascade Delete** — Deleting a project removes all its tasks
 
---
 
## Database Schema
 
```
User
 └── Projects
       └── Tasks
```
 
- One user can have many projects
- One project can have many tasks
- Deleting a user cascades to projects and tasks
- Deleting a project cascades to tasks
 
---

## Important Notes
 
- `.env` and `.env.local` files are **not** included in the repository for security reasons. You must create them manually.
- The backend uses **Neon** (cloud PostgreSQL). Make sure your database is active before running migrations.
- CORS is configured for `http://localhost:3000`. If you change the frontend port, update `main.ts` accordingly.
 
---

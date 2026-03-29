# Task Management System — Backend

Built with NestJS, Prisma, and PostgreSQL (Neon)

## Tech Stack
- NestJS
- Prisma ORM
- PostgreSQL (Neon)
- JWT Authentication
- bcrypt

## Getting Started

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
`.env` file 
```
DATABASE_URL="your_neon_postgresql_url"
JWT_SECRET="your_secret_key"
PORT='port_here'
```

### 4. Database Migration
```bash
npx prisma migrate dev
```

### 5. Run the server
```bash
npm run start:dev
```
Server runs on **http://localhost:3000**

## API Endpoints

### Auth (Public)
```
POST /auth/register
POST /auth/login
```

### Projects (JWT required)
```
GET    /projects
POST   /projects
PATCH  /projects/:id
DELETE /projects/:id
```

### Tasks (JWT required)
```
GET    /tasks?projectId=&status=&priority=&search=
POST   /tasks
PATCH  /tasks/:id
DELETE /tasks/:id
```

### Dashboard (JWT required)
```
GET /dashboard
```

### Users (Admin only)
```
GET    /users
POST   /users
PATCH  /users/:id
DELETE /users/:id
```

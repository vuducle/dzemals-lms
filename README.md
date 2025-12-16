# Dzemals - Modern Learning Management System

A comprehensive, enterprise-grade learning management system (LMS) built with cutting-edge web technologies. Features complete course management, student enrollment, grade tracking, schedule management, and a beautiful responsive UI.

**Status:** Production-ready backend API with full REST endpoints. Frontend templates available.

## 🌟 Key Features

### Backend

- ✅ Complete REST API with 35+ endpoints
- ✅ Swagger/OpenAPI documentation
- ✅ JWT authentication with refresh tokens
- ✅ Role-based access control (Teacher/Student)
- ✅ Advanced course filtering & search
- ✅ Schedule management (GET, CREATE, UPDATE, DELETE)
- ✅ Grade management with statistics
- ✅ User profile management
- ✅ Password reset & email verification
- ✅ Request throttling & rate limiting
- ✅ Comprehensive error handling

### Frontend

- 🚀 Modern responsive UI with shadcn/ui
- 🎨 Dark mode support
- 📱 Mobile-friendly design
- ⚡ Next.js 16 with server-side rendering
- 🔐 Secure JWT token management
- 📊 Type-safe API integration

## Project Structure

This is a monorepo using Yarn Workspaces:

```
dzemals-super-app/
├── frontend/               # Next.js 16 + React 19 + shadcn/ui
│   ├── app/               # Next.js App Router
│   ├── components/        # React components
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utilities & helpers
├── backend/               # NestJS + Prisma + PostgreSQL
│   ├── src/
│   │   ├── modules/      # Feature modules
│   │   │   ├── auth/     # Authentication
│   │   │   ├── user/     # User management
│   │   │   ├── course/   # Course management
│   │   │   ├── schedule/ # Schedule management
│   │   │   ├── teacher/  # Teacher features
│   │   │   ├── student/  # Student features
│   │   │   └── enrollment/ # Enrollment management
│   │   ├── guards/       # Auth guards
│   │   ├── config/       # Configuration
│   │   └── main.ts       # Application entry
│   └── prisma/           # Database schema & migrations
└── package.json          # Root workspace configuration
```

## Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router & Turbopack
- **React 19** - Latest React features & hooks
- **TypeScript** - Full type safety
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible UI components
- **Lucide React** - Beautiful, consistent icons
- **Axios** - HTTP client
- **SWR** - React hooks for data fetching

### Backend

- **NestJS 11** - Progressive Node.js framework
- **Prisma** - Modern ORM with migrations
- **PostgreSQL 14+** - Relational database
- **JWT** - Secure token-based authentication
- **Bcrypt** - Password hashing
- **Redis** - Caching & session management
- **Swagger/OpenAPI** - API documentation

## Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **Yarn** package manager
- **PostgreSQL** 14+ (for database)
- **Redis** (for real-time features, optional)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/vuducle/dzemals-super-app.git
cd dzemals-super-app
```

### 2. Install Dependencies

Install all dependencies for both frontend and backend:

```bash
yarn install
```

### 3. Environment Variables

#### Backend Setup

Create `.env` file in the `backend/` directory:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=dzemals_super_app
DB_SCHEMA=public

# Generated Database URL
DATABASE_URL="postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=${DB_SCHEMA}"

# Server Port
PORT=2808
NODE_ENV=development

# Redis (optional)
REDIS_URL="redis://localhost:6379"

# JWT Secrets
JWT_SECRET=denis-kunz-geheimer-jwt-token
JWT_REFRESH_SECRET=denis-refresh-token-ist-geheim
JWT_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# CORS
CORS_ORIGIN=http://localhost:3000


```

#### Frontend Setup

Create `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup (Backend)

First, ensure PostgreSQL is running. Then set up the database:

```bash
cd backend

# Create the database and run migrations
yarn prisma migrate dev

# (Optional) Seed the database with sample data
yarn prisma db seed
```

### 5. Run the Development Servers

#### Option A: Run Everything at Once

```bash
# From the root directory
yarn dev
```

This will start:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

#### Option B: Run Separately

```bash
# Terminal 1 - Frontend
yarn frontend:dev

# Terminal 2 - Backend
yarn backend:dev
```

#### Option C: Run Individual Services

```bash
# Frontend only
cd frontend
yarn dev

# Backend only
cd backend
yarn start:dev
```

## Available Scripts

### Root Commands

```bash
# Development - runs all services
yarn dev

# Build all packages
yarn build

# Run linting
yarn lint

# Frontend specific
yarn frontend:dev      # Start frontend dev server
yarn frontend:build    # Build frontend for production

# Backend specific
yarn backend:dev       # Start backend dev server
yarn backend:build     # Build backend for production
```

## Project Features

### Backend API Endpoints (35+)

#### Authentication (8 endpoints)

- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login & get tokens
- `POST /auth/refresh` - Refresh access token
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token
- `GET /auth/profile` - Get current user profile
- `PUT /auth/profile` - Update user profile (NEW)
- `PUT /auth/avatar` - Upload/remove avatar
- `PATCH /auth/change-password` - Change password

#### Courses (8 endpoints)

- `POST /courses` - Create course (teacher only)
- `GET /courses` - List courses with advanced filtering & search
- `GET /courses/:code` - Get course by code
- `GET /courses/:courseId/enrolled-students` - Get enrolled students
- `GET /courses/:courseId/schedules` - Get course schedules (NEW)
- `GET /courses/:courseId/statistics` - Get course statistics (NEW)
- `PUT /courses/:code` - Update course (teacher only)
- `DELETE /courses/:code` - Delete course (teacher only)

#### Schedules (5 endpoints) - NEW MODULE

- `POST /schedules/course/:courseId` - Create schedule (teacher only)
- `GET /schedules/course/:courseId` - Get all schedules for course
- `GET /schedules/:scheduleId` - Get specific schedule
- `PUT /schedules/:scheduleId` - Update schedule (teacher only)
- `DELETE /schedules/:scheduleId` - Delete schedule (teacher only)
- `GET /schedules/course-code/:courseCode` - Get schedules by course code

#### Grades (6 endpoints)

- `POST /teachers/grades` - Create grade (teacher only)
- `GET /teachers/grades/:gradeId` - Get single grade (NEW)
- `PATCH /teachers/grades/:gradeId` - Update grade (teacher only)
- `DELETE /teachers/grades/:gradeId` - Delete grade (NEW)
- `GET /teachers/courses/:courseId/grades` - Get course grades
- `GET /teachers/courses/:courseId/statistics` - Get grade statistics

#### Teachers (6 endpoints)

- `GET /teachers/me` - Get teacher profile
- `GET /teachers/my-courses` - Get my courses with pagination
- `GET /teachers/courses/:courseId/enrollments` - Get enrolled students
- `PATCH /teachers/users/role` - Assign teacher role

#### Students (3 endpoints)

- `GET /students/grades` - Get all my grades
- `GET /students/grades/course/:courseId` - Get grade for course
- `GET /students/grades/statistics` - Get grade statistics

#### Enrollments (4 endpoints)

- `POST /enrollments` - Enroll in course (student only)
- `GET /enrollments/my` - Get my enrollments (student only)
- `GET /enrollments/:id` - Get enrollment details (student only)
- `DELETE /enrollments/:id` - Withdraw from course (student only)

### Advanced Features

✅ **Search & Filtering:**

- Full-text search across courses
- Filter by teacher, code, date range
- Sorting by multiple fields
- Pagination with metadata

✅ **Authentication:**

- JWT tokens with refresh mechanism
- Password hashing with bcrypt
- Email-based password recovery
- Secure token validation

✅ **Authorization:**

- Teacher-only endpoints
- Student-only endpoints
- Course ownership verification
- Grade ownership checks

✅ **Grade Management:**

- Assign & update grades
- Delete grades
- View individual grades
- Course & student statistics
- Grade distribution analysis

✅ **Schedule Management:**

- Create multiple schedules per course
- Update/delete individual schedules
- Get schedules by course
- Day of week + time support
- Optional room overrides

### Frontend

- 🎨 Modern, responsive UI with shadcn/ui
- 🚀 Server-side rendering with Next.js
- 🔒 Type-safe API integration
- 🌓 Dark mode support
- 📱 Mobile-friendly design
- ♿ Accessible components

## API Documentation

### Swagger/OpenAPI Documentation

Once the backend is running, access the interactive Swagger documentation:

```
http://localhost:3001/api/docs
```

Features:

- 📚 Complete API documentation
- 🧪 Try-out endpoints in browser
- 📋 Request/response examples
- 🔐 Authentication support

### Example API Requests

```bash
# Get all courses with search & filtering
curl "http://localhost:3001/courses?search=web&sortBy=startDate&limit=20"

# Get course with schedules
curl "http://localhost:3001/courses/course123/schedules"

# Create a new schedule
curl -X POST http://localhost:3001/schedules/course/:courseId \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "dayOfWeek": 1,
    "startTime": "10:00",
    "endTime": "12:00",
    "room": "Room 101"
  }'

# Get course statistics
curl "http://localhost:3001/courses/course123/statistics"

# Get single grade
curl "http://localhost:3001/teachers/grades/grade123" \
  -H "Authorization: Bearer <token>"
```

## Database Schema

Key entities:

- **User** - User accounts with authentication
- **Teacher** - Teacher profiles linked to users
- **Student** - Student profiles linked to users
- **Course** - Course information and metadata
- **Schedule** - Weekly course schedules
- **Enrollment** - Student course enrollments
- **Grade** - Student grades for courses

Relationships:

- User → Teacher (one-to-one)
- User → Student (one-to-one)
- Course → Teacher (many-to-one)
- Course → Schedule (one-to-many)
- Course → Enrollment (one-to-many)
- Course → Grade (one-to-many)
- Student → Enrollment (one-to-many)
- Student → Grade (one-to-many)

### Adding Dependencies

```bash
# Add to a specific workspace
yarn workspace frontend add package-name
yarn workspace backend add package-name

# Add as dev dependency
yarn workspace frontend add -D package-name
```

### Creating New Components (Frontend)

Use shadcn/ui to add components:

```bash
cd frontend
npx shadcn@latest add [component-name]
```

### Database Migrations (Backend)

```bash
cd backend

# Create a new migration
yarn prisma migrate dev --name migration_name

# Push schema to database
yarn prisma migrate deploy

# Open Prisma Studio
yarn prisma studio

# Reset database (development only!)
yarn prisma migrate reset
```

## Authentication & Security

### Authentication Flow

1. User signs up/logs in with email and password
2. Password hashed with bcrypt
3. Backend generates JWT access token (15m expiry) + refresh token (7d)
4. Frontend stores tokens securely
5. Access token included in Authorization header for requests
6. Refresh token used to get new access token when expired

### Security Features

🔒 **Password Management:**

- Bcrypt hashing with salt rounds
- Password validation (min 6 chars, uppercase, lowercase, number)
- Change password endpoint
- Password reset via email
- Secure token-based recovery

🔒 **API Security:**

- JWT authentication on protected routes
- Role-based access control (RBAC)
- Rate limiting & throttling
- CORS configuration
- SQL injection prevention (Prisma ORM)

🔒 **Data Protection:**

- HTTPS in production
- Environment variables for secrets
- No sensitive data in logs
- Password never returned in API responses

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Create a Pull Request

## Troubleshooting

### Frontend Issues

**Port 3000 already in use:**

```bash
lsof -i :3000
kill -9 <PID>
```

**Dependencies not installing:**

```bash
rm -rf node_modules yarn.lock
yarn install
```

**Module not found errors:**

```bash
# Clear Next.js cache
rm -rf .next
yarn build
```

### Backend Issues

**Database connection failed:**

- Ensure PostgreSQL is running on correct host/port
- Check DATABASE_URL in .env
- Verify database exists
- Run: `yarn prisma migrate dev`

**Port 3001 already in use:**

```bash
lsof -i :3001
kill -9 <PID>
```

**Migrations failed:**

```bash
# Check migration status
cd backend
yarn prisma migrate status

# Reset database (development only!)
yarn prisma migrate reset --force
```

**Module not found errors:**

```bash
# Rebuild NestJS
yarn build

# Clear dist folder
rm -rf dist
yarn build
```

**JWT errors:**

- Verify JWT_SECRET matches in .env
- Check token format in Authorization header
- Ensure token is not expired
- Token format: `Authorization: Bearer <token>`

## Performance & Monitoring

### Backend

- Request throttling: 100 requests per minute
- Rate limiting on auth endpoints (3-10 requests/min)
- Database query optimization with Prisma
- Connection pooling via PostgreSQL
- Caching with Redis
- Gzip compression

### Frontend

- Next.js built-in code splitting
- Image optimization with Next.js
- CSS minification with Tailwind
- Dynamic imports for large components
- SWR caching for API requests

## Security Considerations

- 🔒 JWT tokens with expiration
- 🔒 Password hashing with bcrypt
- 🔒 CORS configuration
- 🔒 Environment variables for secrets
- 🔒 SQL injection prevention with Prisma

## Deployment

### Frontend (Vercel - Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

**Environment variables needed on Vercel:**

- `NEXT_PUBLIC_API_URL` - Backend API URL (e.g., https://api.yourdomain.com)

### Backend (Docker)

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy compiled code
COPY backend/dist ./dist
COPY backend/prisma ./prisma

# Run migrations
RUN npx prisma migrate deploy

# Expose port
EXPOSE 3001

# Start server
CMD ["node", "dist/main.js"]
```

**Deploy to any platform:**

- Railway.app
- Render
- Fly.io
- AWS ECS / Elastic Beanstalk
- Google Cloud Run
- Heroku
- DigitalOcean

### Production Environment Variables

```env
# Backend
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/dbname
REDIS_URL=redis://host:6379
JWT_SECRET=<your-super-secret-key>
JWT_EXPIRATION=3600
REFRESH_TOKEN_SECRET=<another-secret-key>
REFRESH_TOKEN_EXPIRATION=604800

# Frontend
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Database Backup & Recovery

```bash
# Backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore
psql $DATABASE_URL < backup.sql

# Automated backup (cron job)
0 2 * * * pg_dump $DATABASE_URL | gzip > /backups/db_$(date +\%Y\%m\%d).sql.gz
```

## Project Structure

```
untitled/
├── backend/                    # NestJS REST API
│   ├── src/
│   │   ├── modules/           # Feature modules
│   │   │   ├── auth/          # Authentication & JWT
│   │   │   ├── course/        # Course management
│   │   │   ├── enrollment/    # Student enrollments
│   │   │   ├── grade/         # Grade management
│   │   │   ├── schedule/      # Course schedules (NEW)
│   │   │   ├── student/       # Student info
│   │   │   ├── teacher/       # Teacher info
│   │   │   ├── user/          # User profiles
│   │   │   ├── email/         # Email service
│   │   │   ├── redis/         # Caching
│   │   │   └── ...
│   │   ├── config/            # App configuration
│   │   ├── guards/            # Auth guards (JWT, roles)
│   │   ├── strategies/        # Passport strategies
│   │   ├── prisma/            # Database service
│   │   └── main.ts            # App entry point
│   ├── prisma/
│   │   ├── schema.prisma      # Prisma database schema
│   │   └── seed.ts            # Database seeding
│   ├── test/                  # E2E tests
│   ├── dist/                  # Compiled output
│   └── package.json
│
├── frontend/                   # Next.js web application
│   ├── app/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   └── ui/               # Shadcn/ui components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities & helpers
│   ├── public/                # Static assets
│   └── package.json
│
└── package.json               # Root workspace (Yarn)
```

## License

MIT License - This project is free for personal and commercial use.

See LICENSE file for complete details.

## Support & Contributing

### Need Help?

- **📚 API Documentation**: `http://localhost:3001/api/docs` (Swagger)
- **🐛 Report Bugs**: Create a [GitHub Issue](https://github.com/yourusername/repo/issues)
- **💬 Discussions**: Start a [Discussion](https://github.com/yourusername/repo/discussions)
- **📧 Email**: support@yourdomain.com

### Want to Contribute?

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style & Standards

- **Language**: TypeScript (strict mode)
- **Linting**: ESLint + Prettier
- **Testing**: Jest for unit tests
- **API Docs**: Swagger/OpenAPI
- **Formatting**: 2 spaces indentation
- **Naming**: camelCase for variables, PascalCase for classes/types

### Development Workflow

```bash
# Development with hot reload
yarn dev

# Run tests
yarn test

# Check coverage
yarn test:cov

# Build for production
yarn build

# Lint & format code
yarn lint
yarn format

# View Prisma schema visually
yarn prisma studio
```

---

**Status**: 🟢 Active Development  
**Last Updated**: 2024  
**Contributors**: Development Team  
**Give us a star ⭐ if this project helps you!**

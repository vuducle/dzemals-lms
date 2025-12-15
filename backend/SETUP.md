# Backend Setup Guide

## 🚀 Automatisches Setup für neue Klone

Wenn du das Projekt zum ersten Mal klonst, sind nur 3 Schritte nötig:

### 1. Dependencies installieren

```bash
cd backend
npm install
```

### 2. Environment Variablen konfigurieren (optional)

Erstelle eine `.env` Datei im `backend/` Verzeichnis:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=dzemals_super_app
DB_SCHEMA=public

# Server Port
PORT=3000

# JWT Secrets
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# CORS
CORS_ORIGIN=http://localhost:3001
```

### 3. App starten

```bash
npm run start:dev
```

Das ist alles! Beim Start wird automatisch:

- ✅ Die Datenbank erstellt (falls nicht vorhanden)
- ✅ Alle Tabellen migriert
- ✅ Seed-Daten eingefügt

## 📊 Test-Benutzer

Nach dem Setup stehen diese Test-Benutzer zur Verfügung:

### Teacher

- **Email:** julia.nguyen@example.com
- **Password:** Teacher123!

### Student

- **Email:** triesnha.ameilya@example.com
- **Password:** Student123!

## 🔧 Manuelle Befehle

Falls nötig kannst du auch manuell folgende Befehle ausführen:

### Datenbank & Migrations

```bash
# Nur Migrations ausführen
npm run setup-db

# Seed-Daten einfügen
npm run seed
```

### Development

```bash
# App mit Watch-Mode starten
npm run start:dev

# App debuggen
npm run start:debug

# App produktiv starten
npm run start:prod
```

### Code Quality

```bash
# ESLint
npm run lint

# Prettier Formatting
npm run format

# Tests
npm run test
npm run test:watch
npm run test:cov
```

## 🗄️ Datenbank-Schema

Das Projekt verwendet PostgreSQL mit folgenden Tabellen:

- **User**: Alle Benutzer (Teacher/Student)
- **Teacher**: Teacher-Profile
- **Student**: Student-Profile
- **Course**: Kurse (erstellt von Teacher)
- **Enrollment**: Student-Enrollment in Kurse
- **Grade**: Noten (Teacher setzt für Student in Course)

## 📝 API Documentation

Nach dem Start ist die Swagger API-Dokumentation verfügbar:

```
http://localhost:3000/api/docs
```

Dort kannst du alle Endpoints testen mit den Test-Benutzerdaten.

## 🛠️ Features

- ✅ JWT Authentication (Access + Refresh Token)
- ✅ CORS enabled
- ✅ Rate Limiting (100 req/min global, custom per endpoint)
- ✅ User Avatar Support
- ✅ Swagger Documentation
- ✅ Automatic Database Setup
- ✅ Database Migrations
- ✅ Seed Data

## ⚙️ Technologie Stack

- NestJS 11
- Prisma 7 (mit PostgreSQL Adapter)
- JWT Authentication
- Swagger/OpenAPI
- TypeScript
- PostgreSQL 15+

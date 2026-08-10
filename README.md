# LMS — Learning Management System

A full-stack Learning Management System built with **ASP.NET Core 8 (Clean Architecture)** and **React 19 + Vite**.

## Architecture

```
LMS.sln
├── LMS.Domain          # Entities, enums, domain contracts (no dependencies)
├── LMS.Application     # Use cases, services (JWT, business logic), DTOs
├── LMS.Infrastructure  # EF Core, SQL Server persistence, repositories
├── LMS.API             # ASP.NET Core Web API (controllers, auth, DI wiring)
└── lms-frontend        # React 19 + Vite + Tailwind CSS client
```

The backend follows Clean Architecture: dependencies point inward (`API → Infrastructure/Application → Domain`), keeping the domain model independent of frameworks and storage.

## Features

- JWT-based authentication and role-based authorization (Admin / Trainee)
- Course management: create, publish, and enroll in courses
- Lesson delivery with progress tracking
- EF Core code-first migrations against SQL Server
- Responsive React frontend with Tailwind CSS

## Tech Stack

| Layer      | Technology                                    |
|------------|-----------------------------------------------|
| Backend    | .NET 8, ASP.NET Core Web API, EF Core         |
| Auth       | JWT Bearer tokens                             |
| Database   | SQL Server (LocalDB for development)          |
| Frontend   | React 19, Vite, Tailwind CSS                  |

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 20+](https://nodejs.org/)
- SQL Server or LocalDB

### Backend

```bash
# Set the JWT signing key (required — never commit it)
# PowerShell:
$env:Jwt__Key = "<generate-a-long-random-secret>"
# or use user-secrets:
dotnet user-secrets set "Jwt:Key" "<generate-a-long-random-secret>" --project LMS.API

dotnet restore
dotnet ef database update --project LMS.Infrastructure --startup-project LMS.API
dotnet run --project LMS.API
```

The API starts on `https://localhost:7xxx` (see console output) with Swagger UI at `/swagger`.

### Frontend

```bash
cd lms-frontend
npm install
npm run dev
```

## Configuration

| Key                         | Description                              | Where to set                       |
|-----------------------------|------------------------------------------|------------------------------------|
| `ConnectionStrings:Default` | SQL Server connection string             | `appsettings.json` / env var       |
| `Jwt:Key`                   | JWT signing key (min 32 chars)           | env var `Jwt__Key` or user-secrets |

**Never commit real secrets.** `Jwt:Key` is intentionally empty in `appsettings.json` — the app will fail fast at startup if it is not provided.

## License

MIT

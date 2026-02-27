# Amazon Clone – Scalable Full-Stack E-Commerce Platform

A production-oriented, scalable full-stack e-commerce platform engineered to replicate Amazon’s core shopping experience.

Built with a modern React frontend and a secure Spring Boot backend, this system implements stateless authentication, modular architecture, role-based authorization, and analytical dashboards — designed with real-world software engineering principles in mind.

---

## Key Design Decisions

- Stateless authentication using JWT for horizontal scalability
- Role-based access control (USER / ADMIN)
- Separation of business logic from controllers
- DTO-based request/response modeling
- Relational integrity enforced via JPA mappings

---

## Tech Stack

## Frontend

- React 19 (Vite)
- React Router 7
- Axios
- Recharts
- Day.js
- ESLint

## Backend

- Spring Boot 3.5.10
- Java 25
- Maven
- Spring Security
- JWT Authentication
- Spring Data JPA + JDBC
- MySQL
- Spring Boot Mail

---

## Security Architecture

### Authentication Flow

1. User logs in with credentials.
2. Backend authenticates via Spring Security.
3. JWT token is generated and signed.
4. Token returned to client.
5. Every protected request validates JWT.
6. Role-based access enforced via filters.

### Security Features

- Password hashing (BCrypt)
- Stateless session management
- JWT signature validation
- Role-based authorization
- Protected admin endpoints

---

## Core Features

## User System

- Secure signup & login
- Role-based permissions
- Order history tracking

## Shopping Experience

- Dynamic product catalog
- Category-based filtering
- Add to cart functionality
- Real-time cart updates
- Delivery selection logic

## Checkout Workflow

- Order creation
- Order item persistence
- Status tracking
- Confirmation email integration

## Admin Dashboard

- Product management (CRUD)
- Order monitoring
- Sales trend visualization (Recharts)
- Revenue analytics

---

## Database Design

### Entities

- Users
- Products
- Categories
- Cart
- Orders
- OrderItems

### Relationships

- One-to-Many: User → Orders
- One-to-Many: Order → OrderItems
- Many-to-One: Product → Category

Designed with normalized schema and foreign key constraints to maintain data consistency.

---

## Scalability Considerations

This system is designed to support future scaling:

- JWT enables horizontal scaling (no server session state)
- Service layer abstraction allows easy migration to microservices
- Can integrate Redis for caching frequently accessed products
- Payment gateway can be integrated (Stripe/Razorpay)
- Docker-ready structure
- Easily deployable to AWS EC2 / ECS

---

## Engineering Concepts Demonstrated

- RESTful API Design
- Authentication & Authorization
- Database Relationship Modeling
- MVC Pattern
- DTO & Service Abstraction
- State Management (Frontend)
- Data Visualization
- Email Automation
- Production-structured project organization

---

## Future Enhancements

- Payment Gateway Integration
- Redis caching
- Rate limiting
- API documentation via Swagger
- CI/CD pipeline
- Docker & Kubernetes deployment
- Event-driven architecture (Kafka)
- Microservices decomposition

---

# JobTrackr

A job application tracking application built with Spring Boot. It allows users to securely manage and track their job
applications through REST APIs.

## Features

- User registration and login
- JWT-based authentication
- User-specific job applications
- Create, view, update, and delete job applications
- Request validation
- Global exception handling
- Request and response DTOs
- Swagger/OpenAPI API documentation
- JWT authentication support in Swagger

## Tech Stack

- **Language:** Java
- **Framework:** Spring Boot
- **Security:** Spring Security, JWT
- **Database:** Spring Data JPA, PostgreSQL
- **Build Tool:** Maven
- **Documentation:** Swagger / OpenAPI
- **Utilities:** Lombok

## Authentication

JobTrackr uses JWT-based authentication.

Users can:

1. Register an account
2. Log in using their email and password
3. Receive a JWT token
4. Use the token to access protected job APIs

Protected requests require the following header:

```text
Authorization: Bearer <JWT_TOKEN>
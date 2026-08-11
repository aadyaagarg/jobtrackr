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
- **Database:** PostgreSQL
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
```

## API Endpoints

### Authentication

| Method | Endpoint             | Description           | Authentication |
|--------|----------------------|-----------------------|----------------|
| POST   | `/api/auth/register` | Register a new user   | No             |
| POST   | `/api/auth/login`    | Login and receive JWT | No             |

### Jobs

| Method | Endpoint         | Description               | Authentication |
|--------|------------------|---------------------------|----------------|
| POST   | `/api/jobs`      | Create a job              | Yes            |
| GET    | `/api/jobs`      | Get logged-in user's jobs | Yes            |
| GET    | `/api/jobs/{id}` | Get a job by ID           | Yes            |
| PUT    | `/api/jobs/{id}` | Update a job              | Yes            |
| DELETE | `/api/jobs/{id}` | Delete a job              | Yes            |

## Job Information

Each job application can contain:

- Company
- Job title
- Location
- Job link
- Applied date
- Status
- Minimum salary
- Maximum salary
- Source
- Notes

## Validation

The application uses Jakarta Bean Validation to validate incoming requests.

For example:

```java

@NotBlank
private String company;
```

Required fields are validated before the request reaches the service layer.

## Exception Handling

JobTrackr uses global exception handling to provide consistent error responses.

The current error response contains:

- Timestamp
- HTTP status
- Error message

Example:

```json
{
  "timestamp": "2026-08-12T00:00:00",
  "status": 404,
  "message": "Job not found"
}
```

## DTOs

The application uses separate DTOs for API requests and responses.

- **Request DTOs:** Used to receive and validate data from the client.
- **Response DTOs:** Used to control the data returned to the client without directly exposing database entities.

## Swagger / OpenAPI

Swagger UI is integrated using Springdoc OpenAPI for API documentation and testing.

After starting the application, open:

[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

Swagger provides an interactive interface for:

- Viewing available endpoints
- Viewing request and response models
- Testing APIs
- Testing protected endpoints using JWT authentication

To test protected endpoints:

1. Login using /api/auth/login.
2. Copy the JWT token from the response.
3. Click Authorize in Swagger.
4. Enter the JWT token.
5. Execute the protected Job APIs.

## Future Improvements

- React frontend
- Pagination and sorting
- Search and filtering
- Unit and integration testing
- MapStruct for DTO mapping
- Dockerization
- Deployment
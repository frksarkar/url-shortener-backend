## 📚 API Documentation

All endpoints return JSON. Authentication is required for most routes (except registration, login, health check, and redirect).  
Base URL: `http://localhost:5000/api`

> 🔐 **Authentication**: Use `Bearer <JWT_TOKEN>` in the `Authorization` header for protected routes.

### ✅ Health Check
```http
GET /api/health
```
- **Response (200 OK)**:
  ```json
  {
    "status": "OK",
    "timestamp": "2026-01-10T12:00:00.000Z"
  }
  ```

---

### 🔑 Authentication

#### Register a new user
```http
POST /auth/register
```
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secure123"
  }
  ```
- **Success (201 Created)**:
  ```json
  {
    "_id": "65...",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### Login
```http
POST /auth/login
```
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "secure123"
  }
  ```
- **Success (200 OK)**:
  ```json
  {
    "user": {
      "_id": "65...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### Get current user profile
```http
GET /auth/me
```
- **Headers**: `Authorization: Bearer <token>`
- **Success (200 OK)**:
  ```json
  {
    "_id": "65...",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-01-10T10:00:00.000Z",
    "updatedAt": "2026-01-10T10:00:00.000Z"
  }
  ```

---

### 🔗 URL Management (Requires Auth)

#### Shorten a URL
```http
POST /url/shorten
```
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "originalUrl": "https://google.com"
  }
  ```
- **Success (201 Created)**:
  ```json
  {
    "id": "65...",
    "originalUrl": "https://google.com",
    "shortUrl": "http://localhost:5000/abc123",
    "shortCode": "abc123",
    "clicks": 0,
    "createdAt": "2026-01-10T10:05:00.000Z"
  }
  ```

#### Get all your URLs + analytics
```http
GET /url/me
```
- **Headers**: `Authorization: Bearer <token>`
- **Success (200 OK)**:
  ```json
  {
    "totalLinks": 2,
    "totalClicks": 15,
    "urls": [
      {
        "id": "65...",
        "originalUrl": "https://google.com",
        "shortUrl": "http://localhost:5000/abc123",
        "shortCode": "abc123",
        "clicks": 10,
        "createdAt": "2026-01-10T10:05:00.000Z"
      }
    ]
  }
  ```

#### Delete a short URL
```http
DELETE /url/{id}
```
- **Headers**: `Authorization: Bearer <token>`
- **Success (200 OK)**:
  ```json
  { "message": "URL deleted" }
  ```

---

### 🌐 Public Redirect Endpoint

#### Redirect using short code
```http
GET /{shortCode}
```
- Example: `GET /abc123`
- **Behavior**: 
  - If found → `302 Found` redirect to original URL + increment click count.
  - If not found → `404 Not Found` with JSON error.

---

> 💡 **Interactive Docs**: When server is running, visit [`http://localhost:5000/api-docs`](http://localhost:5000/api-docs) for live Swagger UI.
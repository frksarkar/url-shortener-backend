# URL Shortener Backend API

A scalable and secure URL Shortener Backend API built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.  
This API provides authentication, URL shortening, redirection, and basic analytics, following clean architecture and best practices.


## 🚀 Tech Stack
- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Language:** TypeScript  
- **Database:** MongoDB + Mongoose  
- **Authentication:** JWT (Access Token)  
- **Security:** bcrypt, helmet, cors  
- **Logging:** morgan  
- **ID Generator:** nanoid  
- **API Docs:** Swagger (swagger-jsdoc, swagger-ui-express)  


## 📦 Setup Instructions

### 1️⃣ Clone the Repository

```bash
    git clone https://github.com/frksarkar/url-shortener-backend.git
    cd url-shortener-backend
```

### 2️⃣ Install Dependencies

```
    npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in the root directory.

```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/url-shortener
    JWT_SECRET=your_jwt_secret
    BASE_URL=http://localhost:5000
    CLIENT_URL=http://localhost:3000
```

### 4️⃣ Run Development Server

```
    npm run dev
```

Server will run at:

```
    http://localhost:5000   
```

### 5️⃣ Build & Run Production

```
    npm run build
    npm start
```

## 📁 Project Structure
```
    src/
    ├── config/
    │   ├── db.config.ts           # MongoDB connection
    │   ├── swagger.config.ts      # Swagger configuration
    │   └── index.ts
    │
    ├── controllers/
    │   ├── auth.controller.ts     # Auth logic (register/login)
    │   ├── url.controller.ts      # URL shortening & redirect logic
    │   └── index.ts
    │
    ├── middleware/
    │   ├── auth.middleware.ts     # JWT authentication middleware
    │   └── index.ts
    │
    ├── models/
    │   ├── User.model.ts          # User schema
    │   ├── Url.model.ts           # URL schema
    │   └── index.ts
    │
    ├── routes/
    │   ├── auth.route.ts          # Auth routes
    │   ├── url.route.ts           # URL routes
    │   └── index.ts
    │
    ├── utils/
    │   ├── generateShortId.ts     # Short ID generator
    │   ├── jwt.utils.ts           # JWT helper functions
    │   └── index.ts
    │
    ├── app.ts                     # Express app entry point
    │
    ├── .env
    ├── package.json
    ├── tsconfig.json
    └── README.md
```
## 🔌 API Documentation

* **API Documentation** → [Documentation](https://github.com/frksarkar/url-shortener-backend/tree/main/docs/API_DOC.md)
* **Swagger UI** → After running the server, access:
```
    http://localhost:5000/api-docs
```

## 🎨 Design Decisions

- **Clean Architecture**: Follows a modular structure with clear separation of concerns (controllers, routes, models, middleware, utils) for maintainability and scalability.
- **JWT-Based Authentication**: Stateless, secure user authentication using JSON Web Tokens with 7-day expiry; sensitive operations are protected via middleware.
- **Centralized Authorization**: Reusable `protect` middleware enforces authentication across private routes consistently.
- **Collision-Resistant Short IDs**: Uses `nanoid` (6-character, URL-safe, high-entropy) to generate unique short codes with minimal collision risk.
- **Input Validation & Security**: 
  - Validates URL format before shortening.
  - Enforces 100 URLs per user limit to prevent abuse.
  - Prevents duplicate original URLs.
  - Secures passwords with `bcrypt` hashing.
- **Built-in Analytics**: Tracks click counts per short link with atomic increment on redirect.
- **Comprehensive API Documentation**: Auto-generated Swagger/OpenAPI docs (`/api-docs`) with live examples and schema definitions.
- **Developer Experience**: 
  - TypeScript for type safety.
  - Environment-based configuration.
  - Morgan logging for request visibility.
  - CORS and Helmet for security hardening.
- **RESTful Conventions**: Consistent resource naming, status codes, and error responses.

## ⚠️ Known Limitations

- **No Refresh Token Support**: JWT access tokens expire after 7 days with no mechanism to refresh them silently.
- **No Rate Limiting**: The API lacks request rate limiting, making it potentially vulnerable to abuse or DDoS.
- **No Automated Tests**: Unit, integration, or end-to-end tests are not included (relies on manual validation).
- **Basic Analytics Only**: Tracks only total click count—no IP logging, geolocation, device info, or time-series data.
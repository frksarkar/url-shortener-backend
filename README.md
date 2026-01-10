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
- **MVC Architecture** → clean separation of concerns 
- **JWT Authentication** → stateless security 
- **Middleware-based Authorization** → centralized access control 
- **Service-style Utilities** → reusable logic helpers
- **Swagger Documentation** → clear API reference
- **nanoid** → collision-resistant short IDs

## ⚠️ Known Limitations

* No refresh token implementation
* No rate limiting (can be added)
* No automated tests
* Basic analytics only (click count)
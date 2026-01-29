# Authentication API

## Overview
- Node.js, Express.js, Mongoose, JWT
- MVC structure with models, controllers, routes, middleware
- Bearer token authentication and authorization
- Postman collection included: `postman_collection.json`

## Setup
- Create `.env` based on `.env.example`
- Install dependencies: `npm install`
- Run in dev: `npm run dev`
- Run in prod: `npm start`

## Environment
- PORT: server port
- MONGODB_URI: MongoDB connection string
- JWT_SECRET: signing secret
- JWT_EXPIRES_IN: token lifetime, e.g. `1h`

## Endpoints
- GET `/health` returns status
- POST `/api/auth/register` body `{ username, email, password }`
- POST `/api/auth/login` body `{ email, password }` returns `{ token }`
- GET `/api/user/me` header `Authorization: Bearer <token>`

## Postman
- Import `postman_collection.json`
- Set `baseUrl` to your server URL
- After login, set `token` variable for protected requests

## Deployment (Render)
- Create new Web Service
- Build Command: `npm install`
- Start Command: `npm start`
- Add environment variables in Render dashboard
- Use a MongoDB service such as Atlas and set `MONGODB_URI`

## Notes
- Passwords are hashed with bcrypt
- JWT payload includes `sub`, `email`, `username`
- Validation uses `zod`

# LinkLens

A backend-heavy URL shortener & analytics platform built to showcase strong system design, authentication, and data-handling skills.

## Why LinkLens?

Most URL shorteners stop at generating short links. **LinkLens** was built to explore and demonstrate real-world backend engineering concepts such as:

* Secure authentication using JWT access & refresh tokens
* Designing scalable redirect flows
* Tracking and aggregating analytics data efficiently
* Enforcing link-level permissions and constraints

This project focuses on **clean API design, correctness, and backend depth**, rather than frontend complexity.

---

## Core Features

### URL Management

* Shorten URLs using auto-generated 

### Authentication & Authorization

* JWT-based authentication
* Short-lived access tokens
* Refresh token flow for session continuity
* Route protection and ownership checks

### Analytics & Tracking

* Track every redirect with:

  * Timestamp
  * IP address
  * User agent
  * Referrer
* Per-link analytics retrieval for dashboards

  * Total clicks
  * Unique visitors
  * Time-based click trends

## Tech Stack

### Backend

* **Node.js**
* **Express.js**
* **MongoDB** with Mongoose
* **JWT** for authentication

## Frontend 

* Minimal frontend (dashboard & auth)

* Backend-first design philosophy

## Tooling

* **Postman** for API testing and documentation

* **Redis** (optional / planned) for caching analytics summaries

## Architecture

1. Client sends authenticated requests using JWT access tokens
2. Protected routes validate authentication and resource ownership
3. Redirect flow:

   * Log analytics data
   * Increment counters
   * Redirect to original URL
4. Analytics data is aggregated and exposed via dedicated endpoints

---

## API Documentation

All endpoints are documented using **Postman**, including:

* Authentication flows
* URL creation and management
* Redirect behavior
* Analytics retrieval

🔗 **Postman Collection:**
*[https://.postman.co/workspace/My-Workspace~44ddd2e2-a8be-4bc1-87b5-22e90d5cea68/collection/40210596-45a3aaf1-9066-4fac-9040-b0c5488b4c51?action=share&creator=40210596](https://.postman.co/workspace/My-Workspace~44ddd2e2-a8be-4bc1-87b5-22e90d5cea68/collection/40210596-45a3aaf1-9066-4fac-9040-b0c5488b4c51?action=share&creator=40210596)*

---

## Example API Endpoints

### Create Short URL

```
POST /api/url/shorten
```

### Get Link Analytics

```
GET /api/url/:id/stats
```

### Redirect to Original URL

```
GET /:slug
```

---

## Setup & Installation

### Prerequisites

* Node.js
* MongoDB

### Steps

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/linklens.git
   cd linklens
   ```

2. Install dependencies for both backend and frontend

   ```bash
   # Backend
   cd server
   npm install

   # Frontend
   cd ../client
   npm install
   ```

3. Environment configuration

   Create a `.env` file inside the **backend** directory. Sample `.env` files are provided for easy cloning.

4. Start the development servers

   ```bash
   # Backend server
   cd server
   npm run dev

   # Frontend server (in a new terminal)
   cd client
   npm run dev
   ```

## Security Considerations

* Access tokens are short-lived to reduce attack surface
* Refresh tokens are used to re-issue access tokens securely
* Protected routes require authentication
* Link modification and analytics access are restricted to owners

---

## Future Improvements

* Redis caching for high-traffic redirects

* Rate limiting per IP or per user

* Geo-location based analytics

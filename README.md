# Next.js RESTful API Project

## Overview

This project is a comprehensive RESTful API built using Next.js. It demonstrates how to create and manage users, categories, and blogs, utilizing the powerful features of Next.js and MongoDB.

## Features

- User Authentication
- Category Management
- Blog Management
- Custom Middleware for Authentication
- Comprehensive Error Handling

## Technology Stack

- **Framework:** Next.js
- **Database:** MongoDB, Mongoose
- **Language:** TypeScript


## API Endpoints

### User Routes

#### POST `/api/auth/login`
- Login a user and obtain a token.

### Category Routes

#### GET `/dashboard/categories`
- Fetch all categories for a user.

#### POST `/dashboard/categories`
- Create a new category.

#### PATCH `/dashboard/categories/[category]`
- Update an existing category.

#### DELETE `/dashboard/categories/[category]`
- Delete a category.

### Blog Routes

#### GET `/dashboard/blogs`
- Fetch all blogs for a user.

#### POST `/dashboard/blogs`
- Create a new blog.

#### GET `/dashboard/blogs/[blog]`
- Fetch a specific blog.

#### PATCH `/dashboard/blogs/[blog]`
- Update a blog.

#### DELETE `/dashboard/blogs/[blog]`
- Delete a blog.

## Middleware

### Authentication Middleware

Located at `lib/middleware/authMiddleware.ts`, this middleware validates the token provided in the request headers.

## Models

### User Model

Defined in `lib/models/user.ts`, this model handles the schema for user data.

### Category Model

Defined in `lib/models/category.ts`, this model handles the schema for category data.

### Blog Model

Defined in `lib/models/blog.ts`, this model handles the schema for blog data.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pasindusheshan127/next14-rest-api.git
   cd next14-rest-api
2. Install dependencies:
   ```bash
   npm install
3.Create a .env.local file in the root directory and add your MongoDB URI:
  ```env
    MONGODB_URI=your_mongodb_uri
  ```
4.Run the development server:
   ```bash
      npm run dev
   ```
5. Open http://localhost:3000 with your browser to see the result.   



This `README.md` provides an overview of your project, its features, the technology stack, the folder structure, detailed API endpoints, middleware, models, getting started instructions, and contribution guidelines. You can adjust and expand this template as needed to fit your project.


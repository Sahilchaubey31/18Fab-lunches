# E-Commerce Website

A complete e-commerce solution with React frontend and .NET Core backend.

## Features

- Product catalog with search and filtering
- Shopping cart functionality
- User authentication (login/register)
- Product detail pages
- Responsive design
- RESTful API backend

## Frontend (React)

### Setup
```bash
cd frontend
npm install
npm start
```

The frontend will run on http://localhost:3000

### Features
- Home page with featured products
- Products listing page
- Product detail pages
- Shopping cart
- User login/registration
- Responsive design

## Backend (.NET Core)

### Setup
```bash
cd backend/ECommerceAPI
dotnet restore
dotnet run
```

The API will run on https://localhost:7001

### API Endpoints

#### Products
- GET /api/products - Get all products
- GET /api/products/{id} - Get product by ID
- POST /api/products - Create new product
- PUT /api/products/{id} - Update product
- DELETE /api/products/{id} - Delete product

#### Authentication
- POST /api/auth/login - User login
- POST /api/auth/register - User registration

### Default Login Credentials
- Email: admin@test.com
- Password: password123

## Project Structure

```
18Fab-lunches/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
└── backend/
    └── ECommerceAPI/
        ├── Controllers/
        ├── Models/
        ├── Services/
        ├── DTOs/
        └── Program.cs
```

## Getting Started

1. Start the backend API:
   ```bash
   cd backend/ECommerceAPI
   dotnet run
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. Open http://localhost:3000 in your browser

## Technologies Used

### Frontend
- React 18
- React Router
- Axios
- CSS3

### Backend
- .NET 9.0
- ASP.NET Core Web API
- JWT Authentication
- Swagger/OpenAPI
# Setup Issues Fixed

## Problems Found and Resolved

### 1. **API URL Mismatch**
- **Issue**: Frontend was trying to connect to `https://localhost:7001/api` but the backend had `UsePathBase("/ECommerceAPI")` configured
- **Fix**: Removed `UsePathBase` from Program.cs to simplify routing. Frontend now correctly calls `https://localhost:7001/api`

### 2. **HTTPS Certificate Warning**
- **Issue**: Frontend connects via HTTPS to localhost, which requires a valid certificate
- **Fix**: Added `httpsAgent: { rejectUnauthorized: false }` to axios config for development (not recommended for production)

### 3. **Error Handling**
- **Issue**: API calls had fallback data that masked real errors
- **Fix**: Removed fallback data and added proper error handling with 401 redirect for authentication failures

## How to Run the Project

### Backend Setup
```bash
cd backend/ECommerceAPI
dotnet restore
dotnet run
```
The API will run on `https://localhost:7001`

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
The frontend will run on `http://localhost:3000`

## Testing the Setup

### 1. Test Products API
```
GET https://localhost:7001/api/products
```

### 2. Test Login
```
POST https://localhost:7001/api/auth/login
Body: {
  "email": "admin@test.com",
  "password": "password123"
}
```

### 3. Access Frontend
Open `http://localhost:3000` in your browser

## Important Notes

- The backend uses in-memory data storage (no database)
- JWT tokens expire after 7 days
- Default admin credentials: `admin@test.com` / `password123`
- CORS is enabled to allow frontend requests
- Swagger UI available at `https://localhost:7001/swagger`

## Troubleshooting

### Frontend can't connect to backend
1. Ensure backend is running on port 7001
2. Check browser console for CORS errors
3. Verify the API URL in `frontend/src/services/api.js`

### HTTPS certificate errors
- This is expected for localhost development
- The axios config now handles this with `rejectUnauthorized: false`

### Port already in use
- Backend: Change port in `Properties/launchSettings.json`
- Frontend: Use `PORT=3001 npm start` to use a different port

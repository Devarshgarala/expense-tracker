💰 Expense Tracker - MERN Stack Application

A full-stack expense tracking application built with MongoDB, Express.js, React.js, and Node.js. This application allows users to manage their daily expenses with comprehensive filtering and statistical analysis.

## 🚀 Features

### ✨ Core Functionality
- **User Management**: Add and manage users with email validation
- **Category Management**: Create and organize expense categories
- **Expense Tracking**: Add, view, update, and delete expenses
- **Advanced Filtering**: Filter expenses by user and date range
- **Statistics Dashboard**: View top 3 spending days per user
- **Currency Support**: Amounts displayed in Indian Rupees (₹)

### 🎯 Technical Features
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Real-time Updates**: React Query for optimized data fetching
- **Form Validation**: Client-side and server-side validation
- **Error Handling**: User-friendly error messages
- **TypeScript**: Type-safe frontend development
- **RESTful API**: Clean and organized backend architecture

## 🛠️ Tech Stack

### Frontend
- **React.js** with TypeScript
- **React Query** for state management
- **Axios** for API calls
- **Custom CSS** for styling
- **React Hooks** for component logic

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **MongoDB Atlas** for cloud database
- **CORS** for cross-origin requests
- **Environment variables** for configuration

### Database Schema
Users: { _id, name, email, status, timestamps }
Categories: { _id, name, timestamps }
Expenses: { _id, user_id, category_id, amount, date, description, timestamps }

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Devarshgarala/expense-tracker.git
cd expense-tracker


2. Backend Setup
bash
cd backend
npm install


Create .env file in backend folder:
envPORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key


Start the backend server:
bash
npm run dev
Backend will run on http://localhost:5000


3. Frontend Setup
bashcd
../frontend
npm install

Start the frontend application:
bash
npm start
Frontend will run on http://localhost:3000


4. Seed Sample Data (Optional)
bash
cd backend
npm run seed



🚀 Usage
Add Users: Create new users from the dashboard
Add Categories: Create expense categories (Food, Transport, etc.)
Track Expenses: Add expenses with user, category, amount, and date
Filter Data: Use filters to view specific expenses
View Statistics: Analyze spending patterns with top days statistics

📁 Project Structure
expense-tracker/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   ├── models/
│   │   ├── User.js
│   │   ├── Category.js
│   │   └── Expense.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── expenseRoutes.js
│   ├── scripts/
│   │   └── seedData.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   └── layout/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   └── App.tsx
│   └── public/
└── README.md



🔗 API Endpoints
Users

GET /api/users - Get all active users
POST /api/users - Create new user
GET /api/users/:id - Get user by ID

Categories

GET /api/categories - Get all categories
POST /api/categories - Create new category

Expenses

GET /api/expenses - Get all expenses (with optional filters)
POST /api/expenses - Create new expense
PUT /api/expenses/:id - Update expense
DELETE /api/expenses/:id - Delete expense
GET /api/expenses/stats/top-days - Get top spending days statistics

🎯 Key Features Implemented
Statistics Module
The application calculates and displays each user's top 3 spending days:

Groups expenses by user and date
Calculates total expenditure per day
Orders by highest spending amount
Displays with expense count for each day

Filtering System

User Filter: View expenses for specific users
Date Range Filter: Filter by start and end dates
Combined Filters: Use multiple filters simultaneously

Form Validations

Required field validation
Email format validation
Duplicate email prevention
Amount validation (positive numbers only)
Date validation

🔧 Development Scripts
Backend
bashnpm run dev      # Start development server with nodemon
npm start        # Start production server
npm run seed     # Seed sample data
Frontend
bashnpm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
🌟 Future Enhancements

 User authentication and authorization
 Expense categories with icons
 Data export functionality (CSV, PDF)
 Budget tracking and alerts
 Mobile app version
 Multi-currency support
 Expense receipt upload
 Advanced analytics and charts

👨‍💻 Developer
Devarsh Garala

Email: devarshgarala13@gmail.com
GitHub: [Devarshgarala]


const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');
const Category = require('../models/Category');
const Expense = require('../models/Expense');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Expense.deleteMany({});

    // Create users
    const users = await User.insertMany([
      { name: 'John Doe', email: 'john@example.com', status: 'active' },
      { name: 'Jane Smith', email: 'jane@example.com', status: 'active' },
      { name: 'Bob Johnson', email: 'bob@example.com', status: 'active' }
    ]);

    // Create categories
    const categories = await Category.insertMany([
      { name: 'Food' },
      { name: 'Transportation' },
      { name: 'Entertainment' },
      { name: 'Shopping' },
      { name: 'Bills' },
      { name: 'Healthcare' },
      { name: 'Education' },
      { name: 'Travel' }
    ]);

    // Create sample expenses
    const expenses = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const randomDate = new Date(today.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
      expenses.push({
        user_id: users[Math.floor(Math.random() * users.length)]._id,
        category_id: categories[Math.floor(Math.random() * categories.length)]._id,
        amount: Math.floor(Math.random() * 500) + 10,
        date: randomDate,
        description: `Sample expense ${i + 1}`
      });
    }

    await Expense.insertMany(expenses);

    console.log('Sample data inserted successfully!');
    console.log(`${users.length} users created`);
    console.log(`${categories.length} categories created`);
    console.log(`${expenses.length} expenses created`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

const runSeed = async () => {
  await connectDB();
  await seedData();
};

runSeed();
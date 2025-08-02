const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const mongoose = require('mongoose');

// GET all expenses with optional filters
router.get('/', async (req, res) => {
  try {
    const { user_id, start_date, end_date } = req.query;
    let filter = {};

    // Filter by user if provided
    if (user_id) {
      filter.user_id = user_id;
    }

    // Filter by date range if provided
    if (start_date && end_date) {
      filter.date = {
        $gte: new Date(start_date),
        $lte: new Date(end_date)
      };
    } else if (start_date) {
      filter.date = { $gte: new Date(start_date) };
    } else if (end_date) {
      filter.date = { $lte: new Date(end_date) };
    }

    const expenses = await Expense.find(filter)
      .populate('user_id', 'name email')
      .populate('category_id', 'name')
      .sort({ date: -1 });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single expense by ID
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id)
      .populate('user_id', 'name email')
      .populate('category_id', 'name');
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new expense
router.post('/', async (req, res) => {
  try {
    const { user_id, category_id, amount, date, description } = req.body;

    // Validation
    if (!user_id || !category_id || !amount || !date) {
      return res.status(400).json({ 
        message: 'User, category, amount, and date are required' 
      });
    }

    const expense = new Expense({
      user_id,
      category_id,
      amount,
      date: new Date(date),
      description
    });

    const savedExpense = await expense.save();
    
    // Populate the saved expense before returning
    const populatedExpense = await Expense.findById(savedExpense._id)
      .populate('user_id', 'name email')
      .populate('category_id', 'name');

    res.status(201).json(populatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update expense
router.put('/:id', async (req, res) => {
  try {
    const { user_id, category_id, amount, date, description } = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        user_id,
        category_id,
        amount,
        date: new Date(date),
        description
      },
      { new: true, runValidators: true }
    ).populate('user_id', 'name email')
     .populate('category_id', 'name');

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE expense
router.delete('/:id', async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET statistics - Top 3 days per user by total expenditure
router.get('/stats/top-days', async (req, res) => {
  try {
    const stats = await Expense.aggregate([
      {
        $group: {
          _id: {
            user_id: '$user_id',
            date: {
              $dateToString: { format: '%Y-%m-%d', date: '$date' }
            }
          },
          totalAmount: { $sum: '$amount' },
          expenseCount: { $sum: 1 }
        }
      },
      {
        $sort: { totalAmount: -1 }
      },
      {
        $group: {
          _id: '$_id.user_id',
          topDays: {
            $push: {
              date: '$_id.date',
              totalAmount: '$totalAmount',
              expenseCount: '$expenseCount'
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          topDays: { $slice: ['$topDays', 3] }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          user: {
            _id: '$user._id',
            name: '$user.name',
            email: '$user.email'
          },
          topDays: 1
        }
      }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
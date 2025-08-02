import React, { useState } from 'react';
import { Card, Input, Select, Button } from './ui';
import { useUsers, useCategories, useCreateExpense } from '../hooks';
import { formatDate } from '../utils';

export const AddExpenseForm: React.FC = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    category_id: '',
    amount: '',
    date: formatDate(new Date()),
    description: '',
  });

  const { data: users = [] } = useUsers();
  const { data: categories = [] } = useCategories();
  const createExpense = useCreateExpense();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.user_id || !formData.category_id || !formData.amount || !formData.date) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      await createExpense.mutateAsync({
        user_id: formData.user_id,
        category_id: formData.category_id,
        amount: parseFloat(formData.amount),
        date: formData.date,
        description: formData.description,
      });

      // Reset form
      setFormData({
        user_id: '',
        category_id: '',
        amount: '',
        date: formatDate(new Date()),
        description: '',
      });

      alert('Expense added successfully!');
    } catch (error) {
      alert('Error adding expense. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const userOptions = users.map(user => ({
    value: user._id,
    label: user.name,
  }));

  const categoryOptions = categories.map(category => ({
    value: category._id,
    label: category.name,
  }));

  return (
    <Card title="Add New Expense">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2">
          <Select
            label="User *"
            name="user_id"
            value={formData.user_id}
            onChange={handleInputChange}
            options={userOptions}
            required
          />
          
          <Select
            label="Category *"
            name="category_id"
            value={formData.category_id}
            onChange={handleInputChange}
            options={categoryOptions}
            required
          />
        </div>

        <div className="grid grid-cols-2">
          <Input
            label="Amount *"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="0"
            step="0.01"
            min="0"
            required
          />
          
          <Input
            label="Date *"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <Input
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Optional description"
        />

        <Button
          type="submit"
          disabled={createExpense.isPending}
          className="mt-4"
        >
          {createExpense.isPending ? 'Adding...' : 'Add Expense'}
        </Button>
      </form>
    </Card>
  );
};
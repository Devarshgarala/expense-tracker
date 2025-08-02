import React, { useState } from 'react';
import { Card, Input, Button } from './ui';
import { useCreateCategory } from '../hooks';

export const AddCategoryForm: React.FC = () => {
  const [categoryName, setCategoryName] = useState('');
  const createCategory = useCreateCategory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoryName.trim()) {
      alert('Please enter a category name');
      return;
    }

    try {
      await createCategory.mutateAsync(categoryName.trim());
      
      // Reset form
      setCategoryName('');
      alert('Category added successfully!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error adding category. Please try again.');
    }
  };

  return (
    <Card title="Add New Category">
      <form onSubmit={handleSubmit}>
        <Input
          label="Category Name *"
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name (e.g., Food, Transport)"
          required
        />

        <Button
          type="submit"
          disabled={createCategory.isPending}
          className="mt-4"
        >
          {createCategory.isPending ? 'Adding...' : 'Add Category'}
        </Button>
      </form>
    </Card>
  );
};
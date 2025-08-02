import React, { useState } from 'react';
import { Card, Input, Select, Button } from './ui';
import { useCreateUser } from '../hooks';

export const AddUserForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'active' as 'active' | 'inactive',
  });

  const createUser = useCreateUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      await createUser.mutateAsync(formData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        status: 'active',
      });

      alert('User added successfully!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error adding user. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  return (
    <Card title="Add New User">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2">
          <Input
            label="Name *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter user name"
            required
          />
          
          <Input
            label="Email *"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
            required
          />
        </div>

        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          options={statusOptions}
        />

        <Button
          type="submit"
          disabled={createUser.isPending}
          className="mt-4"
        >
          {createUser.isPending ? 'Adding...' : 'Add User'}
        </Button>
      </form>
    </Card>
  );
};
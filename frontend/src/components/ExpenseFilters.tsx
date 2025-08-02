import React, { useState } from 'react';
import { Card, Select, Input, Button } from './ui';
import { useUsers } from '../hooks';
import { ExpenseFilters } from '../types';
import { formatDate } from '../utils';

interface ExpenseFiltersProps {
  onFiltersChange: (filters: ExpenseFilters) => void;
  currentFilters: ExpenseFilters;
}

export const ExpenseFiltersComponent: React.FC<ExpenseFiltersProps> = ({
  onFiltersChange,
  currentFilters,
}) => {
  const [filters, setFilters] = useState<ExpenseFilters>(currentFilters);
  const { data: users = [] } = useUsers();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value || undefined }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(filters);
  };

  const handleClearFilters = () => {
    const emptyFilters = { user_id: undefined, start_date: undefined, end_date: undefined };
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const userOptions = users.map(user => ({
    value: user._id,
    label: user.name,
  }));

  return (
    <Card title="Filter Expenses">
      <div className="grid grid-cols-3">
        <Select
          label="Filter by User"
          name="user_id"
          value={filters.user_id || ''}
          onChange={handleFilterChange}
          options={userOptions}
        />
        
        <Input
          label="Start Date"
          type="date"
          name="start_date"
          value={filters.start_date || ''}
          onChange={handleFilterChange}
        />
        
        <Input
          label="End Date"
          type="date"
          name="end_date"
          value={filters.end_date || ''}
          onChange={handleFilterChange}
        />
      </div>

      <div className="flex justify-between mt-4">
        <Button onClick={handleApplyFilters}>
          Apply Filters
        </Button>
        <Button variant="secondary" onClick={handleClearFilters}>
          Clear Filters
        </Button>
      </div>
    </Card>
  );
};
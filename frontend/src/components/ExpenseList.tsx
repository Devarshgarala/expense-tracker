import React from 'react';
import { Card, Button, Loading } from './ui';
import { useExpenses, useDeleteExpense } from '../hooks';
import { ExpenseFilters } from '../types';
import { formatDisplayDate, formatCurrency } from '../utils';

interface ExpenseListProps {
  filters: ExpenseFilters;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ filters }) => {
  const { data: expenses = [], isLoading, error } = useExpenses(filters);
  const deleteExpense = useDeleteExpense();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await deleteExpense.mutateAsync(id);
        alert('Expense deleted successfully!');
      } catch (error) {
        alert('Error deleting expense. Please try again.');
      }
    }
  };

  if (isLoading) return <Loading message="Loading expenses..." />;
  
  if (error) {
    return (
      <Card title="Expenses">
        <p style={{ color: '#dc3545' }}>Error loading expenses. Please try again.</p>
      </Card>
    );
  }

  return (
    <Card title={`Expenses (${expenses.length})`}>
      {expenses.length === 0 ? (
        <p className="text-center" style={{ color: '#6c757d', padding: '20px' }}>
          No expenses found. {Object.keys(filters).length > 0 ? 'Try adjusting your filters.' : 'Add your first expense above.'}
        </p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>User</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Category</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Amount</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense._id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '12px' }}>{expense.user_id.name}</td>
                  <td style={{ padding: '12px' }}>{expense.category_id.name}</td>
                  <td style={{ padding: '12px', fontWeight: '600' }}>
                    {formatCurrency(expense.amount)}
                  </td>
                  <td style={{ padding: '12px' }}>{formatDisplayDate(expense.date)}</td>
                  <td style={{ padding: '12px' }}>
                    {expense.description || '-'}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(expense._id)}
                      disabled={deleteExpense.isPending}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};
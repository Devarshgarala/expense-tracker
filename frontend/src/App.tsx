import React, { useState } from 'react';
import {
  Header,
  AddExpenseForm,
  ExpenseFiltersComponent,
  ExpenseList,
  Statistics,
  AddUserForm,
  AddCategoryForm,
} from './components';
import { ExpenseFilters } from './types';

function App() {
  const [filters, setFilters] = useState<ExpenseFilters>({});

  const handleFiltersChange = (newFilters: ExpenseFilters) => {
    setFilters(newFilters);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header />
      
      <div className="container">
        {/* Management Section */}
        <div className="grid grid-cols-2" style={{ marginBottom: '30px' }}>
          <AddUserForm />
          <AddCategoryForm />
        </div>

        {/* Expense Management */}
        <div style={{ marginBottom: '30px' }}>
          <AddExpenseForm />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <ExpenseFiltersComponent
            currentFilters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </div>

        <div className="grid grid-cols-1" style={{ gap: '30px' }}>
          <ExpenseList filters={filters} />
          <Statistics />
        </div>
      </div>

      <footer style={{
        backgroundColor: '#343a40',
        color: 'white',
        textAlign: 'center',
        padding: '20px 0',
        marginTop: '50px'
      }}>
        <div className="container">
          <p style={{ margin: 0, fontSize: '14px' }}>
            © 2025 Expense Tracker. Built with React, Node.js & MongoDB.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
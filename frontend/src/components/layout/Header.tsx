import React from 'react';

export const Header: React.FC = () => {
  return (
    <header style={{
      backgroundColor: '#007bff',
      color: 'white',
      padding: '20px 0',
      marginBottom: '30px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div className="container">
        <h1 style={{ 
          margin: 0, 
          fontSize: '28px', 
          fontWeight: '700' 
        }}>
          💰 Expense Tracker
        </h1>
        <p style={{ 
          margin: '5px 0 0 0', 
          fontSize: '16px', 
          opacity: 0.9 
        }}>
          Track and manage your daily expenses
        </p>
      </div>
    </header>
  );
};
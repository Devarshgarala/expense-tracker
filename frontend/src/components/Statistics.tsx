import React from 'react';
import { Card, Loading } from './ui';
import { useTopDaysStats } from '../hooks';
import { formatCurrency, formatDisplayDate } from '../utils';

export const Statistics: React.FC = () => {
  const { data: stats = [], isLoading, error } = useTopDaysStats();

  if (isLoading) return <Loading message="Loading statistics..." />;
  
  if (error) {
    return (
      <Card title="Statistics - Top 3 Days by User">
        <p style={{ color: '#dc3545' }}>Error loading statistics. Please try again.</p>
      </Card>
    );
  }

  return (
    <Card title="Statistics - Top 3 Days by User">
      {stats.length === 0 ? (
        <p className="text-center" style={{ color: '#6c757d', padding: '20px' }}>
          No statistics available. Add some expenses to see data.
        </p>
      ) : (
        <div className="grid grid-cols-1">
          {stats.map((userStat) => (
            <div
              key={userStat.user._id}
              style={{
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
                backgroundColor: '#f8f9fa',
              }}
            >
              <h4 style={{ 
                margin: '0 0 10px 0', 
                color: '#495057',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                {userStat.user.name}
              </h4>
              <p style={{ 
                margin: '0 0 15px 0', 
                fontSize: '14px', 
                color: '#6c757d' 
              }}>
                {userStat.user.email}
              </p>

              {userStat.topDays.length === 0 ? (
                <p style={{ color: '#6c757d', fontStyle: 'italic' }}>
                  No expenses recorded for this user.
                </p>
              ) : (
                <div>
                  <h5 style={{ 
                    margin: '0 0 10px 0', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: '#495057'
                  }}>
                    Top {userStat.topDays.length} Day{userStat.topDays.length > 1 ? 's' : ''} by Spending:
                  </h5>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', fontSize: '14px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                          <th style={{ padding: '8px', textAlign: 'left', fontWeight: '600' }}>
                            Rank
                          </th>
                          <th style={{ padding: '8px', textAlign: 'left', fontWeight: '600' }}>
                            Date
                          </th>
                          <th style={{ padding: '8px', textAlign: 'left', fontWeight: '600' }}>
                            Total Amount
                          </th>
                          <th style={{ padding: '8px', textAlign: 'left', fontWeight: '600' }}>
                            # of Expenses
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {userStat.topDays.map((day, index) => (
                          <tr key={day.date}>
                            <td style={{ padding: '8px' }}>
                              <span style={{
                                backgroundColor: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32',
                                color: '#000',
                                padding: '2px 8px',
                                borderRadius: '12px',
                                fontSize: '12px',
                                fontWeight: '600'
                              }}>
                                #{index + 1}
                              </span>
                            </td>
                            <td style={{ padding: '8px' }}>
                              {formatDisplayDate(day.date)}
                            </td>
                            <td style={{ 
                              padding: '8px', 
                              fontWeight: '600',
                              color: '#28a745'
                            }}>
                              {formatCurrency(day.totalAmount)}
                            </td>
                            <td style={{ padding: '8px' }}>
                              {day.expenseCount} expense{day.expenseCount > 1 ? 's' : ''}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
import React from 'react';
import { useAuth } from './AuthContext';

const Account = () => {
  const { user } = useAuth(); // Access the logged-in user

  if (!user) {
    return <p>Please sign in to access your account.</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.displayName || user.email}!</h2>
      <p>Email: {user.email}</p>
      {/* Add more account-related details and options here */}
    </div>
  );
};

export default Account;

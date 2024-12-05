// UserContent.jsx
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContent = ({ children }) => {
  const [login, setlogin] = useState("");
  const [logout, setlogout] = useState(false);
  const [updateid, setUpdateid] = useState("");

  const contextValue = {
    login,
    setlogin,
    logout,
    setlogout,
    updateid,
    setUpdateid
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContent;

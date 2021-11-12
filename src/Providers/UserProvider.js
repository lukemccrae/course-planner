import React, { useContext, createContext, useState } from 'react';

export const UserContext = createContext(null);
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

  const [id, setId] = useState();
  const [username, setUsername] = useState('');

  return (
    <UserContext.Provider
      value={
        {
            id,
            setId,
            username,
            setUsername
        }
      }>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
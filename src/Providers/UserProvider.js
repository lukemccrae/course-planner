import React, { useContext, createContext, useState } from 'react';

export const UserContext = createContext(null);
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

  const [id, setId] = useState();
  const [username, setUsername] = useState('');
  const [courseId, setCourseId] = useState('');
  const [token, setToken] = useState('');

  return (
    <UserContext.Provider
      value={
        {
            id,
            setId,
            username,
            setUsername,
            courseId, 
            setCourseId,
            token,
            setToken
        }
      }>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
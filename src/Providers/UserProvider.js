import React, { useContext, createContext, useState } from 'react';

export const UserContext = createContext(null);
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

  const [id, setId] = useState();
  const [username, setUsername] = useState('');
  const [courseId, setCourseId] = useState('');
  const [token, setToken] = useState('');
  const [courseList, setCourseList] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [saved, setSaved] = useState(true);
  

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
            setToken,
            courseList,
            setCourseList,
            saved, 
            setSaved,
            loading, 
            setIsLoading
        }
      }>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
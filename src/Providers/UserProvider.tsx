import React, { useContext, createContext, useState } from 'react';

type CourseList = [{
  hash: string;
  _id: string;
  details: {
    name: string;
  }
}];

type UserProviderProps = {
  children: React.ReactNode
}

interface UserInterface {
  id: string;
  username: string;
  courseId: string;
  token: string;
  courseList: CourseList;
  loading: boolean;
  saved: boolean;
  setId: any;
  setUsername: any;
  setCourseId: any;
  setToken: any;
  setCourseList: any;
  setSaved: any;
  setIsLoading: any;
}

const userContext: UserInterface = {
  id: "",
  username: "",
  courseId: "",
  token: "",
  courseList: [{
    hash: "",
    _id: "",
    details: {
      name: ""
    }
  }],
  loading: false,
  saved: true,
  setId: () => {},
  setUsername: () => {},
  setCourseId: () => {},
  setToken: () => {},
  setCourseList: () => {},
  setSaved: () => {},
  setIsLoading: () => {}
}

export const UserContext = createContext<UserInterface>(userContext);
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: UserProviderProps) => {

  const [id, setId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [courseId, setCourseId] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [courseList, setCourseList] = useState<CourseList>([{
    hash: "",
    _id: "",
    details: {
      name: ""
    }
  }]);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [saved, setSaved] = useState<boolean>(true);
  

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
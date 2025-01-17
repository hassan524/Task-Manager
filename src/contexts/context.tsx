import React, { createContext, useState } from 'react';


const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [IsProjectOpen, setIsProjectOpen] = useState(false);
  const [IsGroupTaskOpen, setIsGroupTaskOpen] = useState(false);
  const [IsTaskOpen, setIsTaskOpen] = useState(false);

  const [IsProjectCreate, SetIsProjectCreate] = useState(false)
  const [IsGroupProjectCreate, SetIsGroupProjectCreate] = useState(false)
  const [IsTaskCreate, SetIsTaskCreate] = useState(false)

  const [IsManageProject, SetIsManageProject] = useState(false)

  return (
    <MyContext.Provider value={{
      IsProjectOpen, setIsProjectOpen, IsGroupTaskOpen, setIsGroupTaskOpen, IsTaskOpen, setIsTaskOpen,
      IsProjectCreate, SetIsProjectCreate, IsManageProject, SetIsManageProject, 
      IsGroupProjectCreate, SetIsGroupProjectCreate, IsTaskCreate, SetIsTaskCreate
    }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;

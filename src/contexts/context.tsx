import React, { createContext, useState } from 'react';


const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider = ({ children }: { children: React.ReactNode }) => {
  const [IsProjectOpen, setIsProjectOpen] = useState(true);

  return (
    <MyContext.Provider value={{ IsProjectOpen, setIsProjectOpen }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;

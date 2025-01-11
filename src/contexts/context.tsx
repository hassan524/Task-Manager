import React, { createContext, useState } from 'react';

interface MyContextType {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider = ({ children }: { children: React.ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <MyContext.Provider value={{ openSidebar, setOpenSidebar }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;

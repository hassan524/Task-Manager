import React, { createContext, useState } from 'react';
import { db } from '@/main/firebase';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider = ({ children }: { children: React.ReactNode }) => {

  const [IsProjectOpen, setIsProjectOpen] = useState(false);
  const [IsGroupTaskOpen, setIsGroupTaskOpen] = useState(false);
  const [IsTaskOpen, setIsTaskOpen] = useState(false);

  const [IsProjectCreate, SetIsProjectCreate] = useState(false)
  const [IsGroupProjectCreate, SetIsGroupProjectCreate] = useState(false)
  const [IsTaskCreate, SetIsTaskCreate] = useState(false)

  const [IsManageProject, SetIsManageProject] = useState(false)
  const [IsManageGroup, SetIsManageGroup] = useState(false)

  // delete function 
  async function deleteDocument(type: any) {
    if (type.type === 'project') {
      const docRef = doc(db, 'projects', type.id);
      await deleteDoc(docRef);

    } else if (type.type === 'Groups') {
      const docRef = doc(db, 'Groups', type.id);
      await deleteDoc(docRef);
    } else if (type.type === 'Tasks') {
      const docRef = doc(db, 'Tasks', type.id);
      await deleteDoc(docRef);
    } else if (type.type === 'GroupOfProject') {
      const docRef = doc(db, 'GroupOfProject', type.id);
      await deleteDoc(docRef);
    }
  }

  return (
    <MyContext.Provider value={{
      IsProjectOpen, setIsProjectOpen, IsGroupTaskOpen, setIsGroupTaskOpen, IsTaskOpen, setIsTaskOpen,
      IsProjectCreate, SetIsProjectCreate, IsManageProject, SetIsManageProject,
      IsGroupProjectCreate, SetIsGroupProjectCreate, IsTaskCreate, SetIsTaskCreate,
      deleteDocument, IsManageGroup, SetIsManageGroup
    }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
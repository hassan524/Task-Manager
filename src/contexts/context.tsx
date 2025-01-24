import React, { createContext, useState } from 'react';
import { db } from '@/main/firebase';
import { doc, deleteDoc, updateDoc, collection, getDocs, getDoc, query, where } from 'firebase/firestore';
import { useSelector } from 'react-redux';

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider = ({ children }: { children: React.ReactNode }) => {

  const myData = useSelector((state) => state.user);

  const [IsProjectOpen, setIsProjectOpen] = useState(false);
  const [IsGroupTaskOpen, setIsGroupTaskOpen] = useState(false);
  const [IsTaskOpen, setIsTaskOpen] = useState(false);
  const [IsNoteOepn, setIsNoteOpen] = useState(false)

  const [IsProjectCreate, SetIsProjectCreate] = useState(false)
  const [IsGroupProjectCreate, SetIsGroupProjectCreate] = useState(false)
  const [IsTaskCreate, SetIsTaskCreate] = useState(false)

  const [IsManageProject, SetIsManageProject] = useState(false)
  const [IsManageGroup, SetIsManageGroup] = useState(false)
  
  const [IsTodoOpen, SetIsTodoOpen] = useState(false)

  const [IsLogOutOpen, SetIsLogOutOpen] = useState(false)

  // delete function 
  async function deleteDocument(type: any) {
    if (type.type === 'project') {
      const docRef = doc(db, 'projects', type.id);
      await deleteDoc(docRef);

    } else if (type.type === 'Groups') {
      const docRef = doc(db, 'Groups', type.id);
      await deleteDoc(docRef);
    } else if (type.type === 'Task') {
      const docRef = doc(db, 'Tasks', type.id);
      await deleteDoc(docRef);
    } else if (type.type === 'GroupOfProject') {
      const docRef = doc(db, 'GroupOfProject', type.id);
      await deleteDoc(docRef);
    }
  }

  // Complete function 
  async function Complete(type: any) {
    if (type.type === 'Task') {
      const docRef = doc(db, 'Tasks', type.id);
      await updateDoc(docRef, {
        IsCompleted: true,
      });
    }
    else if (type.type === 'GroupOfTask2') {
      const docRef = doc(db, 'GroupOfTask2', type.id);
      await updateDoc(docRef, {
        IsCompleted: true,
      });
    }
    else if (type.type === 'Groups') {
      const docRef = doc(db, 'Groups', type.id);

      const q = query(
        collection(db, 'GroupOfTask2'),
        where('ProjectId', '==', type.id)
      );

      const querySnapshot = await getDocs(q);
      const docsData = querySnapshot.docs.map((doc) => doc.data());

      const allCompleted = docsData.every((doc) => doc.IsCompleted === true);

      if (allCompleted) {
        await updateDoc(docRef, {
          IsCompleted: true,
        });
      } else {
        alert('Please first complete all tasks of this group');
      }
    }
    else if (type.type === 'TasksOfGroupProjects') {
      const docRef = doc(db, 'TasksOfGroupProjects', type.id);
      await updateDoc(docRef, {
        IsCompleted: true,
      });
    }
    else if (type.type === 'GroupOfProject') {
      const docRef = doc(db, 'GroupOfProject', type.id);

      const q = query(
        collection(db, 'TasksOfGroupProjects'),
        where('ProjectId', '==', type.id)
      );

      const querySnapshot = await getDocs(q);
      const docsData = querySnapshot.docs.map((doc) => doc.data());

      const allCompleted = docsData.every((doc) => doc.IsCompleted === true);

      if (allCompleted) {
        await updateDoc(docRef, {
          IsCompleted: true,
        });
      } else {
        alert('Please first complete all tasks of this group');
      }
    }
    else if (type.type === 'project') {
      const docRef = doc(db, 'projects', type.id);

      const q = query(
        collection(db, 'GroupOfProject'),
        where('ProjectId', '==', type.id)
      );

      const querySnapshot = await getDocs(q);
      const docsData = querySnapshot.docs.map((doc) => doc.data());

      const allCompleted = docsData.every((doc) => doc.IsCompleted === true);

      if (allCompleted) {
        await updateDoc(docRef, {
          IsCompleted: true,
        });
      } else {
        alert('Please first complete all tasks of this group');
      }
    }
  }


  async function DefaultTodoComplete(todo: { id: string }) {
    const docRef = doc(db, "DefaultTodos", myData.id);
  
    try {
      // Step 1: Get the document from Firestore
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
  
        // Step 2: Find the `todos` array and the target object
        if (Array.isArray(data.todos)) {
          const updatedTodos = data.todos.map((item: any) => {
            if (item.id === todo.id) {
              // Step 3: Update the `isComplete` property to true
              return { ...item, IsCompleted: true };
            }
            return item;
          });
  
          // Step 4: Save the updated array back to Firestore
          await updateDoc(docRef, { todos: updatedTodos });
          console.log("Todo updated successfully!");
        } else {
          console.error("`todos` is not an array or is missing in the document.");
        }
      } else {
        console.error("Document does not exist.");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  async function NotesTodoComplete(todo:any, id:string) {
    const docRef = doc(db, "Notes", id);

    try {
      // Step 1: Get the document from Firestore
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
  
        // Step 2: Find the `todos` array and the target object
        if (Array.isArray(data.todos)) {
          const updatedTodos = data.todos.map((item: any) => {
            if (item.id === todo.id) {
              // Step 3: Update the `isComplete` property to true
              return { ...item, IsCompleted: true };
            }
            return item;
          });
  
          // Step 4: Save the updated array back to Firestore
          await updateDoc(docRef, { todos: updatedTodos });
          console.log("Todo updated successfully!");
        } else {
          console.error("`todos` is not an array or is missing in the document.");
        }
      } else {
        console.error("Document does not exist.");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }

  }
  
  return (
    <MyContext.Provider value={{
      IsProjectOpen, setIsProjectOpen, IsGroupTaskOpen, setIsGroupTaskOpen, IsTaskOpen, setIsTaskOpen,
      IsProjectCreate, SetIsProjectCreate, IsManageProject, SetIsManageProject,
      IsGroupProjectCreate, SetIsGroupProjectCreate, IsTaskCreate, SetIsTaskCreate,
      deleteDocument, IsManageGroup, SetIsManageGroup, Complete, IsNoteOepn, setIsNoteOpen, IsTodoOpen, SetIsTodoOpen, DefaultTodoComplete,
      NotesTodoComplete, IsLogOutOpen, SetIsLogOutOpen
      
    }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
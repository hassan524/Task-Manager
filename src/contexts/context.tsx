import React, { createContext, useState } from "react";
import { db } from "@/main/firebase";
import {
  doc,
  deleteDoc,
  updateDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  // Button, 
} from "@/components/ui/alert-dialog"; // Adjust import paths as needed.
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store/Store";

const MyContext = createContext(undefined);

export const MyProvider = ({ children }: { children: React.ReactNode }) => {
  const myData = useSelector((state: RootState) => state.user);

  const [IsProjectOpen, setIsProjectOpen] = useState(false);
  const [IsGroupTaskOpen, setIsGroupTaskOpen] = useState(false);
  const [IsTaskOpen, setIsTaskOpen] = useState(false);
  const [IsNoteOpen, SetIsNoteOpen] = useState(false);

  const [IsProjectCreate, SetIsProjectCreate] = useState(false);
  const [IsGroupProjectCreate, SetIsGroupProjectCreate] = useState(false);
  const [IsTaskCreate, SetIsTaskCreate] = useState(false);

  const [IsManageProject, SetIsManageProject] = useState(false);
  const [IsManageGroup, SetIsManageGroup] = useState(false);

  const [IsTodoOpen, SetIsTodoOpen] = useState(false);
  const [IsLogOutOpen, SetIsLogOutOpen] = useState(false);

  const [IsCompleteDialogOpen, SetIsCompleteDialogOpen] = useState(false);
  const [currentCompleteTask, setCurrentCompleteTask] = useState<any>(null);

  // Delete function
  async function deleteDocument(type: any) {
    console.log(type)
    const docRef = doc(db, type.type, type.id);
    await deleteDoc(docRef);
  }



  async function Complete(type: any) {
    console.log("Completing:", type); // Debugging log
  
    // ✅ Directly mark TasksOfGroupProjects as completed (No checking, No alerts)
    if (type.type === "TasksOfGroupProjects") {
      const docRef = doc(db, "TasksOfGroupProjects", type.id);
      await updateDoc(docRef, { IsCompleted: true });
      return; // 🚀 Just complete and exit
    }
  
    // ✅ Directly mark individual Task as completed
    if (type.type === "Tasks") {
      const docRef = doc(db, "Tasks", type.id);
      await updateDoc(docRef, { IsCompleted: true });
      return;
    }
  
    // ✅ Complete GroupOfProject ONLY IF all its tasks are completed
    if (type.type === "GroupOfProject") {
      const docRef = doc(db, "GroupOfProject", type.id);
      const q = query(
        collection(db, "TasksOfGroupProjects"),
        where("ProjectId", "==", type.id)
      );
  
      await new Promise((resolve) => setTimeout(resolve, 500)); // Allow Firestore updates
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const allCompleted = querySnapshot.docs.every(
          (doc) => doc.data().IsCompleted === true
        );
  
        if (allCompleted) {
          await updateDoc(docRef, { IsCompleted: true });
        }
        
         else {
          alert("Please first complete all tasks in this group project");
        }
      } else {
        await updateDoc(docRef, { IsCompleted: true });
      }
      return;
    }
  
    // ✅ Complete Groups ONLY IF all GroupOfTask2 tasks are completed
    if (type.type === "Groups") {
      const docRef = doc(db, "Groups", type.id);
      const q = query(
        collection(db, "GroupOfTask2"),
        where("ProjectId", "==", type.id)
      );
  
      await new Promise((resolve) => setTimeout(resolve, 500)); // Allow Firestore updates
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const allCompleted = querySnapshot.docs.every(
          (doc) => doc.data().IsCompleted === true
        );
  
        if (allCompleted) {
          await updateDoc(docRef, { IsCompleted: true });
        } else {
          alert("Please first complete all tasks of this group");
        }
      }  else {
        await updateDoc(docRef, { IsCompleted: true });
      }
    
      return;
    } 
  
    // ✅ Complete Projects ONLY IF all GroupOfProject are completed
    if (type.type === "projects") {
      const docRef = doc(db, "projects", type.id);
      const q = query(
        collection(db, "GroupOfProject"),
        where("ProjectId", "==", type.id)
      );
  
      await new Promise((resolve) => setTimeout(resolve, 500)); // Allow Firestore updates
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const allCompleted = querySnapshot.docs.every(
          (doc) => doc.data().IsCompleted === true
        );
  
        if (allCompleted) {
          await updateDoc(docRef, { IsCompleted: true });
        } else {
          alert("Please first complete all groups in this project");
        }
      }  else {
        await updateDoc(docRef, { IsCompleted: true });
      }
    
    }
  }
  
  

  // Default Todo Complete
  async function DefaultTodoComplete(todo: { id: string }) {
    const docRef = doc(db, "DefaultTodos", myData.id);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();

        if (Array.isArray(data.todos)) {
          const updatedTodos = data.todos.map((item: any) => {
            if (item.id === todo.id) {
              return { ...item, IsCompleted: true };
            }
            return item;
          });

          await updateDoc(docRef, { todos: updatedTodos });
        }
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  // Notes Todo Complete
  async function NotesTodoComplete(todo: any, id: string) {
    const docRef = doc(db, "Notes", id);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();

        if (Array.isArray(data.todos)) {
          const updatedTodos = data.todos.map((item: any) => {
            if (item.id === todo.id) {
              return { ...item, IsCompleted: true };
            }
            return item;
          });

          await updateDoc(docRef, { todos: updatedTodos });
        }
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  // Handle Complete Confirmation
  const handleCompleteWithConfirmation = (type: any) => {
    console.log(type)
    if (type.IsCompleted
      !== true) {
      setCurrentCompleteTask(type);
      SetIsCompleteDialogOpen(true);
    } else {
      console.log("Task is not completed yet");
      // You can show an alert or message here if needed
    }
  };

  const confirmComplete = async () => {
    if (currentCompleteTask) {
      await Complete(currentCompleteTask);
      setCurrentCompleteTask(null);
      SetIsCompleteDialogOpen(false);
    }
  };

  const cancelComplete = () => {
    setCurrentCompleteTask(null);
    SetIsCompleteDialogOpen(false);
  };

  return (
    <MyContext.Provider
      value={{
        IsProjectOpen,
        setIsProjectOpen,
        IsGroupTaskOpen,
        setIsGroupTaskOpen,
        IsTaskOpen,
        setIsTaskOpen,
        IsProjectCreate,
        SetIsProjectCreate,
        IsManageProject,
        SetIsManageProject,
        IsGroupProjectCreate,
        SetIsGroupProjectCreate,
        IsTaskCreate,
        SetIsTaskCreate,
        deleteDocument,
        IsManageGroup,
        SetIsManageGroup,
        IsNoteOpen,
        SetIsNoteOpen,
        IsTodoOpen,
        SetIsTodoOpen,
        IsLogOutOpen,
        SetIsLogOutOpen,
        DefaultTodoComplete,
        NotesTodoComplete,
        handleCompleteWithConfirmation,
      }}
    >
      {children}
      <AlertDialog
        open={IsCompleteDialogOpen}
        onOpenChange={(open: boolean) => SetIsCompleteDialogOpen(open)}
      >
        <AlertDialogContent className="sm:max-w-[425px] w-[90vw] p-6 rounded-xl shadow-lg bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col-reverse gap-3">
            <Button className="text-white font-semibold" onClick={cancelComplete}>
              Cancel
            </Button>
            <Button className="text-white font-semibold" onClick={confirmComplete}>
              Yes, Complete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </MyContext.Provider>
  );
};

export default MyContext;

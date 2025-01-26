import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import MyContext from "@/contexts/context";
import { useSelector } from "react-redux";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/main/firebase";
import { RootState } from "@/redux/store/Store";


const CreateTodo = ({ DefaultTodo, NoteForTodo }) => {
  const myData = useSelector((state: RootState) => state.user);
  const { IsTodoOpen, SetIsTodoOpen } = useContext(MyContext);
  const [todoName, setTodoName] = useState("");

  const HandleCreateTodo = async () => {
    if (!todoName || !myData?.id) return;
  
    const collectionName = DefaultTodo ? "DefaultTodos" : "Notes";
    const documentId = DefaultTodo ? myData.id : NoteForTodo?.id; // Use NoteForTodo.id if not default
    const newTodo = { id: Date.now().toString(), IsCompleted: false, name: todoName, createdAt: new Date() };
  
    try {
      if (!documentId) {
        console.error("Document ID is missing for the note!");
        return;
      }
  
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const todos = docSnap.data().todos || [];
        await updateDoc(docRef, { todos: [...todos, newTodo]});
      } else {
        await setDoc(docRef, { todos: [newTodo] });
      }
  
      setTodoName("");
      SetIsTodoOpen(false);
    } catch (error) {
      console.error("Error creating/updating todo:", error);
    }
  };

  return (
    <Dialog open={IsTodoOpen} onOpenChange={SetIsTodoOpen}>
      <DialogContent className="sm:max-w-[425px] w-[90vw] p-6 rounded-xl shadow-lg bg-white">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-semibold text-gray-800">Create a New Todo</DialogTitle>
        </DialogHeader>
        <Input placeholder="Todo Name" value={todoName} onChange={(e) => setTodoName(e.target.value)} />
        <DialogFooter className="mt-3 flex flex-col-reverse gap-2">
          <Button variant="outline" onClick={() => SetIsTodoOpen(false)}>
            Cancel
          </Button>
          <Button onClick={HandleCreateTodo} className="text-white">
            Create Todo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTodo;

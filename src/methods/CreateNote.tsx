import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MyContext from "@/contexts/context";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/main/firebase";
import { useSelector } from "react-redux";

const CreateNote = () => {
  const { IsNoteOepn, setIsNoteOpen } = useContext(MyContext);
  const [noteType, setNoteType] = useState("");

  const myData = useSelector((state) => state.user);

  const handleNote = async () => {
    try {

      // Add note to Firestore
      await addDoc(collection(db, "Notes"), {
        type: noteType,
        title: null,
        text: null,
        createdAt: new Date(),
        Authorid: myData.id,
      });

      console.log("Note created with auto-generated ID!");
      setIsNoteOpen(false); // Close the dialog after saving
    } catch (error) {
      console.error("Error creating note: ", error);
    }
  };

  return (
    <Dialog open={IsNoteOepn} onOpenChange={setIsNoteOpen}>
      <DialogContent className="sm:max-w-[425px] w-[90vw] p-6 rounded-xl shadow-lg bg-white">
        {/* Header */}
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            Create Note
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Fill in the details to create your note.
          </DialogDescription>
        </DialogHeader>

        {/* Content */}
        <div className="mt-4 space-y-4">
          {/* Note Type Selector */}
          <div>
            <Select onValueChange={(value) => setNoteType(value)}>
              <SelectTrigger className="w-full border rounded-md px-3 py-2 text-gray-700">
                <SelectValue placeholder="Select Note Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Text">Text</SelectItem>
                  <SelectItem value="Todo">Todo</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

        </div>

        {/* Footer */}
        <DialogFooter className="mt-3 flex flex-col-reverse gap-2">
          <button
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            onClick={() => setIsNoteOpen(false)}
          >
            Cancel
          </button>
          <button
            onClick={handleNote}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save Note
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNote;

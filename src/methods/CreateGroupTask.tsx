import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import MyContext from "@/contexts/context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { getCurrentDate } from "@/utils/date";
import { db } from "@/main/firebase";
import { doc, setDoc } from "firebase/firestore";
import { RootState } from "@/redux/store/Store";

const CreateGroupTask = ({ GroupOfProject }) => {
  const { IsGroupTaskOpen, setIsGroupTaskOpen, SetIsGroupProjectCreate } = useContext(MyContext);
  const [GroupName, setGroupName] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);  // Define deadline type as Date or null

  const myData = useSelector((state: RootState) => state.user);

  const handleSubmit = async () => {
    try {
      const GroupId = Date.now().toString(); // Unique ID for new groups
      const currentDate = getCurrentDate(); // Utility function to get the current date

      const collectionName = GroupOfProject ? "GroupOfProject" : "Groups";
      const documentId = GroupId;
      const type = GroupOfProject ? 'GroupOfProject' : 'Groups';

      await setDoc(doc(db, collectionName, documentId), {
        IsCompleted: false,
        GroupName,
        deadline,
        Authorid: myData.id,
        createdAt: currentDate,
        id: documentId,
        ProjectId: GroupOfProject?.id || null, // Reference to the parent project
        type,
      });

      SetIsGroupProjectCreate(true);
      setIsGroupTaskOpen(false);
    } catch (error) {
      console.error("Error creating group task:", error);
    }
  };

  return (
    <Dialog open={IsGroupTaskOpen} onOpenChange={setIsGroupTaskOpen}>
      <DialogContent className="sm:max-w-[425px] w-[90vw] p-6 rounded-xl shadow-lg bg-white">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Create a New Group
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Fill in the details below to create a group task within the project.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Name
            </label>
            <Input
              type="text"
              placeholder="Enter group name"
              value={GroupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deadline
            </label>
            <DatePicker
              selected={deadline}
              onChange={(date: Date) => setDeadline(date)}  // Properly typed as Date
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="dd/MM/yyyy"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsGroupTaskOpen(false)}
            className="px-6 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Create Group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupTask;

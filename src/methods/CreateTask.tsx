import React, { useContext, useState } from "react";
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
import { doc, setDoc, Timestamp } from "firebase/firestore";

const CreateTask = ({ GroupOfTask, GroupOfTask2 }) => {
  const { IsTaskOpen, setIsTaskOpen, SetIsTaskCreate } = useContext(MyContext);
  const [TaskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);

  const myData = useSelector((state) => state.user);

  const handleSubmit = async () => {
    try {
      const taskId = Date.now().toString();
      const currentDate = getCurrentDate();
      const collectionName = GroupOfTask
        ? "TasksOfGroupProjects"
        : GroupOfTask2
          ? "GroupOfTask2"
          : "Tasks";

      const documentId = taskId;

      await setDoc(doc(db, collectionName, documentId), {
        IsCompleted: false,
        TaskName,
        deadline: deadline ? Timestamp.fromDate(deadline) : null,
        Authorid: myData.id,
        createdAt: currentDate,
        id: documentId,
        ProjectId: GroupOfTask?.id || GroupOfTask2?.id || null,
        type: GroupOfTask2
          ? 'GroupOfTask2'
          : (GroupOfTask ? 'TasksOfGroupProjects' : 'Task')
      });
      SetIsTaskCreate(true);
      setIsTaskOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Dialog open={IsTaskOpen} onOpenChange={setIsTaskOpen} className="mx-5">
      <DialogContent className="sm:max-w-[425px] w-[90vw] p-6 rounded-xl shadow-lg bg-white">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Create a Task
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Fill in the details below to get started.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Task Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Name
            </label>
            <Input
              type="text"
              placeholder="Enter task name"
              value={TaskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deadline
            </label>
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="dd/MM/yyyy"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="mt-6 flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsTaskOpen(false)}
            className="px-6 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;

import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import MyContext from "@/contexts/context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/main/firebase";
import { useSelector } from "react-redux";
import { getCurrentDate } from "@/utils/date";

const CreateProject = () => {
  const { IsProjectOpen, setIsProjectOpen, SetIsProjectCreate } = useContext(MyContext);
  const [projectName, setProjectName] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const myData = useSelector((state) => state.user);

  const handleSubmit = async () => {
    try {

      const projectId = Date.now().toString(); // date using as id
      const currentDate = getCurrentDate();    // actual date

      await setDoc(doc(db, "projects", projectId), {
        IsCompleted: false,
        projectName,
        deadline,
        Authorid: myData.id,
        createdAt: currentDate, 
        id: projectId,
        type: 'project'
      });
      
      SetIsProjectCreate(true)
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <Dialog open={IsProjectOpen} onOpenChange={setIsProjectOpen} className="mx-5">
      <DialogContent className="sm:max-w-[425px] w-[90vw] p-6 rounded-xl shadow-lg bg-white">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Create a New Project
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Fill in the details below to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <Input
              required
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
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
        <DialogFooter className="mt-6 flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsProjectOpen(false)}
            className="px-6 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProject;

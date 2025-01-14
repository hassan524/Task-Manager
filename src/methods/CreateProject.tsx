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

const CreateProject = () => {
  const { IsProjectOpen, setIsProjectOpen } = useContext(MyContext);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);

  const handleSubmit = () => {
    console.log({
      projectName,
      description,
      deadline,
    });
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
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <Input
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
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

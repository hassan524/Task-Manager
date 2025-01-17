import React, { useState, useEffect, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MyContext from "@/contexts/context";
import { Timestamp } from "firebase/firestore"; // Import Timestamp from Firebase

const ManageProject = ({ project }) => {
  const { IsManageProject, SetIsManageProject } = useContext(MyContext);

  const [projectName, setProjectName] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [daysLeft, setDaysLeft] = useState(null);

  // Update state when the project prop changes
  useEffect(() => {
    if (project) {
      setProjectName(project.projectName || "");
      setCreatedAt(project.createdAt || "");

      // Check if deadline exists and handle it
      if (project.deadline) {
        // If it's a Firebase Timestamp, convert it to Date
        const deadlineDate = project.deadline instanceof Timestamp 
          ? project.deadline.toDate() 
          : new Date(project.deadline);

        setDeadline(deadlineDate);

        // Calculate the days left
        const calculatedDaysLeft = Math.max(
          0,
          Math.ceil((deadlineDate - new Date()) / (1000 * 60 * 60 * 24))
        );
        setDaysLeft(calculatedDaysLeft);
      } else {
        setDeadline(null);
        setDaysLeft(null);
      }
    }
  }, [project]);

  const handleSaveChanges = () => {
    alert("Changes saved!");
  };

  return (
    <Dialog open={IsManageProject} onOpenChange={SetIsManageProject}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Project</DialogTitle>
          <DialogDescription>Update the details of your project and save the changes.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <Input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              className="mt-1"
            />
          </div>

          {/* Days Left */}
          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-700">Days Left</label>
            <div className="ml-2">
              <span className="text-lg font-semibold">
                {daysLeft !== null
                  ? daysLeft === 0
                    ? "Today is the deadline"
                    : `${daysLeft} day${daysLeft > 1 ? "s" : ""} left`
                  : "No deadline set"}
              </span>
            </div>
          </div>

          {/* Created At */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Created At</label>
            <Input type="text" value={createdAt} disabled className="mt-1" />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={() => SetIsManageProject(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageProject;

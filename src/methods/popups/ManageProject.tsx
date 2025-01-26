import { useState, useEffect, useContext } from "react";
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
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "@/main/firebase";

const ManageProject = ({ project }) => {
  const { IsManageProject, SetIsManageProject } = useContext(MyContext);

  const [projectName, setProjectName] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

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

        // Calculate the days left, only if deadline is valid
        if (deadlineDate instanceof Date && !isNaN(deadlineDate.getTime())) {
          const calculatedDaysLeft = Math.max(
            0,
            Math.ceil((deadlineDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
          );
          setDaysLeft(calculatedDaysLeft);
        } else {
          setDaysLeft(null);
        }
      } else {
        setDeadline(null);
        setDaysLeft(null);
      }
    }
  }, [project]);

  const handleSaveChanges = async () => {
    try {
      const docRef = doc(db, 'projects', project.id); // Ensure db and project are defined
      await updateDoc(docRef, {
        projectName
      });
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <Dialog open={IsManageProject} onOpenChange={SetIsManageProject}>
      <DialogContent className="flex flex-col gap-5 sm:max-w-[425px] w-[90vw] p-6 rounded-xl shadow-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">Manage Project</DialogTitle>
          <DialogDescription>Update the details of your project and save the changes.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          {/* Project Name */}
          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-[1rem] font-medium text-gray-500">Project Name</label>
              <Input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                className="mt-1 outline-none"
              />
            </div>

            {/* Created At */}
            <div>
              <label className="block text-[1rem] font-medium text-gray-500">Created At</label>
              <Input type="text" value={createdAt} disabled className="mt-1" />
            </div>
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
        </div>

        <DialogFooter className="mt-4 flex flex-col-reverse">
          <Button variant="outline" onClick={handleSaveChanges}>
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

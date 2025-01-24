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
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "@/main/firebase";

const ManageGroup = ({ group }) => {
  const { IsManageGroup, SetIsManageGroup } = useContext(MyContext);

  const [GroupName, setGroupName] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [daysLeft, setDaysLeft] = useState(null);

  // Update state when the group prop changes
  useEffect(() => {
    if (group) {
      setGroupName(group.GroupName || "");
      setCreatedAt(group.createdAt || "");

      // Check if deadline exists and handle it
      if (group.deadline) {
        const deadlineDate = group.deadline instanceof Timestamp
          ? group.deadline.toDate()
          : new Date(group.deadline);

        setDeadline(deadlineDate);

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
  }, [group]);

  const handleSaveChanges = async () => {
    try {
      const docRef = doc(db, 'Groups', group.id); // Ensure `db` and `group` are defined
      await updateDoc(docRef, {
        GroupName,
      });
      console.log("Group name successfully updated!");
    } catch (error) {
      console.error("Error updating group name: ", error);
    }
  };

  return (
    <Dialog open={IsManageGroup} onOpenChange={SetIsManageGroup}>
      <DialogContent className="flex flex-col gap-5 sm:max-w-[425px] w-[90vw] p-6 rounded-xl shadow-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">Manage Group</DialogTitle>
          <DialogDescription>Update the details of your group and save the changes.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          {/* Group Name */}
          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-[1rem] font-medium text-gray-500">Group Name</label>
              <Input
                type="text"
                value={GroupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
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
          <Button variant="secondary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
          <Button variant="primary" onClick={() => SetIsManageGroup(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageGroup;

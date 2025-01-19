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
import { Timestamp } from "firebase/firestore";

const ManageGroup = ({ group }) => {
    const { IsManageGroup, SetIsManageGroup } = useContext(MyContext);

    const [GroupName, setGroupName] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [deadline, setDeadline] = useState(null);
    const [daysLeft, setDaysLeft] = useState(null);

    useEffect(() => {
        if (group) {
            console.log(group)
            setGroupName(group.GroupName || "");
            setCreatedAt(
                group.createdAt
                    ? new Date(group.createdAt).toLocaleDateString()
                    : ""
            );

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

    const handleSaveChanges = () => {
        alert("Changes saved!");
    };

    return (
        <Dialog open={IsManageGroup} onOpenChange={SetIsManageGroup}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Manage Project</DialogTitle>
                    <DialogDescription>Update the details of your project and save the changes.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Project Name</label>
                        <Input
                            type="text"
                            value={GroupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder="Enter project name"
                            className="mt-1"
                        />
                    </div>
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Created At</label>
                        <Input type="text" value={createdAt} disabled className="mt-1" />
                    </div>
                </div>
                <DialogFooter className="mt-4">
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={() => SetIsManageGroup(false)}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ManageGroup;

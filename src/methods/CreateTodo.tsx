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


const CreateTodo = () => {
    const { IsTodoOpen, SetIsTodoOpen} = useContext(MyContext);

    return (
        <Dialog open={IsTodoOpen} onOpenChange={SetIsTodoOpen}>
            <DialogContent className="sm:max-w-[425px] w-[90vw] p-6 rounded-xl shadow-lg bg-white">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-xl font-semibold text-gray-800">
                        Create a New Todo
                    </DialogTitle>
                </DialogHeader>

                <div className="">
                    <Input placeholder="Todo Name"></Input>
                </div>

                <DialogFooter className="mt-6 flex justify-end space-x-2">
                    <Button
                        variant="outline"
                    >
                        Cancel
                    </Button>
                    <Button
                        className="text-white"
                    >
                        Create Group
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTodo;

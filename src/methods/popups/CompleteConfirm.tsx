import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { useContext } from 'react'
import MyContext from '@/contexts/context'

const CompleteConfirm = () => {
const { IsLogOutOpen, SetIsLogOutOpen } = useContext(MyContext)

    return (
        <AlertDialog open={IsLogOutOpen} onOpenChange={SetIsLogOutOpen}>
            <AlertDialogContent className='sm:max-w-[425px] w-[90vw] p-6 rounded-xl shadow-lg bg-white'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure ? Did you complete that ?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter className='flex flex-col-reverse gap-2'>
                    <Button>
                        Cancel
                    </Button>
                    <Button>
                        Log Out
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CompleteConfirm
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useContext } from 'react'
import MyContext from '@/contexts/context'
import { Button } from '@/components/ui/button'
import { auth } from '@/main/firebase'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'

const Logout = () => {
    const { IsLogOutOpen, SetIsLogOutOpen } = useContext(MyContext)
    const navigate = useNavigate()

    const signOutUser = async () => {
        try {
            signOut(auth)
                .then(() => {
                    navigate('/')
                    SetIsLogOutOpen(false)
                })
        } catch (error) {
            console.log('error while logging out the user', error)
        }
    }

    return (

        <AlertDialog open={IsLogOutOpen} onOpenChange={SetIsLogOutOpen}>
            <AlertDialogContent className='sm:max-w-[425px] w-[90vw] p-6 rounded-xl shadow-lg bg-white'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will log you out of your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='flex flex-col-reverse gap-2'>
                    <Button variant="outline" onClick={() => SetIsLogOutOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={signOutUser} className="text-white">
                        Log Out
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default Logout
import { useEffect, useState } from "react";
import { db } from "@/main/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/Store";


const fetchTodos = () => {
    const myData = useSelector((state: RootState) => state.user); // Redux state se user data le raha hai
    const [todos, setTodos] = useState([]); // Todos ka state

    useEffect(() => {
        // Pehle check karein ke user ID hai ya nahi
        if (!myData?.id) {
            console.warn("User ID available nahi hai");
            return;
        }

        const docRef = doc(db, "DefaultTodos", myData.id); // Document reference

        // Listener lagana
        const unsubscribe = onSnapshot(
            docRef,
            (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTodos(data.todos || []); // Agar document exist karta hai, to todos set karo
                } else {
                    console.info("DefaultTodos collection ya document exist nahi karta.");
                    setTodos([]); // Document nahi mila to empty list rakho
                }
            },
            (error) => {
                console.error("Error fetching todos:", error); // Agar listener error de to log karo
            }
        );

        return () => unsubscribe(); // Component unmount hone par listener clean up
    }, [myData?.id]);

    return todos;
};

export default fetchTodos;
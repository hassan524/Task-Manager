import { useEffect, useState } from "react";
import { db } from "@/main/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";

const fetchNotes = () => {
    const myData = useSelector((state) => state.user);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        if (!myData?.id) return;

        // Create a query to find documents where AuthorId matches myData.id
        const notesRef = collection(db, "Notes");
        const notesQuery = query(notesRef, where("Authorid", "==", myData.id));

        const unsubscribe = onSnapshot(notesQuery, (querySnapshot) => {
            const fetchedNotes = [];
            querySnapshot.forEach((doc) => {
                fetchedNotes.push({ id: doc.id, ...doc.data() });
            });
            setNotes(fetchedNotes); 
        });

        return () => unsubscribe(); // Cleanup the listener on unmount
    }, [myData?.id]);

    return notes; 
};

export default fetchNotes;

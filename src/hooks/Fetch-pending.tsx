import { useState, useEffect } from "react";
import { db } from "@/main/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";

const useFetchPending = () => {
  const myData = useSelector((state) => state.user); // Fetch user data from Redux state
  const [pendingProjects, setPendingProjects] = useState([]);
  const [pendingGroups, setPendingGroups] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!myData?.id) return; // Exit if user ID is not available

    try {
      // Real-time listener for pending projects
      const projectsQuery = query(
        collection(db, "projects"),
        where("IsCompleted", "==", false),
        where("Authorid", "==", myData.id)
      );
      const unsubscribeProjects = onSnapshot(projectsQuery, (snapshot) => {
        const projects = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPendingProjects(projects);
      });

      // Real-time listener for pending groups
      const groupsQuery = query(
        collection(db, "Groups"),
        where("IsCompleted", "==", false),
        where("Authorid", "==", myData.id)
      );
      const unsubscribeGroups = onSnapshot(groupsQuery, (snapshot) => {
        const groups = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPendingGroups(groups);
      });

      // Real-time listener for pending tasks
      const tasksQuery = query(
        collection(db, "Tasks"),
        where("IsCompleted", "==", false),
        where("Authorid", "==", myData.id)
      );
      const unsubscribeTasks = onSnapshot(tasksQuery, (snapshot) => {
        const tasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPendingTasks(tasks);
      });

      // Cleanup function to unsubscribe from listeners
      return () => {
        unsubscribeProjects();
        unsubscribeGroups();
        unsubscribeTasks();
      };
    } catch (err) {
      console.error("Error fetching pending data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [myData?.id]); // Re-run the effect when myData.id changes

  return { pendingProjects, pendingGroups, pendingTasks, loading, error };
};

export default useFetchPending;

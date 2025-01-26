import { useState, useEffect } from "react";
import { db } from "@/main/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/Store";

const useFetchComplete = () => {
  const myData = useSelector((state: RootState) => state.user); // Get user data from Redux state
  const [completedProjects, setCompletedProjects] = useState([]);
  const [completedGroups, setCompletedGroups] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [onGoingProjects, setOnGoingProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!myData?.id) return; // Exit if user ID is not available

    try {
      // Real-time listener for completed projects
      const projectsQuery = query(
        collection(db, "projects"),
        where("IsCompleted", "==", true),
        where("Authorid", "==", myData.id)
      );
      const unsubscribeProjects = onSnapshot(projectsQuery, (snapshot) => {
        const projects = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCompletedProjects(projects);
      });

      // Real-time listener for ongoing projects
      const onGoingProjectsQuery = query(
        collection(db, "projects"),
        where("IsCompleted", "==", false),
        where("Authorid", "==", myData.id)
      );
      const unsubscribeOnGoingProjects = onSnapshot(
        onGoingProjectsQuery,
        (snapshot) => {
          const projects = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOnGoingProjects(projects);
        }
      );

      // Real-time listener for completed groups
      const groupsQuery = query(
        collection(db, "Groups"),
        where("IsCompleted", "==", true),
        where("Authorid", "==", myData.id)
      );
      const unsubscribeGroups = onSnapshot(groupsQuery, (snapshot) => {
        const groups = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCompletedGroups(groups);
      });

      // Real-time listener for completed tasks
      const tasksQuery = query(
        collection(db, "Tasks"),
        where("IsCompleted", "==", true),
        where("Authorid", "==", myData.id)
      );
      const unsubscribeTasks = onSnapshot(tasksQuery, (snapshot) => {
        const tasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCompletedTasks(tasks);
      });

      // Cleanup function to unsubscribe from listeners
      return () => {
        unsubscribeProjects();
        unsubscribeOnGoingProjects();
        unsubscribeGroups();
        unsubscribeTasks();
      };
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [myData?.id]); // Re-run the effect when myData.id changes

  return {
    completedProjects,
    completedGroups,
    completedTasks,
    onGoingProjects,
    loading,
    error,
  };
};

export default useFetchComplete;

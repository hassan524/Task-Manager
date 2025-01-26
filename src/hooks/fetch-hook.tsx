import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/main/firebase";
import { RootState } from "@/redux/store/Store";


const useFetchData = () => {
  const myData = useSelector((state: RootState) => state.user); // Import user data from Redux state
  const [data, setData] = useState({
    projects: [],
    groupTasks: [],
    tasks: [],
    GroupsOfProjects: [],
    TasksOfGroupsProject: [],
    groupTasks2: [],
  });

  useEffect(() => {
    if (!myData?.id) return; // Exit if myData.id is not available

    const fetchData = () => {
      // Define collection queries with Authorid filter
      const projectsQuery = query(collection(db, "projects"), where("Authorid", "==", myData.id));
      const groupTasksQuery = query(collection(db, "Groups"), where("Authorid", "==", myData.id));
      const tasksQuery = query(collection(db, "Tasks"), where("Authorid", "==", myData.id));
      const groupsOfProjectsQuery = query(
        collection(db, "GroupOfProject"),
        where("Authorid", "==", myData.id)
      );
      const tasksOfGroupsProjectQuery = query(
        collection(db, "TasksOfGroupProjects"),
        where("Authorid", "==", myData.id)
      );
      const groupTasks2Query = query(
        collection(db, "GroupOfTask2"),
        where("Authorid", "==", myData.id)
      );

      // Set up listeners for each collection
      const unsubscribeProjects = onSnapshot(projectsQuery, (snapshot) => {
        setData((prev) => ({
          ...prev,
          projects: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        }));
      });

      const unsubscribeGroupTasks = onSnapshot(groupTasksQuery, (snapshot) => {
        setData((prev) => ({
          ...prev,
          groupTasks: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        }));
      });

      const unsubscribeTasks = onSnapshot(tasksQuery, (snapshot) => {
        setData((prev) => ({
          ...prev,
          tasks: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        }));
      });

      const unsubscribeGroupsOfProjects = onSnapshot(groupsOfProjectsQuery, (snapshot) => {
        setData((prev) => ({
          ...prev,
          GroupsOfProjects: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        }));
      });

      const unsubscribeTasksOfGroupsProject = onSnapshot(
        tasksOfGroupsProjectQuery,
        (snapshot) => {
          setData((prev) => ({
            ...prev,
            TasksOfGroupsProject: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
          }));
        }
      );

      const unsubscribeGroupTasks2 = onSnapshot(groupTasks2Query, (snapshot) => {
        setData((prev) => ({
          ...prev,
          groupTasks2: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        }));
      });

      // Cleanup subscriptions
      return () => {
        unsubscribeProjects();
        unsubscribeGroupTasks();
        unsubscribeTasks();
        unsubscribeGroupsOfProjects();
        unsubscribeTasksOfGroupsProject();
        unsubscribeGroupTasks2();
      };
    };

    return fetchData();
  }, [myData?.id]);

  return data;
};

export default useFetchData;

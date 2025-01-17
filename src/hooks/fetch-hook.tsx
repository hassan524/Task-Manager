// hooks/useFetchData.js
import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/main/firebase";

const useFetchData = () => {
  const [data, setData] = useState({
    projects: [],
    groupTasks: [],
    tasks: [],
    GroupsOfProjects: [],
    TasksOfGroupsProject: [],
  });

  useEffect(() => {
    const unsubscribeProjects = onSnapshot(collection(db, "projects"), (snapshot) => {
      setData((prev) => ({ ...prev, projects: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) }));
    });

    const unsubscribeGroupTasks = onSnapshot(collection(db, "Groups"), (snapshot) => {
      setData((prev) => ({ ...prev, groupTasks: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) }));
    });

    const unsubscribeTasks = onSnapshot(collection(db, "Tasks"), (snapshot) => {
      setData((prev) => ({ ...prev, tasks: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) }));
    });

    const unsubscribeGroupsOfProjects = onSnapshot(collection(db, "GroupOfProject"), (snapshot) => {
      setData((prev) => ({
        ...prev,
        GroupsOfProjects: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      }));
    });

    const unsubscribeTasksOfGroupsProject = onSnapshot(
      collection(db, "TasksOfGroupProjects"),
      (snapshot) => {
        setData((prev) => ({
          ...prev,
          TasksOfGroupsProject: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        }));
      }
    );

    return () => {
      unsubscribeProjects();
      unsubscribeGroupTasks();
      unsubscribeTasks();
      unsubscribeGroupsOfProjects();
      unsubscribeTasksOfGroupsProject();
    };
  }, []);

  return data;
};

export default useFetchData;

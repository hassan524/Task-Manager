import { useState, useEffect } from 'react';
import { db } from '@/main/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const useFetchComplete = () => {
  const [completedProjects, setCompletedProjects] = useState([]);
  const [completedGroups, setCompletedGroups] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [OnGoingProjects, setOnGoingProjects] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Real-time listener for completed projects
      const projectsQuery = query(
        collection(db, 'projects'),
        where('IsCompleted', '==', true)
      );
      const unsubscribeProjects = onSnapshot(projectsQuery, (snapshot) => {
        const projects = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCompletedProjects(projects);
      });

      const OnGoingprojectsQuery = query(
        collection(db, 'projects'),
        where('IsCompleted', '==', false)
      );
      const unsubscribeOnGoingProjects = onSnapshot(OnGoingprojectsQuery, (snapshot) => {
        const projects = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOnGoingProjects(projects);
      });

      // Real-time listener for completed groups
      const groupsQuery = query(
        collection(db, 'Groups'),
        where('IsCompleted', '==', true)
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
        collection(db, 'Tasks'),
        where('IsCompleted', '==', true)
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
        unsubscribeGroups();
        unsubscribeTasks();
        unsubscribeOnGoingProjects();
      };
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { completedProjects, completedGroups, completedTasks, OnGoingProjects, loading, error };
};

export default useFetchComplete;

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useFetchComplete from '@/hooks/fetch-complete-hook';

const CompletedTask = () => {
  const { completedTasks, loading, error } = useFetchComplete();

  // Initialize AOS with custom settings
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration for the animation
      easing: 'ease-in-out', // Easing effect for the animation
      once: false, // Make sure the animation triggers again when re-entering the viewport
    });
  }, []);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  if (!completedTasks || completedTasks.length === 0) return <div className="text-center text-gray-500">No tasks completed</div>;

  return (
    <div className="relative w-full min-h-[85vh] border border-slate-200 rounded-lg bg-white shadow-sm p-4">
      <h2 className="text-2xl font-semibold text-primary mb-6">Completed Tasks</h2>
      {completedTasks.map((task, index) => (
        <div
          key={index}
          className="flex items-center justify-between hover:scale-[1.01] cursor-pointer transition-all ease-in p-4 border border-slate-200 rounded-md"
          data-aos="fade-down" // Animation type
          data-aos-duration="1000" // Set animation duration
          data-aos-delay={index * 200} // Stagger animation delay
        >
          <div className="flex items-center gap-3">
            <i className="bi bi-check2-square text-[#CCEEBC] text-xl"></i>
            <span className="font-medium text-gray-700">{task.TaskName}</span>
          </div>
          <span className="text-gray-500">✨</span>
        </div>
      ))}
    </div>
  );
};

export default CompletedTask;

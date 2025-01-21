import React from 'react'
import useFetchComplete from '@/hooks/fetch-complete-hook';

const CompletedProject = () => {
  const { completedProjects, completedGroups, completedTasks, loading, error } = useFetchComplete();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!completedTasks || completedTasks.length === 0) return <div>No tasks completed</div>;

  return (
    <div className="relative w-full min-h-[85vh] border border-slate-100 rounded-lg bg-white shadow-md">
      {completedProjects.map((project, index) => (
        <div key={index} className="flex items-center justify-between w-full p-4 border border-slate-100 rounded-md hover:shadow-sm">
          <span className=''>{project.projectName}</span>
          <span className=''>✨</span>
        </div>
      ))}
    </div>
  )
}

export default CompletedProject
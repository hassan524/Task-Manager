import React, { useEffect, useState, useContext } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import MyContext from "@/contexts/context";
import CreateProject from "@/methods/CreateProject";
import CreateGroupTask from "@/methods/CreateGroupTask";
import CreateTask from "@/methods/CreateTask";
import { useSelector } from "react-redux";
import ManageProject from "@/methods/popups/ManageProject";
import useFetchData from "@/hooks/fetch-hook";

const DashBoard = () => {
  const {
    setIsProjectOpen,
    setIsGroupTaskOpen,
    IsGroupTaskOpen,
    setIsTaskOpen,
    IsTaskOpen,
    SetIsManageProject,
  } = useContext(MyContext);

  const [projects, setProjects] = useState([]);
  const [groupTasks, setGroupTasks] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [GroupsOfProjects, SetGroupsOfProjects] = useState([]);
  const [TasksOfGroupsProject, SetTasksOfGroupsProject] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [SelectProjectForChildGroup, setSelectProjectForChildGroup] = useState(null);
  const [SelectTaskForChildGroupProject, setSelectTaskForChildGroupProject] = useState(null);

  const myData = useSelector((state) => state.user);

  const { projects: fetchedProjects, groupTasks: fetchedGroupTasks, tasks: fetchedTasks, GroupsOfProjects: fetchedGroups, TasksOfGroupsProject: fetchedTasksGroups } = useFetchData();

  useEffect(() => {
    setProjects(fetchedProjects);
    setGroupTasks(fetchedGroupTasks);
    setTasks(fetchedTasks);
    SetGroupsOfProjects(fetchedGroups);
    SetTasksOfGroupsProject(fetchedTasksGroups);
  }, [fetchedProjects, fetchedGroupTasks, fetchedTasks, fetchedGroups, fetchedTasksGroups]);

  useEffect(() => {
    if (!IsGroupTaskOpen) {
      setSelectProjectForChildGroup(null);
    }
  }, [IsGroupTaskOpen]);

  useEffect(() => {
    if (!IsTaskOpen) {
      setSelectTaskForChildGroupProject(null);
    }
  }, [IsTaskOpen]);

  const handleChildGroupTask = (project) => {
    setSelectProjectForChildGroup(project);
    setIsGroupTaskOpen(true);
  };

  const HandleChildTaskOfGroupProject = (group) => {
    setSelectTaskForChildGroupProject(group);
    setIsTaskOpen(true);
  };

  return (
    <div className="wrapper flex flex-col gap-10">
      <div className="w-full h-6 flex items-center justify-start">
        <div className="flex items-center gap-2">
          <i className="bi bi-speedometer text-primary"></i>
          <span className="font-semibold text-primary">Dashboard</span>
        </div>
      </div>

      <Separator className="bg-slate-100" />

      <div className="wrapper flex flex-col gap-[3rem]">
        <div className="relative w-full min-h-96 border border-slate-100 rounded-lg bg-white shadow-md">
          <div className="flex items-center justify-between border-b p-2 border-slate-200">
            <h3 className="font-semibold text-lg text-slate-600">Your Projects</h3>
            <button
              className="px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary/90"
              onClick={() => setIsProjectOpen(true)}
            >
              + Add New
            </button>
          </div>
          <Accordion type="single" collapsible className="flex flex-col">
            {projects.map((project, index) => (
              <AccordionItem key={index} value={`project-${index}`}>
                <AccordionTrigger className="flex items-center justify-between w-full p-3 border border-slate-100 rounded-md hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <i className="bi bi-folder text-[#CEE0FF] text-xl"></i>
                    <span className="font-medium text-slate-600 text-sm">
                      {project.projectName}
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="bi bi-three-dots-vertical text-slate-400 focus:outline-none" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideOffset={5} className="w-48">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedProject(project);
                          SetIsManageProject(true);
                        }}
                      >
                        Manage Project
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleChildGroupTask(project)}
                      >
                        Create Group
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setIsTaskOpen(true)}>
                        Create Task
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </AccordionTrigger>
                <AccordionContent>
                  {GroupsOfProjects.filter((group) => group.ProjectId === project.id).length > 0 ? (
                    GroupsOfProjects.filter((group) => group.ProjectId === project.id).map(
                      (group, groupIndex) => (
                        <Accordion type="single" collapsible className="flex flex-col" key={groupIndex}>
                          <AccordionItem value={`group-${groupIndex}`}>
                            <AccordionTrigger className="flex items-center justify-between w-full p-2 border border-slate-200 rounded-md hover:shadow-sm">
                              <div className="flex items-center gap-2">
                                <i className="bi bi-folder2-open text-[#E0FFCE] text-lg"></i>
                                <span className="text-sm font-medium text-slate-600">
                                  {group.GroupName}
                                </span>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="bi bi-three-dots-vertical text-slate-400 focus:outline-none" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" sideOffset={5} className="w-48">
                                  <DropdownMenuItem onClick={() => HandleChildTaskOfGroupProject(group)}>
                                    Create Task
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </AccordionTrigger>
                            <AccordionContent>
                              {TasksOfGroupsProject.filter((task) => task.ProjectId === group.id).length > 0 ? (
                                TasksOfGroupsProject.filter((task) => task.ProjectId === group.id).map(
                                  (task, taskIndex) => (
                                    <div
                                      key={taskIndex}
                                      className="flex items-center bg-slate-100 justify-between w-full p-2 border border-slate-200 rounded-md hover:shadow-sm"
                                    >
                                      <div className="flex items-center gap-2">
                                        <i className="bi bi-folder2-open text-[#E0FFCE] text-lg"></i>
                                        <span className="text-sm font-medium text-slate-600">
                                          {task.TaskName}
                                        </span>
                                      </div>
                                    </div>
                                  )
                                )
                              ) : (
                                <div className="text-center text-sm text-slate-500 py-2">
                                  No Tasks Found
                                </div>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )
                    )
                  ) : (
                    <div className="text-center text-sm text-slate-500 py-2">
                      No Groups Found
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <div className="wrapper flex flex-col gap-[3rem]">
        <div className="relative w-full min-h-96 border border-slate-100 rounded-lg bg-white shadow-md">
          <div className="flex items-center justify-between border-b p-2 border-slate-200">
            <h3 className="font-semibold text-lg text-slate-600">Your Group Tasks</h3>
            <button
              className="px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary/90"
              onClick={() => setIsGroupTaskOpen(true)}
            >
              + Add Group Task
            </button>
          </div>
          <Accordion type="single" collapsible className="flex flex-col">
            {groupTasks.map((groupTask, index) => (
              <AccordionItem key={index} value={`groupTask-${index}`}>
                <AccordionTrigger className="flex items-center justify-between w-full p-3 border border-slate-100 rounded-md hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <i className="bi bi-folder2-open text-[#E0FFCE] text-xl"></i>
                    <span className="font-medium text-slate-600 text-sm">
                      {groupTask.GroupName}
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="bi bi-three-dots-vertical text-slate-400 focus:outline-none" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideOffset={5} className="w-48">
                      <DropdownMenuItem>Create Task</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="">No additional content available</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <div className="wrapper flex flex-col gap-[3rem]">
        <div className="relative w-full min-h-96 border border-slate-100 rounded-lg bg-white shadow-md">
          <div className="flex items-center justify-between border-b p-2 border-slate-200">
            <h3 className="font-semibold text-lg text-slate-600">Your Tasks</h3>
            <button
              className="px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary/90"
              onClick={() => setIsTaskOpen(true)}
            >
              + Add Task
            </button>
          </div>
          <Accordion type="single" collapsible className="flex flex-col">
            {tasks.map((task, index) => (
              <AccordionItem key={index} value={`task-${index}`}>
                <AccordionTrigger className="flex items-center justify-between w-full p-3 border border-slate-100 rounded-md hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <i className="bi bi-file-earmark-text text-[#FFD700] text-xl"></i>
                    <span className="font-medium text-slate-600 text-sm">
                      {task.taskName}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-slate-400">{task.description}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <CreateProject />
      <CreateGroupTask GroupOfProject={SelectProjectForChildGroup} />
      <CreateTask GroupOfTask={SelectTaskForChildGroupProject} />
      {selectedProject && <ManageProject project={selectedProject} />}
    </div>
  );
};

export default DashBoard;

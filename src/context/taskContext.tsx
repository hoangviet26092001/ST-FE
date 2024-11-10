// TaskContext.tsx
import React, { createContext, useState, ReactNode } from "react";

interface TaskContextType {
  task: string;
  updateTask: (newTask: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [task, setTask] = useState<string>("Task 1");

  const updateTask = (newTask: string) => {
    setTask(newTask);
  };

  return (
    <TaskContext.Provider value={{ task, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;

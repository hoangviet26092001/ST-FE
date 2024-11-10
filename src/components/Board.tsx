import React, { useState, useEffect, useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import AddTaskModal from "./AddTaskModal";

import * as TaskAPI from "../api/task";
import TaskContext from "../context/taskContext";

export default function Board(): React.ReactNode {
  const [completed, setCompleted] = useState<any>([]);
  const [incomplete, setIncomplete] = useState<any>([]);
  const [backlog, setBacklog] = useState<any>([]);
  const [inReview, setInReview] = useState<any>([]);

  useEffect(() => {
    handleGetData({});
  }, []);

  const context = useContext(TaskContext);

  // Kiểm tra context nếu chưa được cung cấp
  if (!context) {
    throw new Error("ParentComponent must be used within a TaskProvider");
  }

  const { task, updateTask } = context;

  useEffect(() => {
    if (task === "DEL" || task === "EDIT") {
      console.log("🌻🌻🌻 ~ useEffect ~ task:", task);
      handleGetData({});
      updateTask("");
    }
  }, [task]);
  const handleGetData = async (params: { page?: number; take?: number }) => {
    try {
      const res = await TaskAPI.getTaskList(params);

      setIncomplete(
        res.results.objects.filter((task: any) => task.status === "TODO")
      );
      setCompleted(
        res.results.objects.filter((task: any) => task.status === "DONE")
      );
    } catch (error: any) {
      throw error;
    }
  };

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    deletePreviousState(source.droppableId, draggableId);

    const task = findItemById(draggableId, [
      ...incomplete,
      ...completed,
      ...inReview,
      ...backlog,
    ]);

    setNewState(destination.droppableId, task);
  };

  function deletePreviousState(sourceDroppableId: string, taskId: string) {
    switch (sourceDroppableId) {
      case "1":
        setIncomplete(removeItemById(taskId, incomplete));
        break;
      case "2":
        setCompleted(removeItemById(taskId, completed));
        break;
      case "3":
        setInReview(removeItemById(taskId, inReview));
        break;
      case "4":
        setBacklog(removeItemById(taskId, backlog));
        break;
    }
  }
  function setNewState(destinationDroppableId: string, task: any) {
    let updatedTask;
    switch (destinationDroppableId) {
      case "1": // TO DO
        updatedTask = { ...task, completed: false };
        setIncomplete([updatedTask, ...incomplete]);
        break;
      case "2": // DONE
        updatedTask = { ...task, completed: true };
        setCompleted([updatedTask, ...completed]);
        break;
      case "3": // IN REVIEW
        updatedTask = { ...task, completed: false };
        setInReview([updatedTask, ...inReview]);
        break;
      case "4": // BACKLOG
        updatedTask = { ...task, completed: false };
        setBacklog([updatedTask, ...backlog]);
        break;
    }
  }
  function findItemById(id: any, array: Array<any>) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id: any, array: Array<any>) {
    return array.filter((item) => item.id != id);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <AddTaskModal
        onAddSuccess={(data: any) => {
          console.log("🌻🌻🌻 ~ Board ~ data:", data);
          handleGetData({});
        }}
      />

      <h2 style={{ textAlign: "center" }}>PROGRESS BOARD</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          width: "1300px",
          margin: "0 auto",
        }}
      >
        <Column title={"TO DO"} tasks={incomplete} id={"1"} />
        <Column title={"DONE"} tasks={completed} id={"2"} />
        <Column title={"IN REVIEW"} tasks={inReview} id={"3"} />
        <Column title={"BACKLOG"} tasks={backlog} id={"4"} />
      </div>
    </DragDropContext>
  );
}

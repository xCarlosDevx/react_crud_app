import { useContext, useState } from "react";
import { CrudContext } from "../contexts/CrudContext";

export const useCrud = () => {
  const context = useContext(CrudContext);
  return {
    nameState: context.nameState,
    descriptionState: context.descriptionState,
    nameStateEdit: context.nameStateEdit,
    descriptionStateEdit: context.descriptionStateEdit,
    taskState: context.taskState,
    addTask: context.addTask,
    removeTask: context.removeTask,
    editTask: context.editTask,
    completeTask: context.completeTask,
    sendLS: context.sendLS,
  };
};

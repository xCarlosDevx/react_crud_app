import { createContext, useReducer, useState, useEffect } from "react";
import { props, ITask, ITaskList } from "../interfaces/interfaces";
// import Axios from 'axios';

export type crudContextProps = {
  nameState: {
    taskName: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
  };
  descriptionState: {
    taskDescription: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
  };
  nameStateEdit: {
    taskName: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
  };
  descriptionStateEdit: {
    taskDescription: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
  };
  taskState: ITaskList;
  removeTask: (id: number) => void;
  addTask: (props: ITask) => void;
  editTask: (props: ITask) => void;
  completeTask: (id: number) => void;
  sendLS: () => void;
};

export const CrudContext = createContext<crudContextProps>(
  {} as crudContextProps
);

type crudAction =
  | { type: "addTask"; data: ITask }
  | { type: "removeTask"; data: { id: number } }
  | { type: "editTask"; data: ITask }
  | { type: "completeTask"; data: { id: number } }
  | { type: "getTask" }
  | { type: "sendLS" };

export const crudReducer = (
  state: ITaskList,
  action: crudAction
): ITaskList => {
  switch (action.type) {
    case "getTask":
      fetch("http://localhost:3000/task", {
        mode: "no-cors",
      })
        .then((response) => response.json())
        .then((data) => console.log(data));

      fetch("https://jsonplaceholder.typicode.com/posts/1", {})
        .then((response) => {
          return response.json();
        })
        .then((data) => console.log(data));
      let dataBd: any;
      dataBd = localStorage.getItem("task_bd");
      state = JSON.parse(dataBd);
      return {
        ...state,
      };
    case "sendLS":
      localStorage.setItem("task_bd", JSON.stringify({ ...state }));
      return {
        ...state,
      };
    case "addTask":
      fetch("https://jsonplaceholder.typicode.com/posts", {
        mode: "no-cors",
        method: "POST",
        body: JSON.stringify({
          title: action.data.nameTask,
          body: action.data.descriptionTask,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());
      return {
        ...state,
        tasks: [...state.tasks, action.data],
      };

    case "removeTask":
      fetch("https://jsonplaceholder.typicode.com/posts/" + action.data.id, {
        method: "Delete",
      });
      state.tasks.forEach((item, index) => {
        if (item.id == action.data.id) {
          state.tasks.splice(index, 1);
        }
      });

      return {
        ...state,
        tasks: [...state.tasks],
      };
    case "editTask":
      fetch("https://jsonplaceholder.typicode.com/posts/" + action.data.id, {
        method: "PUT",
        body: JSON.stringify({
          title: action.data.nameTask,
          body: action.data.descriptionTask,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      state.tasks.forEach((item) => {
        if (item.id == action.data.id) {
          item.descriptionTask = action.data.descriptionTask;
          item.nameTask = action.data.nameTask;
        }
      });

      return {
        ...state,
        tasks: [...state.tasks],
      };
    case "completeTask":
      state.tasks.forEach((item, index) => {
        if (item.id === action.data.id) {
          item.state = true;
        }
      });
      return {
        ...state,
      };

    default:
      return state;
  }
};

const crudInitialState: ITaskList = {
  taskCount: 0,
  tasks: [],
  complete: 0,
  pending: 0,
};

export const CrudContextProv = ({ children }: props) => {
  const [getData, setData] = useState({});
  const [taskState, dispatch] = useReducer(crudReducer, crudInitialState);
  const [taskName, setName] = useState("");
  const [taskDescription, setDescription] = useState("");
  const [taskNameEdit, setNameEdit] = useState("");
  const [taskDescriptionEdit, setDescriptionEdit] = useState("");

  const getTask = () => {
    dispatch({ type: "getTask" });
  };
  const sendLS = () => {
    dispatch({ type: "sendLS" });
  };
  const removeTask = (id: number) => {
    dispatch({ type: "removeTask", data: { id } });
  };
  const addTask = (props: ITask) => {
    dispatch({
      type: "addTask",
      data: {
        id: props.id,
        descriptionTask: props.descriptionTask,
        nameTask: props.nameTask,
        state: false,
      },
    });
    setName("");
    setDescription("");
  };
  const editTask = (props: ITask) => {
    dispatch({
      type: "editTask",
      data: {
        id: props.id,
        descriptionTask: props.descriptionTask,
        nameTask: props.nameTask,
        state: props.state,
      },
    });
    setNameEdit("");
    setDescriptionEdit("");
  };
  const completeTask = (id: number) => {
    dispatch({
      type: "completeTask",
      data: { id },
    });
  };
  useEffect(() => {
    getTask();
  }, []);
  useEffect(() => {
    taskState.taskCount = taskState.tasks.length;
    let complete = taskState.tasks.filter((item) => item.state == true);
    taskState.complete = complete.length;
    let pending = taskState.tasks.filter((item) => item.state == false);
    taskState.pending = pending.length;
  }, [taskState]);
  return (
    <CrudContext.Provider
      value={{
        taskState,
        removeTask,
        addTask,
        sendLS,
        editTask,
        completeTask,
        nameState: { taskName, setName },
        descriptionState: { taskDescription, setDescription },
        nameStateEdit: { taskName: taskNameEdit, setName: setNameEdit },
        descriptionStateEdit: {
          taskDescription: taskDescriptionEdit,
          setDescription: setDescriptionEdit,
        },
      }}
    >
      {children}
    </CrudContext.Provider>
  );
};

import { useReducer } from "react";
import axios from "axios";

import TaskContext from "./taskContext";
import taskReducer from "./taskReducer";

import {
  GET_TASK,
  ADD_TASK,
  EDIT_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from "./types";

const TaskState = (props) => {
  const initialState = {
    tasks: [],
    edit: false,
    loading: false,
  };
  const url = `http://localhost:5000/api/task/`;
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const getTasks = async () => {
    try {
      const response = await axios.get(url);

      const allTasks = response.data;
      console.log(allTasks);

      dispatch({
        type: GET_TASK,
        payload: allTasks,
      });
    } catch (error) {
        console.log(error.message);
    }
  };

  const addTask = async (task) => {
    console.log(task);
    const response = await axios.post(url, task);
    const addedTask = response.data;
    console.log(addedTask);

    dispatch({
      type: ADD_TASK,
      payload: addedTask,
    });
  };

  const editTask = async (_id) => {
    //Set edit to current task
    dispatch({
      type: EDIT_TASK,
      payload: _id,
    });
  };

  const updateTask = async (data) => {
    const _id = state.edit._id;
    const response = await axios.put(`${url}/${_id}`, data);
    dispatch({
      type: UPDATE_TASK,
      payload: response.data,
    });
  };

  const deleteTask = async (id) => {
    const response = await axios.delete(`${url}/${id}`);
    console.log(response);

    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        edit: state.edit,
        getTasks,
        addTask,
        editTask,
        updateTask,
        deleteTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;

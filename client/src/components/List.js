import React  from 'react';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux'
import {editTask, deleteTaskAsync} from '../features/taskSlice';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReactTooltip from "react-tooltip";


import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";


// import taskContext from "../context/taskContext";

const List = ({ task, setData }) => {

  // React - Redux
  const {edit} = useSelector(state => state);
  const dispatch = useDispatch();
  
  const taskDeletedNotify = () => {
    toast.error("Task Deleted", {
      autoClose: 1000,
    });
  };

  // const TaskContext = useContext(taskContext);
  // const { editTask, deleteTask, edit } = TaskContext;

  return (
    <div className="list">
      {task.fileName && (
        <div className="image">
          <img src={task.fileName} alt="images" />
        </div>
      )}
      <div className="text">
        <div className="task-text">
          {task.dataName}
          <div className='time'>({moment(task.createdAt).fromNow()})</div>
        </div>
        <Popup
          trigger={
            <span
              className="trash-icon"
              onClick={() => {
                if (edit) {
                  setData("");
                }
                // deleteTask(task._id);
                taskDeletedNotify();
              }}
            >
              <i data-tip="DELETE" className="fa-solid fa-trash"></i>
              <ReactTooltip place="top" type="dark" effect="float" />
              <ToastContainer />
            </span>
          }
          modal
          nested
        >
          {(close) => (
            <div className="modal">
              <div className="header"> DELETE TASK ! </div>
              <div className="actions">
                <button
                  className="button"
                  onClick={() => {
                    console.log("modal closed ");
                    if (edit) {
                      setData("");
                    }
                    // deleteTask(task._id);
                    dispatch(deleteTaskAsync(task._id))
                    taskDeletedNotify();
                    close();
                  }}
                >
                  Yes Delete
                </button>
                <button
                  className="button"
                  onClick={() => {
                    console.log("modal closed ");
                    close();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Popup>
        {/* onClick={() => editTask(task._id)} */}
        <span className="edit-icon" onClick={() => dispatch(editTask(task._id))} >
          <i data-tip="EDIT" className="fa-solid fa-pen"></i>
          <ReactTooltip place="top" type="dark" effect="float" />
        </span>
      </div>
    </div>
  );
};

export default List;

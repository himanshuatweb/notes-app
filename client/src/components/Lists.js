import React from "react";
import List from "./List";
const Lists = ({ tasks, setData }) => {
  return (
    <div>
      {/*
          {tasks.length > 0 &&
        tasks.map((task) => (
          <List key={task._id} task={task} setData={setData} />
        ))}
       */
      }
       { tasks?.length > 0 && tasks.map( function(task){
          if(task.isDeleted === false){
            return <List key={task._id} task={task} setData={setData} />
          }
       })}
    </div>
  );
};


export default Lists;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {useSelector, useDispatch} from 'react-redux'
import { getTasksAsync, postTaskAsync, updateTaskAsync , resetTask} from '../features/taskSlice';
import { setAuth, removeAuth } from '../features/auth/authSlice'

import FileBase from "react-file-base64";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactTooltip from "react-tooltip";
import ReactPaginate from 'react-paginate';



import Lists from "../components/Lists";

const Home = () => {

  const navigate = useNavigate();

  const fromLocalStorage = JSON.parse(localStorage.getItem("profile"));
  const profile = fromLocalStorage?.profile;
  useEffect(()=>{
      if(!profile){
        console.log( "Line 27 from home js", profile)
        dispatch(removeAuth())
        navigate('/')
      }else{
        console.log( "Line 30 from home js", profile)
        dispatch(setAuth())
      }
  },[])

  /* React - Redux */
  const dispatch = useDispatch();
  const {tasks,edit} = useSelector(state => state.task);

  //React - Toastify
  const taskAddedNotify = () => {
    toast.success("Task Added", {
      autoClose: 1000,
    });
  };
  const taskUpdatedNotify = () => {
    toast("Task Updated", {
      autoClose: 1000,
    });
  };

  //React - Toastify End

  //Central Task Context - Using Context API
  // const taskContext = useContext(TaskContext);
  // const { tasks, getTasks, addTask, edit, updateTask } = taskContext;


   //React - Pagination
   const itemsPerPage =2;
   const [itemOffset, setItemOffset] = useState(0);
  //  console.log("itemsPerPage ", itemsPerPage, " itemOffset ", itemOffset, " task ",tasks.length)
   const endOffset = itemOffset + itemsPerPage;
   const currentItems = tasks?.slice(itemOffset, endOffset);
  //  console.log(currentItems);
   const pageCount = Math.ceil( Number(tasks?.length)  / itemsPerPage);
  //  console.log(pageCount);
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
     const newOffset = (event.selected * itemsPerPage) % tasks?.length;
     console.log(
       `User requested page number ${event.selected}, which is offset ${newOffset}`
     );
     setItemOffset(newOffset);
   };
 
   //React Pagination END

  // const [data, setData] = useState("");
  const [data, setData] = useState({
    dataName: "",
    fileName: "",
  });

  const {authData} = useSelector(state => state.auth);

  useEffect(() => {
    if(authData){
      console.log("in line 88 from Home.js ");
      dispatch(getTasksAsync())
    }
    if(authData === null){
      navigate('/signin')
    }
  },[authData]);


  useEffect(() => {
    // setData(edit.dataName)

    setData((prevState) => ({
      ...prevState,
      dataName: edit?.dataName ?? "",
      fileName: edit?.fileName ?? "",
    }));

  }, [edit?.dataName]);

  const handleAdd = () => {
    //Check If user have entered empty value
    if (data.dataName === "") {
      window.alert("Please Enter Something");
      return;
    }
    // Corner Case
    if (tasks === null || tasks?.length === 0) {
       dispatch(postTaskAsync(data));
    } else {
      dispatch(postTaskAsync(data))
    }
    taskAddedNotify();
    //Clear data state.
    setData({
      dataName: "",
      fileName: "",
    });

  };

  const handleUpdate = () => {
    console.log(data);
    // updateTask(data);
    dispatch(updateTaskAsync(data))
    setData({
      dataName:"",
      fileName:"",
    });
    taskUpdatedNotify();
  };

  const handleButtonClick =()=>{
    console.log("Hanlde Button Click");
    dispatch(resetTask());
    dispatch(removeAuth())
    navigate('/signin')

  }

  return (
    <div className="main">
    { authData && <div className="logout-button" onClick={handleButtonClick} > {authData.name} Logout</div> }
      <div className="crud-main">
        <div className="crud-heading">
          <h1>Notes App</h1>
        </div>

        <div className="crud-create">
          <input
            type="text"
            name="task"
            value={data.dataName ?? "" }
            placeholder="Enter Data"
            autoComplete="off"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                dataName: e.target.value,
              }))
            }
          />

          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setData((prevState) => ({
                ...prevState,
                fileName: base64,
              }));
            }}
          />
          {edit ? (
            <div className="btn" onClick={handleUpdate} >
              <i className="fa-solid fa-check-double"></i>
              <ToastContainer />
            </div>
          ) : (
            <div className="btn" onClick={handleAdd} >
              <i data-tip="Add Task" className="fa-solid fa-plus"></i>
              <ReactTooltip place="top" type="dark" effect="float" />
              <ToastContainer />
            </div>
          )}
        </div>
        <Lists tasks={currentItems} setData={setData} />
        <div className="pagination">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
      </div>
      </div>

      <div className="about">
        <Link to="/about">
          <h2>About</h2>
        </Link>
      </div>

      </div>
  );
};

export default Home;

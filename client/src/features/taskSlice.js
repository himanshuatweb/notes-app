import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import taskAPI from "../features/taskAPI";

const initialState = {
  tasks: [],
  edit: false,
  loading: false,
  error: null,
};

export const getTasksAsync = createAsyncThunk("getTasks",
    async (thunkAPI) => {
    try {
        const tasks = await taskAPI.allTasks();
        return tasks;
    } catch (error) {
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});
export const postTaskAsync = createAsyncThunk("postTask",
    async (task, thunkAPI) => {
    try {
        const taskAdded = await taskAPI.addTask(task)
        return taskAdded;
    } catch (error) {
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});
export const deleteTaskAsync = createAsyncThunk("deleteTask",
    async (_id, thunkAPI) => {
    try {
        const taskDeleted = await taskAPI.deleteTask(_id);
        console.log("Deleted Task ", taskDeleted);
        return taskDeleted;;
    } catch (error) {
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});
export const updateTaskAsync = createAsyncThunk("updateTask",
    async (data, thunkAPI) => {
    try {
         console.log("in updateTaskAsync", data);
         const state = thunkAPI.getState();
         const {task} = state;
         const {edit} = task;
         console.log(edit)
         const _id = edit._id
        const taskUpdate = await taskAPI.updateTask(_id,data);
        return taskUpdate;
    } catch (error) {
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    editTask:(state,action)=>{
        state.edit = state.tasks.find(task => task._id === action.payload)
        console.log(state.edit)
    },
    resetTask:(state,action)=>{
      console.log("in resetTask()")
      state.tasks =[];
      state.edit = false;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
    //Get All Tasks
    .addCase(getTasksAsync.pending, (state) => {
      state.loading = true;
    })
    .addCase(getTasksAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    })
    .addCase(getTasksAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    //Post Tasks
    .addCase(postTaskAsync.pending, (state) => {
      state.loading = true;
    })
    .addCase(postTaskAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = [action.payload, ...state.tasks ];
    })
    .addCase(postTaskAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    //Delete Particular Task
    .addCase(deleteTaskAsync.pending, (state) => {
        state.loading = true;
        
      })
    .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.edit = false;
        state.tasks = state.tasks.filter( task => task._id !== action.payload._id )
      })
    .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    //Update Particular Task
    .addCase(updateTaskAsync.pending, (state) => {
        state.loading = true;
        
      })
    .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.edit = false;
        state.tasks = state.tasks.map( task => {
            if(task._id === action.payload._id){
                task = action.payload
                return task;
            }
            return task;
        } )
      })
    .addCase(updateTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


    
  },
});

export const  { editTask , resetTask}  =  taskSlice.actions

export default taskSlice.reducer;

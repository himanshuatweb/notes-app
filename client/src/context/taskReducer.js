import {GET_TASK,ADD_TASK, EDIT_TASK, UPDATE_TASK, DELETE_TASK} from './types';

const taskReducer = (state,action) =>{
    switch(action.type){

        case GET_TASK:
            return {
                ...state,
                tasks:action.payload
            }
        
        case ADD_TASK:{
            return{
                ...state,
                tasks:[action.payload,...state.tasks],
            }
        }

        case EDIT_TASK:{
            return{
                ...state,
                edit: [...state.tasks].find( task => task._id === action.payload)
            }
        }

        case UPDATE_TASK:{
            console.log('Update reducer runs');

            return {
                ...state,
                edit:false,
                tasks:[...state.tasks].map( task => {
                    if(task._id === action.payload._id){
                        task.dataName = action.payload.dataName
                        task.fileName = action.payload.fileName
                        return task;
                    }else{
                        return task;
                    }
                } ),
            }
        }

        case DELETE_TASK:
            return {
                ...state,
                edit:false,
                tasks:[...state.tasks].filter( task => task._id !== action.payload)

            }

        default:
            return state;
    }
}

export default taskReducer;
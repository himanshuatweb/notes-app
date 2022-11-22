import axios from 'axios'

const API_URL = '/api/task'


const API = axios.create({baseURL : `http://localhost:5000`});
API.interceptors.request.use( (req)=>{
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    return req;
})


//Get All Tasks 
const allTasks = async()=>{
    console.log("IN allTasks() taskAPI ")
    // const response = await axios.get( API_URL )
    const response = await API.get('/api/task')
    console.log("From taskAPI allTasks() ", response)
    return response.data;
}

//Insert New Task
const addTask = async(task) =>{
    console.log("In addTask() taskAPI ", task);

    // const response = await axios.post(API_URL, task);
    const response = await API.post('/api/task',task);
    const addedTask = response.data;
    return addedTask;
}
//Delete Task With Particular id
const deleteTask = async(_id) =>{
    console.log("In deleteTask() taskAPI ", _id);
    // const response = await axios.delete(`${API_URL}/${_id}`);
    const response = await API.delete(`/api/task/${_id}`);
    const addedTask = response.data;
    return addedTask;
}

//Update task with particular id
const updateTask = async(_id, task) =>{
    console.log("In updatedTask() taskAPI ",_id , task);
    // const response = await axios.put(`${API_URL}/${_id}`, task);
    const response = await API.put(`/api/task/${_id}`, task);
    return response.data;
}

const taskAPI = {
    allTasks,
    addTask,
    deleteTask,
    updateTask
}

export default taskAPI;
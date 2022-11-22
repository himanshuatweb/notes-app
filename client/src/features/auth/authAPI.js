import axios from 'axios'

const API = axios.create({baseURL : `http://localhost:5000`});
// API.interceptors.request.use( (req)=>{
//     req.headers.authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbUBnbWFpbC5jb20iLCJpZCI6IjYzNzM1ZjJlMGQ4NDZkMjNlNGU3ZTgyZiIsImlhdCI6MTY2ODUwNjc2OSwiZXhwIjoxNjY4NTEwMzY5fQ.sFMjwZ9z25qeJArhX_M6ys63X9SKum-0HjkeKG0NXyE`

//     return req;
// })


//Create New User in database (Signup)
const signup = async(data)=>{
    console.log("IN signup() authAPI ", data)
    // const response = await axios.get( API_URL )
    const response = await API.post('/api/user/signup',data);
    return response.data;
}

//singin existing user in database (Signin);
const signin = async(data)=>{
    console.log("IN signin() authAPI ", data)
    // const response = await axios.get( API_URL )
    const response = await API.post('/api/user/signin',data);
    return response.data;
}




const taskAPI = {
   signup,
   signin
}

export default taskAPI;
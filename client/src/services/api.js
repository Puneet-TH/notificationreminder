import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_KEY;

const apiInstance = axios.create(
    {
    baseURL: API_BASE_URL,
    timeout: 5000
    }
)

//config is like used for sending api request with proper headers
//Before every API request, it checks if you have a token saved in localStorage
//this is axios syntax..  
apiInstance.interceptors.request.use((config) => {
        const token = localStorage.getItem("accessToken")
        if(token){
           config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)


const authService = {
    signup : (jsonData) => {
        apiInstance.post('/user/singup',jsonData, {
            headers:{
                 'Content-Type': 'application/json'
            }
        })
    },
    login : (email, password) => {
        apiInstance.post('/user/login', jsonData, {
            headers:{
                'Content-Type' : 'application/json'
            }
        })
    }
}


const exam = {
    //creating exam function
      createExam : (jsonData) => {
        apiInstance.post('/exam/create-exam', jsonData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
      }, 
    //sending notification 
       sendingNotification : () => {
        apiInstance.post('/exam/sendUserNotifications')
       },

    //starting chron job
       startChronJob : () => {
        apiInstance.post('/exam/startNotificationJob')
       },
    //stopping chron job
       stopChronJob : () => {
        apiInstance.post('/exam/stopNotificationJob')
       }
}


export {
    authService,
    exam
}
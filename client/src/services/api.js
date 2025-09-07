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
        return apiInstance.post('/user/signup',jsonData, {
            headers:{
                 'Content-Type': 'application/json'
            }
        });
    },
    login : (email, password) => {
        return apiInstance.post('/user/login', { email, password }, {
            headers:{
                'Content-Type' : 'application/json'
            }
        });
    },
    logout : () => {
        return apiInstance.post('/user/logout')
    }
}


const exam = {
        //creating exam function
            createExam : (jsonData) => {
                return apiInstance.post('/exam/create-exam', jsonData, {
                        headers: {
                                'Content-Type': 'application/json'
                        }
                });
            }, 
        //sending notification 
             sendingNotification : () => {
                return apiInstance.post('/exam/sendUserNotifications');
             },

        //starting chron job
             startChronJob : () => {
                return apiInstance.post('/exam/startNotificationJob');
             },
        //stopping chron job
             stopChronJob : () => {
                return apiInstance.post('/exam/stopNotificationJob');
             }
}


export {
    authService,
    exam
}
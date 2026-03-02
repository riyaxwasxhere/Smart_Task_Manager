import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const API = axios.create({
    baseURL: "https://smart-task-manager-1-jj8r.onrender.com/api"
})

API.interceptors.request.use(async(config) =>{
    const token = await AsyncStorage.getItem("token")

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    console.log("AXIOS INSTANCE LOADED");
    return config
})

export default API
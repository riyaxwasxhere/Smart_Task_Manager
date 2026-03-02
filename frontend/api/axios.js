import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const API = axios.create({
    baseURL: "http://192.168.1.3:8000/api"
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
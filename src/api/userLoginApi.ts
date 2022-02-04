import axios, { AxiosInterceptorManager, AxiosRequestConfig } from 'axios';
import { config } from 'process';

const baseUrl = 'https://rs-lang-scorpion.herokuapp.com';

const api = axios.create({
    baseURL : baseUrl
})

api.interceptors.request.use((config: AxiosRequestConfig<any>) => {
    //@ts-ignore
    config.headers.Authorization = `Bearer ${getMeToken()}`
    return config
})

api.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        
        let id = getUserId()
        const originalRequest = error.config
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true
            try {
                const response = await api.get(`/users/${id}/tokens`)
                localStorage.setItem("user", JSON.stringify(response.data))
                return api.request(originalRequest)
            } catch (e) {
                console.log(e)
            }
        }
        throw error
    },
)

export const getMeToken=()=>{
    const user = localStorage.getItem("user")
    if(!user) return
    return JSON.parse(user).token
}
export const getUserId=()=>{
    const user = localStorage.getItem("user")
    if(!user) return
    return JSON.parse(user).userId
}

export default api

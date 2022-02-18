import axios from 'axios';
import { Dispatch } from 'react';
import api from '../api/api';


export const SET_USER = 'SET_USER';
export const USER_LOGOUT = 'USER_LOGOUT';
export const SET_LOADER = 'SET_LOADER';
export const SET_ERROR = 'SET_ERROR'
export const SET_IS_LOGIN = 'SET_IS_LOGIN'


type ActionType = 
| ReturnType<typeof loadingAC>
| ReturnType<typeof setUserAC>
| ReturnType<typeof setIsLoginAC>
| ReturnType<typeof setErrorAC>

export type userType = {
    message: string,
    token: string,
    refreshToken: string,
    userId: string,
    name: string
    email: string 
}

type InitialStateType = {
    isLogin: false
    error: string,
    isLoading: boolean,
    user: userType
}

//@ts-ignore
const user = JSON.parse(localStorage.getItem('user'))
const initialState ={
    isLogin:  false,
    error: '',
    isLoading: false,
    user: user ? user: {}
} 

const UserReducer = (state = initialState, action: ActionType) => {
    
    switch (action.type) {
        case SET_USER: {
            return { ...state, user:{ ...action.data} } 
        }

        case SET_LOADER:{
            return {...state, isLoading: action.isLoading}
        }
        case SET_ERROR:{
            return {...state, error: action.error}
        }
        case SET_IS_LOGIN:{
            return {...state, isLogin: action.isLogin}
        }
        default: {
            return state;
        }
    }
};

export const loadingAC=(isLoading: boolean)=>{
    return{
        type:SET_LOADER,
        isLoading
    }as const
}

const setUserAC=(data: any)=>{
    return{
        type: SET_USER,
        data
    } as const
}

export const setIsLoginAC =(isLogin: boolean)=>{
    return{
        type: SET_IS_LOGIN,
        isLogin
    }as const
}

const setErrorAC = (error: string)=>{
    return{
        type: SET_ERROR,
        error
    } as const
}


export const loginUser = (email: string, password: string)=>(dispatch:Dispatch<ActionType>)=>{
    dispatch(loadingAC(true));
    api.post('/signin', {email, password})
    .then((response)=>{
        localStorage.setItem('user', JSON.stringify(response.data))
        console.log(response.data)
        dispatch(setUserAC(response.data))
        
    })
    .catch((err)=>{
        dispatch(setErrorAC(err.response ? err.response.data : err.message))
    })
    .finally(()=>{
        dispatch(loadingAC(false))
    })   
}

export const createNewUser = (username:string, email:string,  password:string)=>(dispatch: Dispatch<ActionType>)=>{
    dispatch (loadingAC(true))
    api.post('https://rs-lang-scorpion.herokuapp.com/users', {username, email, password})
    .then((response)=>{
        localStorage.setItem('user',JSON.stringify(response.data))
        dispatch(setUserAC(response.data))
        
    })
    .catch((err)=>{
        dispatch(setErrorAC(err.response ? err.response.data : err.message))
    })
    .finally(()=>{
        dispatch(loadingAC(false))
    })   
}

export const logaut = ()=>(dispatch: any)=>{
    localStorage.removeItem("user");
    dispatch(setUserAC({}));
    
}

export const checkAuthUser = (id: string) => (dispatch: Dispatch<ActionType>) => {
    axios.get(`https://rs-lang-scorpion.herokuapp.com/users/${id}/tokens`,)
        .then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data));
            dispatch(setUserAC( res.data));
            setIsLoginAC(true)
        })
        .catch((err) => {
            dispatch(setErrorAC(err.response ? err.response.data : err.message));
        });
};


export default UserReducer;



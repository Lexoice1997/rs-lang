import axios from 'axios';
import { Dispatch } from 'react';
import UserService from '../api/serwiceUser';
import api from '../api/userLoginApi';


export const SET_USER = 'SET_USER';
export const USER_LOGOUT = 'USER_LOGOUT';
export const SET_LOADER = 'SET_LOADER';
export const SET_ERROR = 'SET_ERROR'
export const SET_IS_LOGIN = 'SET_IS_LOGIN'

// type ActionType = 
// | ReturnType<typeof onLogoutAC>
// | ReturnType<typeof setLoaderAC>
// | ReturnType<typeof onUpdateUserDataAC>
// | ReturnType<typeof setErrorAC>

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


const initialState  ={
    isLogin: false,
    error: '',
    isLoading: false,
    user: {}
} 

const UserReducer = (state = initialState, action: any) => {
    
    switch (action.type) {
        case SET_USER: {
            return { ...state, user:{ ...action.data} } ;
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

const loadingAC=(isLoading: boolean)=>{
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

const setIsLoginAC =(isLogin: boolean)=>{
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

export const loginUser = (email: string, password: string)=>(dispatch:any)=>{
    dispatch(loadingAC(true));
    api.post('/signin', {email, password})
    .then((response)=>{
        localStorage.setItem('user', JSON.stringify(response.data))
        console.log(response.data)
        dispatch(setUserAC(response.data))
        dispatch(setIsLoginAC(true))
    })
    .catch((err)=>{
        dispatch(setErrorAC(err.response ? err.response.data : err.message))
    })
    .finally(()=>{
        dispatch(loadingAC(false))
    })   
}

export const createNewUser = (username:string, email:string,  password:string)=>(dispatch:any)=>{
    dispatch (loadingAC(true))
    api.post('https://rs-lang-scorpion.herokuapp.com/users', {username, email, password})
    .then((response)=>{
        localStorage.setItem('user',JSON.stringify(response.data))
        console.log(response.data)
        dispatch(setUserAC(response.data))
        dispatch(setIsLoginAC(true))
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
    dispatch(setIsLoginAC(false));
}

export const checkAuthUser = (id: string) => (dispatch: any) => {
    axios.get(`https://rs-lang-scorpion.herokuapp.com/users/${id}/tokens`,)
        .then((res) => {
            localStorage.setItem("user", res.data);
            dispatch(setUserAC( res.data));
            dispatch(setIsLoginAC(true));
        })
        .catch((err) => {
            dispatch(setErrorAC(err.response ? err.response.data : err.message));
        });
};

// const initialState: InitialStateType ={
//     isLogin: false,
//     error: '',
//     isLoading: false,
//     //@ts-ignore
//     user: JSON.parse(localStorage.getItem('user')) || {}
// } 

// export const onLogoutAC = () => {
//     return {
//         type: USER_LOGOUT,
//     } as const
// };
// export const setLoaderAC = (loader: boolean) => {
//     return {
//       type: SET_LOADER,
//       payload: loader
//     } as const
//   }
// export const onUpdateUserDataAC = (data:any) => {
//     debugger
//     return {
//         type: SET_USER,
//         payload: data,
//     } as const
// };

// export const setErrorAC = (data:string) => {
//     return {
//         type: SET_ERROR,
//         payload: data,
//     } as const
// };

// const UserReducer = (state: InitialStateType = initialState, action: ActionType) => {
//     debugger
//     switch (action.type) {
//         case SET_USER: {
//             return { ...state, user:{ ...action.payload} };
//         }
//         case USER_LOGOUT: {
//             return {...state, user: {}};
//         }
//         case SET_LOADER:{
//             return {...state, isLoading: action.payload}
//         }
//         case SET_ERROR:{
//             return {...state, error: action.payload}
//         }
//         default: {
//             return state;
//         }
//     }
// };



// export const createNewUser = (username:string, email:string,  password:string) => (dispatch:any) => {
    
//     dispatch(setLoaderAC(true));
//     return userLoginApi
//         .createNewUser(username,email, password)
//         .then((data) => dispatch(onUpdateUserDataAC(data)))
//         .catch((err) => dispatch(setErrorAC(err.response ? err.response.data : err.message)))
//         .finally(() => dispatch(dispatch(setLoaderAC(false))));
// };

// export const loginUser = (email: string, password: string) => async (dispatch: any) => {
//     try {
//         dispatch(setLoaderAC(true));
//         const data = await userLoginApi.login(email, password);
//         const userInfo = await userLoginApi.getUserById(data.userId, data.token);
//         dispatch(onUpdateUserDataAC({...data, ...userInfo }));
//     } 
//     catch (err:any) {dispatch(setErrorAC(err.response ? err.response.data : err.message));
//     } 
//     finally {
//         dispatch(setLoaderAC(false));
//     }
// };



// export const updateToken = () => (dispatch:any, getState: any) => {
//     const user = getState().user;
//     if (!!(user?.id) && !user.blocked) {
//         dispatch(onUpdateUserDataAC({...user, blocked: true}))
//         dispatch(setLoaderAC(true));
//         return userLoginApi
//             .updateToken(user.id, user.refreshToken)
//             .then((data) => dispatch(onUpdateUserDataAC({...user, ...data, blocked: false})))
//             .catch(() => dispatch(onLogoutAC()))
//             .finally(() => {
//                 dispatch(setLoaderAC(false));
//             });
//     }
// };




export default UserReducer;



import axios from 'axios';

export const baseURL='https://rs-lang-scorpion.herokuapp.com/doc';

export const instance = axios.create({
    baseURL,
    withCredentials:true,
});
export const api = {
    //login
    login() {
        return instance.post(``, {
           
        })
    },
    //registration
    registration() {
        return instance.post(``, {
            
        })
    },

  
};



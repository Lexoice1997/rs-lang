import axios from 'axios';

export const baseURL='https://rs-lang-scorpion.herokuapp.com/doc';

export const instance = axios.create({
    baseURL,
    withCredentials:true,
});

export const api = {
     //registration
    addUser(name: string, email: string, password: string) {
        return instance.post(`/users`, {
            name: name,
            email: email,
            password: password
        })
    },
    
    signIn(email: string, password: string) {
        return instance.post(`/signin`, {
            email: email,
            password: password,
            
        })
    },
    getUserById(id: string, token: string){
        return instance.get(`/users/${id}`,{
            headers: { 'Authorization': `Bearer ${token}` }
        })
    },
    updateToken(id:string, token: string){
        return instance.get(`/users/${id}/tokens`,{
            headers: { 'Authorization': `Bearer ${token}` }
        })
    }

    
    // textbook
    
  
};
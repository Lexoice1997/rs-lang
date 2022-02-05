import api from "./api";

export default class UserService{
    static async login(email: string, password: string){
        return api.post('/signin', {email, password})
    }
    static async createUser(name: string ,email: string, password: string){
        return api.post('/users', {name, email, password})
    }
    static async getUserById(id: string){
        return api.get(`/users/${id}`)
    }
}
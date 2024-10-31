import axios from "axios"
import { LOGIN } from "./ApiConfig"

export const login = async (email, password) => {
    try{
        const res = await axios.post(LOGIN, { email, password })
        return res.data
    }catch(e){
        console.log(e)
        return e.response.data
    }
}
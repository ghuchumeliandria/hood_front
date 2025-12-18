import { CookieValueTypes } from "cookies-next"
import { axiosInstance } from "./axios-instance"
import { User } from "../types/types"

type PropsType = {
    token : CookieValueTypes | Promise<CookieValueTypes>,
    setUser : (data :  User) => void
}

export const GetCurrentUser = () => {
    const getCurrentUser = async ({token , setUser  } : PropsType) =>{
        try {
            const resp = await axiosInstance.get('/users/profile' , {
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            })
            if(resp.status === 200){
                if(setUser){
                    setUser(resp.data)
                }
                
               return resp.data.role

            }   
        } catch (error) {
            console.log("useri arasworia")
        }
    }
    return { getCurrentUser}
    
}
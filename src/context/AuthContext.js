import { createContext } from "react";

import { PUBLIC_API } from "../utils/config";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
const navigate = useNavigate();

    const login = (formData) => {
        PUBLIC_API.post("admin/login", formData)
            .then((res)=> {
                if(res?.data.success) {
                    localStorage.setItem("user", JSON.stringify(res.data.data.user)); 
                    localStorage.setItem("user_token", res.data.data.token);
                    navigate("/leads");
                }
            })
    }

    const logout = () => {
        localStorage.removeItem("user"); 
        localStorage.removeItem("user_token");
        navigate("/");
    }

    return(
        <AuthContext.Provider value={{login, logout}}>
            {children}
        </AuthContext.Provider>
    )
    
}
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const authContext = createContext()

function AuthProvider({children}){
    const [loggedIn,setLoggedIn] = useState(false)
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        axios.get("http://localhost:4000/auth/me", { withCredentials: true })
            .then(() => setLoggedIn(true))
            .catch(() => setLoggedIn(false))
            .finally(() => setLoading(false));
    }, []);

    return(
        <authContext.Provider value={{loggedIn,setLoggedIn,loading,setLoading}}>
            {children}
        </authContext.Provider>
    );
}

export function useAuth(){
    return useContext(authContext);
};

export default AuthProvider;
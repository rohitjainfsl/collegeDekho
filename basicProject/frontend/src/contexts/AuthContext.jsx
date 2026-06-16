import { createContext, useContext, useState } from "react";

const authContext = createContext()

function AuthProvider({children}){
    const [loggedIn,setLoggedIn] = useState(false)

    return(
        <authContext.Provider value={{loggedIn,setLoggedIn}}>
            {children}
        </authContext.Provider>
    );
    
    
}

export function useAuth(){
    return useContext(authContext);
};

export default AuthProvider;
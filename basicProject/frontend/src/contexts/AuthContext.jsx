import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const authContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:4000/auth/me", {
          withCredentials: true,
        });
        if (response.status === 200 || response.statusText === "OK") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.post("http://localhost:4000/auth/logout", {}, {
        withCredentials: true,
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoggedIn(false);
    }
  };

  return (
    <>
      <authContext.Provider value={{ isLoggedIn, setIsLoggedIn, loading, logout }}>
        {children}
      </authContext.Provider>
    </>
  );
}

export function useAuth() {
  return useContext(authContext);
}

export default AuthProvider;


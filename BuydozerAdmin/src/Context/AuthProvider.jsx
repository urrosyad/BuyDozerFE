import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const [auth, setAuth] = useState({
        isLoggedIn: !!localStorage.getItem("AccessToken"),
        accessToken: localStorage.getItem("AccessToken") || null,
        userRole: localStorage.getItem("UserRole") || null,
        userName: localStorage.getItem("UserName") || null,
      });

      const loginAuth = (accessToken, userRole, userName) => {
        localStorage.setItem("AccessToken", accessToken);
        localStorage.setItem("UserRole", userRole); 
        localStorage.setItem("UserName", userName);
        
        setAuth({
          isLoggedIn: true,
          accessToken: accessToken,
          userRole: userRole,
          userName: userName,
        });
      };

      
      useEffect(() => {
        const from = location.state?.from?.pathname || "/";
        // Jika sudah login, maka navigasi langsung ke dashboard
        if (auth.isLoggedIn) {
          navigate('/admin/dashboard', { replace: true });
        // Jika belum login, maka navigasi sesuai dengan 'from'
        } else {
          if (from === "/register") {
            navigate('/', { replace: true });
          }
        }
      }, [auth.isLoggedIn, location.state]);


      const logoutAuth = () => {
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("UserRole");
        localStorage.removeItem("UserName");
    
        setAuth({
          isLoggedIn: false,
          accessToken: null,
          userRole: null,
          userName: null,
        });
      };


    return (
        <AuthContext.Provider value={{ auth, setAuth, loginAuth, logoutAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
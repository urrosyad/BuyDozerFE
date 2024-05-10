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
        userId: localStorage.getItem("UserId") || null,
      });

      const loginAuth = (accessToken, userRole, userName, userId) => {
        const expiresIn = new Date().getTime() / 1000 + 3600;
        localStorage.setItem("AccessToken", accessToken);
        localStorage.setItem("UserRole", userRole); 
        localStorage.setItem("UserName", userName);
        localStorage.setItem("UserId", userId);
        localStorage.setItem("ExpiresIn", expiresIn);
        
        setAuth({
          isLoggedIn: true,
          accessToken: accessToken,
          userRole: userRole,
          userName: userName,
          userId: userId,
        });
      };

      const authData = JSON.stringify(auth);
      localStorage.setItem("AuthData", authData);

    
      // useEffect(() => {
      //   const expiresIn = localStorage.getItem("ExpiresIn");
      //   const currentTime = new Date().getTime() / 1000;
      //   const isLoggedIn = currentTime < expiresIn;
        
      //   setAuth(prevAuth => ({ ...prevAuth, isLoggedIn }));
      // }, []);

      
      useEffect(() => {
        const from = location.state?.from?.pathname || "/login";
        // Jika sudah login, maka navigasi langsung ke dashboard

        if (auth.isLoggedIn) {
          if (auth.userRole === 1999) {
            navigate('/admin/dashboard', { replace: true });
        } else if (auth.userRole === 2000) {
            navigate('/', { replace: true });
        }
        // Jika belum login, maka navigasi sesuai dengan 'from'

        } else {
          if (from === "/register") {
            navigate('/login', { replace: true });
          }
        }
      }, [auth.isLoggedIn, auth.userRole, location.state]);


      const logoutAuth = () => {
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("UserRole");
        localStorage.removeItem("UserName");
        localStorage.removeItem("UserId");
        localStorage.removeItem("AuthData");
        
        setAuth({
          isLoggedIn: false,
          accessToken: null,
          userRole: null,
          userName: null,
          userId: null,
        });
      };


    return (
        <AuthContext.Provider value={{ auth, setAuth, loginAuth, logoutAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
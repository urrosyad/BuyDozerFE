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
    expiresIn: localStorage.getItem("ExpiresIn") || null,
  });

  const loginAuth = (accessToken, userRole, userName, userId, expiresIn) => {
    const expiryTime = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem("AccessToken", accessToken);
    localStorage.setItem("UserRole", userRole);
    localStorage.setItem("UserName", userName);
    localStorage.setItem("UserId", userId);
    localStorage.setItem("ExpiresIn", expiryTime);

    setAuth({
      isLoggedIn: true,
      accessToken: accessToken,
      userRole: userRole,
      userName: userName,
      userId: userId,
      expiresIn: expiryTime
    });
  };


  // useEffect for directing user with different role
  useEffect(() => {
    const from = location.state?.from?.pathname || "/login";
    // Jika sudah login, maka navigasi langsung ke dashboard
    
    // Jika sudah login, maka navigasi langsung ke dashboard
    if (auth.isLoggedIn) {
      if (auth.userRole === 1999) {
        window.location.href = '/admin/dashboard';
      } else if (auth.userRole === 2000) {
        window.location.href = '/';
      }
      // Jika belum login, maka navigasi sesuai dengan 'from'
    } else {
      if (from === "/register") {
        window.location.href = '/login';
      }
    }
  }, [auth.isLoggedIn, auth.userRole, location.state]);

  // useEffect for counting the expiresIn end
  useEffect(() => {
    const handleLogoutIfExpired = () => {
      const expiryTime = localStorage.getItem("ExpiresIn");
      if (expiryTime && new Date().getTime() > expiryTime) {
        logoutAuth();
      }
    };
    const interval = setInterval(handleLogoutIfExpired, 1000); // Periksa setiap detik
    return () => clearInterval(interval);
  }, []);

  // useEffect for show the expiresIn time left
  useEffect(() => {
    if (auth.isLoggedIn && auth.expiresIn) {
      const interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeLeft = Math.max(0, auth.expiresIn - currentTime);
        const minutesLeft = Math.floor(timeLeft / 60000);
        console.log(`ExpiresIn end in: ${minutesLeft}m`);
        if (timeLeft <= 0) {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [auth.isLoggedIn, auth.expiresIn]);


  const logoutAuth = () => {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("UserRole");
    localStorage.removeItem("UserName");
    localStorage.removeItem("UserId");
    localStorage.removeItem("ExpiresIn");
    localStorage.removeItem("AuthData");

    setAuth({
      isLoggedIn: false,
      accessToken: null,
      userRole: null,
      userName: null,
      userId: null,
      expiresIn: null,
    });

    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, loginAuth, logoutAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
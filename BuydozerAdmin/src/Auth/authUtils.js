import { useNavigate } from "react-router-dom";

// For set accessToken to localStorage
export const setToken = (accessToken, expiresIn) => {
  const expireTime = new Date().getTime() + expiresIn;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("expireTime", expireTime);
};

// for get token from localStorage
export const getToken = () => {
    return localStorage.getItem('accessToken');
};

// for logout 
export const removeToken = () => {
  localStorage.removeItem("AccessToken");
  localStorage.removeItem("ExpireTime");
  localStorage.removeItem("UserName")
};

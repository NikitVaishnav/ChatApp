import axios from "axios";

export const loginUserService = async (credentials) => {
 try {
   const response = await axios.post("http://localhost:8000/api/auth/login", credentials);
  return response.data;
  
 } catch (error) {
   console.error("API login error:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || "Login failed" };
 }
};

export const registerUserService = async (userData) => {
  const response = await axios.post("http://localhost:8000/api/auth/register", userData);
  return response.data;
};

export const fetchChatList = async (userId) => {
  const response = await axios.get(`http://localhost:8000/api/chat/list?userId=${userId}`);
  return response.data.chats;
};
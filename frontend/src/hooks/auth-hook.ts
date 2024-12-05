import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios'


// config
axios.defaults.baseURL = 'http://127.0.0.1:8000';
// Log requests
axios.interceptors.request.use(request => {
  console.log('Starting Request:', request);
  return request;
});

// Log responses
axios.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});


export const useAuth = () => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  //   useEffect(() => {
  //     setIsLogin(!!authorizationUtil.getAuthorization());
  //   }, []);

  return { isLogin };
};

export const useAdminAuth = () => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  //   useEffect(() => {
  //     setIsLogin(!!authorizationUtil.getIsAdmin());
  //   }, []);

  return { isLogin };
};


export const handleLoginSubmission = async (username, password) => {
  try {
    // Form data payload
    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('username', username);
    formData.append('password', password);
    formData.append('scope', '');
    formData.append('client_id', 'string');
    formData.append('client_secret', 'string');

    // Axios POST request
    const response = await axios.post('http://localhost:8000/api/user/auth', formData, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const token = response.data.access_token;

    localStorage.setItem('authToken', token);

    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
};


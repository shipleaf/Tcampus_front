import axios from 'axios';

const API_URL = 'itcampus-server.duckdns.org';

export const login = async (userData) => {

    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;

    } catch (error) {
        console.error('로그인 실패사유:', error);
        throw error;
    }
};

export const regist = async (registData) => {

    try {
        const response = await axios.post(`${API_URL}/register`, registData);
        return response.data;

    } catch (error) {
        console.error('회원가입 실패사유:', error)
        throw error;
    }
};
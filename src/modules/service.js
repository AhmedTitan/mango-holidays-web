import axios from "axios";

const baseUrl = `http://localhost:4000/api/`;

export const getProperty = async () => {
  try {
    const result = await axios.get(`${baseUrl}property/`);
    return Promise.resolve(result.data.data);
  } catch (error) {
    return Promise.reject(error.response?.data || error.response);
  }
};

export const getRoomsByProperty = async (id) => {
  try {
    const result = await axios.get(`${baseUrl}property/${id}`);
    return Promise.resolve(result.data.data);
  } catch (error) {
    return Promise.reject(error.response?.data || error.response);
  }
};

export const login = async (values) => {
  try {
    const result = await axios.post(`${baseUrl}auth/login`, values);
    return Promise.resolve(result.data.data);
  } catch (error) {
    return Promise.reject(error.response?.data || error.response);
  }
};

export const signup = async (values) => {
  try {
    const result = await axios.post(`${baseUrl}auth/register`, values);
    return Promise.resolve(result.data.data);
  } catch (error) {
    return Promise.reject(error.response?.data || error.response);
  }
};

export const createReservation = async (values, token) => {
  try {
    const result = await axios.post(`${baseUrl}reservation`, values, {
      headers: {
        Authorization: token,
      },
    });
    return Promise.resolve(result.data.message);
  } catch (error) {
    return Promise.reject(error.response?.data || error.response);
  }
};

export const fetchRoomAvailability = async (roomId) => {
  try {
    const result = await axios.get(
      `${baseUrl}reservation/availability/${roomId}`
    );
    return Promise.resolve(result.data.data);
  } catch (error) {
    return Promise.reject(error.response?.data || error.response);
  }
};

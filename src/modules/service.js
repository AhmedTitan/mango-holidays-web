import axios from "axios";

const baseUrl = `http://localhost:4000/api/`;

export const getProperty = async () => {
  try {
    const result = await axios.get(`${baseUrl}property/`);
    return Promise.resolve(result.data.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const getRoomsByProperty = async (id) => {
  try {
    const result = await axios.get(`${baseUrl}property/${id}`);
    return Promise.resolve(result.data.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

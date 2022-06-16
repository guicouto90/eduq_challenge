import axios from "axios";

const url = 'http://localhost:3001/users';

export const getUserById = async(id: String): Promise<any> => {
  try {
    const response = await axios.get(`${url}/${id}`);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const newSale = async(id: String, productId: String): Promise<any> => {
  try {
    const response = await axios.put(`${url}/purchase/${id}`, {
      productId
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const cancelSale = async(id: String, productId: String): Promise<any> => {
  try {
    const response = await axios.put(`${url}/cancel/${id}`, {
      productId
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
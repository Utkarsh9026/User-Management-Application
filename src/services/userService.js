import axios from "axios";

export const API_URL = "https://jsonplaceholder.typicode.com/users";

export const getUsers = async () => {
  return axios
    .get(API_URL)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching users:", error);
      throw error;
    });
};

export const createUser = async (userData) => {
  return axios.post(API_URL, userData).then((res) => res.data);
};

export const updateUser = async (userData, id) => {
  return axios
    .put(`${API_URL}/${id}`, userData)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error in updating users:", error);
      throw error;
    });
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}`);
    if (response.status === 200) {
      return { success: true, message: "Deleted Successfully" };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

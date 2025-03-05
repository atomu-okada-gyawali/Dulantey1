import axios from "axios";

export const callAuthInit = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }

    const response = await axios.get("http://localhost:5000/api/auth/init", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Store response data in localStorage as currentUser
    localStorage.setItem("currentUser", JSON.stringify(response.data.data));

    return response.data;
  } catch (error) {
    console.error("Error calling auth init:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
};

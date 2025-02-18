import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../environment";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found. Please login.");
        setLoading(false);
        return;
      }

      try {
        if (!token || typeof token !== "string" || token.length === 0) {
          setError("Invalid authentication token. Please login again.");
          localStorage.removeItem("token");
          return;
        }

        console.log("Attempting to authenticate with token:", token);
        console.log("API Base URL:", API.BASE_URL);

        const response = await axios.get(`${API.BASE_URL}/api/auth/init`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          validateStatus: (status) => status < 500,
        });

        console.log("Authentication response:", {
          status: response.status,
          data: response.data,
          headers: response.headers
        });

        if (response.status === 401) {
          setError("Session expired. Please login again.");
          localStorage.removeItem("token");
          return;
        }

        if (response.status === 200 || response.status === 201) {
          if (response.data && response.data.data) {
            setCurrentUser(response.data.data);
          } else {
            setError("Invalid response format from authentication server");
          }
        } else {
          setError(
            `Authentication failed. Status: ${response.status}, Message: ${
              response.data?.message || "No error message"
            }`
          );
        }
      } catch (err) {
        setError("Failed to fetch current user");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return { currentUser, loading, error };
};

export default useAuth;

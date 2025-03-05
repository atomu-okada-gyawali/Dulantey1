import axios from "axios";
import { API } from "../environment";

export const handleDeleteBlog = async (blogId, token, onClose, setError) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
        try {
            const response = await axios.delete(`${API.BASE_URL}/api/blogs/deleteBlog/${blogId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("Blog deleted successfully:", response.data);
            onClose(); // Close the modal after deletion
        } catch (error) {
            console.error("Error deleting blog:", error);
            setError("Failed to delete blog. Please try again later.");
        }
    }
};

import React from "react";
import axios from "axios";

interface SoftDeleteButtonProps {
  projectId: string;
  fun: any;
}

const DeleteButton: React.FC<SoftDeleteButtonProps> = ({ projectId, fun }) => {
  const handleSoftDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      try {
        const token = localStorage.getItem("Token"); // Ensure the token is retrieved
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.delete(
          `http://127.0.0.1:3001/projects/${projectId}`, // projectId in the URL
          {
            headers: {
              Authorization: `${token}`, // Add 'Bearer ' before the token
            }, 
          }
        );

        if (response.status === 200) {
          alert("Project soft deleted successfully");
          fun(projectId);
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("An error occurred while deleting the project");
      }
    }
  };

  return <button onClick={handleSoftDelete}>Delete</button>;
};

export default DeleteButton;

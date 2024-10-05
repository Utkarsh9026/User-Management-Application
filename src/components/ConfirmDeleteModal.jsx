import { API_URL, deleteUser } from "../services/userService";
import axios from "axios";

const ConfirmDeleteModal = ({ user, onClose, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${API_URL}/${user.id}`);
      if (response.status === 200) {
        onDeleteSuccess(user.id);
        onClose();
      }
    } catch (error) {
      console.log(error);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white max-w-sm md:max-w-lg p-6 rounded-md">
        <h2 className="text-xl mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete {user.name}?</p>
        <div className="flex justify-end mt-4">
          <button className="mr-2 text-gray-500" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

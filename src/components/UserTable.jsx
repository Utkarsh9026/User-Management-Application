import { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EditUserModal from "./EditUserModal";
import CreateUserModal from "./CreateUserModal";

const UserTable = ({ users, setUsers }) => {
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Function to filter users based on the search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteSuccess = (id) => {
    // Filter out the deleted user by ID
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full sm:w-3/4">
        <div className="bg-purple-100 bg-opacity-50 px-6 py-4 flex justify-between items-center rounded-t-lg">
          <h2 className="text-xl font-semibold text-gray-800">User Details</h2>
          <button
            onClick={() => setShowCreateUserModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Create User
          </button>
        </div>
        {/* Search Input */}
        <div className="px-6 py-4">
          <input
            type="text"
            placeholder="Search by user name..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
        </div>
        {/*  Here is the complete user details in the form of table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link
                      to={`/user/${user.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {user.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.address.city}
                  </td>

                  <td className="px-4 py-4 text-right">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => setEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => setDeleteUser(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          setUsers={setUsers}
          users={users}
        />
      )}
      {deleteUser && (
        <ConfirmDeleteModal
          user={deleteUser}
          onClose={() => setDeleteUser(null)}
          onDeleteSuccess={handleDeleteSuccess} // Pass the function to ConfirmDeleteModal
        />
      )}
      {showCreateUserModal && (
        <CreateUserModal
          onClose={() => setShowCreateUserModal(false)}
          onUserCreated={(newUser) => {
            // Logic to add new user to the users list
            setUsers((prevUsers) => [...prevUsers, newUser]);
            setShowCreateUserModal(false);
          }}
        />
      )}
    </div>
  );
};

export default UserTable;

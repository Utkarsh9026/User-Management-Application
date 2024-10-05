import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUsers } from "../services/userService";
import LoadingSpinner from "../components/LoadingSpinner";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const users = await getUsers();
        const foundUser = users.find((u) => u.id === parseInt(id));
        if (foundUser) {
          setUser(foundUser);
        } else {
          setError("User not found.");
        }
      } catch (error) {
        setError("Failed to load user details.");
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!user) {
    return (
      <div className="text-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{user.name} Details</h1>
      <div className="bg-white shadow-md rounded p-6">
        <p className="mb-2">
          <strong>Username:</strong> {user.username}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="mb-2">
          <strong>Phone:</strong> {user.phone}
        </p>
        <p className="mb-2">
          <strong>Address:</strong> {user.address.street}, {user.address.city}
        </p>
        <p className="mb-2">
          <strong>Website:</strong>{" "}
          <a
            href={`http://${user.website}`}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.website}
          </a>
        </p>
        <p className="mb-2">
          <strong>Company:</strong> {user.company.name}
        </p>
        <Link
          to="/"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Back to Users
        </Link>
      </div>
    </div>
  );
};

export default UserDetail;

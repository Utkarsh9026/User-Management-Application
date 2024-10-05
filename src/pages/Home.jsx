import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import UserTable from "../components/UserTable";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load users.");
        setLoading(false);
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  // Show loading spinner while data is being fetched
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return <UserTable users={users} setUsers={setUsers} />;
};

export default Home;

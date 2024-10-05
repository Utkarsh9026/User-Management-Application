import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import UserDetail from "../pages/UserDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:id" element={<UserDetail />} />
    </Routes>
  );
};

export default AppRoutes;

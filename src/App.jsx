import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/Approutes";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
        <h1 className="text-center text-[30px] font-bold text-white pt-4 bg-gradient-to-b from-black to-transparent">
          User Management Application
        </h1>
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;

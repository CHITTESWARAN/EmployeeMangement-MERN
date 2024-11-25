import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import IndexPage from "./components/IndexPage";
import UserContent from "./UserContent";
import CreateForm from "./components/CreateForm";
import EmployeeLists from "./components/EmployeeLists";

function App() {
  return (
    <UserContent>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/create" element={<CreateForm />} />
          <Route path="/EmployeeList" element={<EmployeeLists />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<div>Page not found</div>} /> {/* Fallback */}
        </Routes>
      </div>
    </UserContent>
  );
}

export default App;

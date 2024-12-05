import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import IndexPage from "./components/IndexPage";
import CreateForm from "./components/CreateForm";
import EmployeeLists from "./components/EmployeeLists";
import { UserContext } from './components/UserContent';
import { useContext } from 'react';
import UserContent from './components/UserContent';

function App() {
  return (
    <UserContent> 
      <AppContent />
    </UserContent>
  );
}

function AppContent() {
  const { login, setlogin } = useContext(UserContext); 
  console.log(login);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <Routes>
          {login ? (
            <>
              <Route path="/" element={<IndexPage />} />
              <Route path="/create" element={<CreateForm />} />
              <Route path="/EmployeeList" element={<EmployeeLists />} />
            </>
          ) : (
            ""
          )}

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<div>Login to view the Page</div>} /> {/* Fallback */}
        </Routes>
      </div>
    </>
  );
}

export default App;

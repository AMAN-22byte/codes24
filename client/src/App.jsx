import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import LoginPage from "./components/Loginkaro";
import RegisterPage from "./components/SignUp";
import Compiler_LCS from "./components/Problems/Compiler_LCS";
import SetProblem from "./components/Problems/SetProblem";
import Home from "./Pages/Home";
import Basecontest from "./components/Contest/Basecontest";
import Setcontest from "./components/Contest/SetContest";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/problems/:title"
            element={
              <PrivateRoute>
                <Compiler_LCS />
              </PrivateRoute>
            }
          />
          <Route
            path="/set"
            element={
              <PrivateRoute>
                <SetProblem />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
            }
          />
          <Route
            path="/contest"
            element={
              <PrivateRoute>
                <Basecontest />
              </PrivateRoute>
            }
          />
          <Route
            path="/contestset"
            element={
              <PrivateRoute>
                <Setcontest />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <Home />
                </>
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("expiry");

    if (token && expiry && Date.now() < parseInt(expiry)) {
      setUser({ token });
    } else {
      logout(); // Clear stale token
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    const expiryTime = Date.now() + 60 * 60 * 1000; // 1 hour in ms
    localStorage.setItem("token", token);
    localStorage.setItem("expiry", expiryTime.toString());
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

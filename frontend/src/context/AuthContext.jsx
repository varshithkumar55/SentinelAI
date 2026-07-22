import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const storedToken =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    const storedUser =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    if (storedToken && storedUser) {

      setToken(storedToken);

      setUser(JSON.parse(storedUser));

    }

    setLoading(false);

  }, []);

  const login = (
    authData,
    rememberMe
  ) => {

    const storage = rememberMe
      ? localStorage
      : sessionStorage;

    storage.setItem(
      "token",
      authData.access_token
    );
    storage.setItem(
      "refresh_token",
      authData.refresh_token
    );
    storage.setItem(
      "user",
      JSON.stringify(authData.user)
    );

    setToken(authData.access_token);

    setUser(authData.user);

  };

  const logout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");

  sessionStorage.removeItem("token");
  sessionStorage.removeItem("refresh_token");
  sessionStorage.removeItem("user");

  setToken(null);
  setUser(null);
};
  function updateUser(updatedUser) {

    setUser(updatedUser);

    if (localStorage.getItem("token")) {

      localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
      );

    }

    if (sessionStorage.getItem("token")) {

      sessionStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
      );

    }

  }
  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        updateUser,
        isAuthenticated: !!token,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth() {

  return useContext(AuthContext);

}
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { authApi, type LoginRequest, type RegisterRequest } from "../api/authApi";

export interface AuthContextType {
  token: string | null;
  role: "Admin" | "Trainee" | null;
  username: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<"Admin" | "Trainee" | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  //////////////////////////////////////////////////////
  // INIT FROM LOCAL STORAGE
  //////////////////////////////////////////////////////
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role") as "Admin" | "Trainee" | null;
    const storedUsername = localStorage.getItem("username");

    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
      setUsername(storedUsername);
    }

    setIsLoading(false);
  }, []);

  //////////////////////////////////////////////////////
  // LOGIN
  //////////////////////////////////////////////////////
  const login = async (credentials: LoginRequest) => {
    const data = await authApi.login(credentials);

    setToken(data.token);
    setRole(data.role);
    setUsername(data.username);

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("username", data.username);

    // 🔥 مهم: redirect بعد تسجيل الدخول
    if (data.role === "Admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  //////////////////////////////////////////////////////
  // REGISTER
  //////////////////////////////////////////////////////
  const register = async (data: RegisterRequest) => {
    await authApi.register(data);
    navigate("/"); // رجوع لصفحة login
  };

  //////////////////////////////////////////////////////
  // LOGOUT
  //////////////////////////////////////////////////////
  const logout = () => {
    setToken(null);
    setRole(null);
    setUsername(null);

    localStorage.clear();
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        username,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

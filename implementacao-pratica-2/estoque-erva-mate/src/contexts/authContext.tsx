import { PropsWithChildren, createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

interface UserInfo {
  id: string;
  email: string;
}

interface AuthContextProps {
  token: string;
  user: UserInfo | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ao iniciar o app, recuperar token e user salvos
    const loadStorageData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("@ErvaMate:token");
        const storedUser = await AsyncStorage.getItem("@ErvaMate:user");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Erro ao ler do AsyncStorage", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Endpoint do PocketBase para autenticar usuário na collection users
      const response = await api.post("/api/collections/users/auth-with-password", {
        identity: email,
        password: password,
      });

      const newToken = response.data.token;
      const newUser = response.data.record;

      setToken(newToken);
      setUser(newUser);

      await AsyncStorage.setItem("@ErvaMate:token", newToken);
      await AsyncStorage.setItem("@ErvaMate:user", JSON.stringify(newUser));
    } catch (error) {
      console.error("Erro no login", error);
      throw error; // Repassa o erro para a tela de login tratar
    }
  };

  const logout = async () => {
    setToken("");
    setUser(null);
    await AsyncStorage.removeItem("@ErvaMate:token");
    await AsyncStorage.removeItem("@ErvaMate:user");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthContextProvider");
  }
  return context;
}

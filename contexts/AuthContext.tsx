import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

interface AuthState {
  email: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: string }
  | { type: "LOGOUT" }
  | { type: "RESTORE_TOKEN"; payload: string | null };

const initialState: AuthState = {
  email: null,
  isAuthenticated: false,
  isLoading: true,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        email: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        email: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case "RESTORE_TOKEN":
      return {
        ...state,
        email: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const restoreToken = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem("user_email");
      dispatch({ type: "RESTORE_TOKEN", payload: savedEmail });
    } catch (error) {
      console.error("Error restoring token:", error);
      dispatch({ type: "RESTORE_TOKEN", payload: null });
    }
  };

  const login = async (email: string) => {
    try {
      await AsyncStorage.setItem("user_email", email);
      dispatch({ type: "LOGIN_SUCCESS", payload: email });
    } catch (error) {
      console.error("Error saving email:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user_email");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Error removing email:", error);
      throw error;
    }
  };

  useEffect(() => {
    restoreToken();
  }, []);

  const value: AuthContextType = {
    state,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context) {
    return context;
  }
  return {
    state: initialState,
    login: async () => {},
    logout: async () => {},
  };
};


import { useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer, initialState } from "./AuthReducer";

function getInitialState() {
  const savedState = localStorage.getItem("auth");

  if (savedState) {
    try {
      return JSON.parse(savedState);
    } catch (error) {
      console.log(error);
    }
  }

  return initialState;
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState, getInitialState);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(state));
  }, [state]);

  const register = (username, password) => {
    if (!username.trim() || !password) {
      return "Username dan password harus diisi!";
    }

    const existingAccount = state.accounts.find(
      (account) => account.username.toLowerCase() === username.trim().toLowerCase()
    );

    if (existingAccount) {
      return "Username sudah terdaftar!";
    }

    dispatch({
      type: "REGISTER",
      payload: {
        username: username.trim(),
        password,
        photo: ""
      }
    });

    return true;
  };

  const login = (username, password) => {
    if (!username.trim() || !password) {
      return "Username dan password harus diisi!";
    }

    const account = state.accounts.find(
      (account) => account.username.toLowerCase() === username.trim().toLowerCase()
    );

    if (!account) {
      return "Akun tidak ditemukan. Silakan register terlebih dahulu!";
    }

    if (account.password !== password) {
      return "Password salah!";
    }

    dispatch({
      type: "LOGIN",
      payload: {
        username: account.username,
        photo: account.photo || ""
      }
    });

    return true;
  };

  const updateProfile = (newUsername, newPassword, newPhoto) => {
    if (!newUsername.trim() || !newPassword) {
      return "Username dan password harus diisi!";
    }

    const existingAccount = state.accounts.find(
      (account) =>
        account.username.toLowerCase() === newUsername.trim().toLowerCase() &&
        account.username !== state.user.username
    );

    if (existingAccount) {
      return "Username sudah digunakan!";
    }

    const currentAccount = state.accounts.find(
      (account) => account.username === state.user.username
    );

    dispatch({
      type: "UPDATE_PROFILE",
      payload: {
        username: newUsername.trim(),
        password: newPassword,
        photo: newPhoto ?? currentAccount?.photo ?? ""
      }
    });

    return true;
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

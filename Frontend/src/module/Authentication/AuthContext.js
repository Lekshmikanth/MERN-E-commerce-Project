import { createContext, useState } from 'react';
import { loginUser } from "./authSlice";
import { useDispatch } from 'react-redux';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    const handleUserLogin = (res) => {
        dispatch(loginUser(res?.user));
    }
    return (
        <AuthContext.Provider value={{ user, setUser, handleUserLogin }}>
            {children}
        </AuthContext.Provider>
    );
};
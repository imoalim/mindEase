import { createContext, useContext, useState, useEffect } from "react";

const decodeJWT = (token) => {
    try {
        if (!token) throw new Error("Token is null or undefined.");
        const base64Url = token.split(".")[1];
        if (!base64Url) throw new Error("Token structure is invalid.");
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Failed to decode JWT:", e.message);
        return null;
    }
};


const isTokenExpired = (decodedToken) => {
    if (!decodedToken || !decodedToken.exp) return true;
    const expirationTime = decodedToken.exp * 1000;
    return Date.now() > expirationTime;
};

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            const decoded = decodeJWT(storedToken);
            if (decoded && !isTokenExpired(decoded)) {
                return { ...decoded, token: storedToken };
            }
            localStorage.removeItem("token");
        }
        return null;
    });

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            const decoded = decodeJWT(storedToken);
            if (!decoded || isTokenExpired(decoded)) {
                localStorage.removeItem("token");
                setUser(null);
            }
        }
        if (user) {
            localStorage.setItem("token", user.token);
        } else {
            localStorage.removeItem("token");
        }
    }, [user]);

    const login = (token) => {
        const decodedUser = decodeJWT(token);
        if (decodedUser && !isTokenExpired(decodedUser)) {
            setUser({ ...decodedUser, token });
        } else {
            console.error("Token expired or invalid.");
        }
    };

    const logout = () => {
        setUser(null);
    };

    const isAuthenticated = !!user;

    const isVerified = user?.verified || false;


    return (
        <AuthContext.Provider value={{ isAuthenticated, isVerified, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

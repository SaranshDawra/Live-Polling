import { useState, useEffect } from "react";

export const useAuth = () => {
    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState(false);

    const login = (token, userId) => {
        setToken(token);
        setUserId(userId);
        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId: userId,
                token: token,
            })
        );
    };

    const logout = () => {
        setToken(false);
        setUserId(null);
        localStorage.removeItem("userData");
    };

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"));

        if (storedData && storedData.token) {
            login(storedData.token, storedData.userId);
        }
    }, []);

    return { token, userId, login, logout };
};

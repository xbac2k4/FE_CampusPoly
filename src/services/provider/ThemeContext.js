import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(true);

    // lấy giá trị theme từ AsyncStorage
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem('theme');
                if (storedTheme !== null) {
                    setTheme(JSON.parse(storedTheme));
                }
            } catch (error) {
                console.error('Failed to load theme:', error);
            }
        };

        loadTheme();
    }, []);
    
    // thay đổi theme và lưu vào AsyncStorage
    const toggleTheme = async () => {
        try {
            const newTheme = !theme;
            setTheme(newTheme);
            await AsyncStorage.setItem('theme', JSON.stringify(newTheme));
        } catch (error) {
            console.error('Failed to save theme:', error);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
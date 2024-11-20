// UserContext.js
import React, { createContext, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Google_Client_ID } from '@env';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    GoogleSignin.configure({
        webClientId: Google_Client_ID,
        scopes: [
            'profile',
            'email',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/user.birthday.read',
            'https://www.googleapis.com/auth/user.gender.read',
        ],
    })

    return (
        <UserContext.Provider value={{ user, setUser, GoogleSignin }}>
            {children}
        </UserContext.Provider>
    );
};

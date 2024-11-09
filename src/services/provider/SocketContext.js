// SocketContext.js
import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();  // Đảm bảo sử dụng createContext

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    const connectSocket = (userInfo) => {
        const newSocket = io('http://10.0.2.2:3000', {
            query: { userId: userInfo._id },
        });

        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log(`Kết nối thành công với socket ID: ${newSocket.id}`);
            newSocket.emit('user_login', userInfo);
        });

        newSocket.on('disconnect', () => {
            console.log(`${userInfo.full_name} đã đăng xuất`);
        });
    };

    const disconnectSocket = () => {
        if (socket) {
            socket.disconnect();
            setSocket(null);
        }
    };

    useEffect(() => {
        return () => {
            disconnectSocket();
        };
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket, connectSocket, disconnectSocket }}>
            {children}
        </SocketContext.Provider>
    );
};

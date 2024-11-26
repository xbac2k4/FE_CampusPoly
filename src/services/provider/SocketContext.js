// SocketContext.js
import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();  // Đảm bảo sử dụng createContext

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [usersOnline, setUsersOnline] = useState(null);

    const connectSocket = (userInfo) => {
        const newSocket = io('http://10.0.2.2:3000', {
            query: { userId: userInfo._id },
        });

        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log(`Kết nối thành công với socket ID: ${newSocket.id}`);
            newSocket.emit('user_login', userInfo);
        });
        newSocket.on('update_user_list', (data) => {
            // console.log(data);
            setUsersOnline(data)
            // newSocket.emit('user_online', data);
        });

        newSocket.on('new_notification', async (data) => {
            console.log('Nhận được thông báo mới:', data);
        });

        newSocket.on('disconnect', () => {
            newSocket.emit('get_users_online');
            console.log(`${userInfo.full_name} đã đăng xuất`);
        });
    };

    const disconnectSocket = () => {
        if (socket) {
            socket.disconnect();
            setSocket(null);
        }
    };

    const sendMessageSocket = (newMessage) => {
        // console.log(newMessage);
        if (socket) {
            socket.emit('send_message', newMessage);
        }
    };
    const sendNotifySocket = (sender_name, sender_id, body, receiver_id, type, post_id) => {
        // console.log(sender_name + ' - ' + receiver_id);
        if (socket) {
            socket.emit('send_notify', { sender_name, sender_id, body, receiver_id, type, post_id });
        }
    };
    // const notifyLikePostSocket = (sender_name, sender_id, body, receiver_id, type) => {
    //     // console.log(sender_name + ' - ' + receiver_id);
    //     if (socket) {
    //         socket.emit('notify_add_friend', { sender_name, sender_id, body, receiver_id, type });
    //     }
    // };

    // const getNotifySocket = () => {
    //     if (socket) {
    //         socket.on('new_message', (data) => {
    //             const { sender_id, content } = data;
    //             console.log('Nhận được tin nhắn mới từ:', sender_id);
    //             console.log('Nội dung tin nhắn:', content);
    //             // socket.emit('refeshMessage', data);
    //             // console.log(data);

    //             // Xử lý tin nhắn mới, ví dụ: cập nhật vào danh sách tin nhắn hoặc thông báo
    //         });
    //     }
    // };

    useEffect(() => {
        return () => {
            disconnectSocket();
        };
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket, connectSocket, disconnectSocket, sendMessageSocket, usersOnline, sendNotifySocket }}>
            {children}
        </SocketContext.Provider>
    );
};

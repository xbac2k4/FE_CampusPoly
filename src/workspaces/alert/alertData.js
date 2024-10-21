import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [
    {
      title: 'TODAY',
      data: [
        {
          id: 1,
          user: 'Sofia, John and +19 others',
          action: 'liked your post',
          time: '10m ago',
          icon: 'like',  // Thay vì lưu đường dẫn, chỉ lưu tên kiểu icon
        },
        {
          id: 2,
          user: 'Rebecca, Daisy and +11 others',
          action: 'liked your post',
          time: '30m ago',
          icon: 'like',
        },
      ],
    },
    {
      title: 'YESTERDAY',
      data: [
        {
          id: 3,
          user: 'Katrina, Denver and +2 others',
          action: 'commented on your post',
          time: '1d ago',
          icon: 'comment',
        },
        {
          id: 4,
          user: 'Savannah Wilson',
          action: 'is celebrating birthday today. Drop a wish! 🎉',
          time: '1d ago',
          icon: 'cake',
        },
      ],
    },
  ],
};

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAllAsRead: (state) => {
      // Giả sử thêm logic để đánh dấu tất cả thông báo là đã đọc
      state.notifications = state.notifications.map((section) => ({
        ...section,
        data: section.data.map((notification) => ({
          ...notification,
          read: true,
        })),
      }));
    },
  },
});

// Export các action để có thể gọi từ component
export const { markAllAsRead } = notificationSlice.actions;

export default notificationSlice.reducer;

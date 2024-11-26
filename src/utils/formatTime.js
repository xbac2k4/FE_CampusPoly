export const timeAgo = (date) => {
    if (!date || isNaN(new Date(date).getTime())) {
        return ""; // Trả về giá trị mặc định nếu `date` không hợp lệ
    }

    const now = new Date();
    const postDate = new Date(date);
    const diff = Math.floor((now - postDate) / 1000); // Chênh lệch thời gian tính bằng giây

    if (diff < 60) return "Vừa xong"; // Đề phòng chênh lệch âm

    // if (diff < 60) return `${diff} giây`;
    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes} phút`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} giờ`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} ngày`;
    const weeks = Math.floor(days / 7);
    return `${weeks} tuần`;
};
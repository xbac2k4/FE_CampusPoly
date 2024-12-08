import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ToastAndroid  } from 'react-native';
import styles from '../../assets/style/PostStyle';
import { ADD_REPORT } from '../../services/ApiConfig';
import { UserContext } from '../../services/provider/UseContext';
import NotificationModal from '../Notification/NotificationModal'; // Import NotificationModal

const ReportComponent = ({ postId, onReportSuccess }) => {
    const [reportType, setReportType] = useState(null);  // Lưu loại báo cáo người dùng đã chọn
    const [modalVisible, setModalVisible] = useState(false); // State để điều khiển modal
    const [pendingReportId, setPendingReportId] = useState(null); // Lưu trữ báo cáo đang chờ gửi
    const [reportSuccess, setReportSuccess] = useState(false); // State để kiểm tra kết quả gửi báo cáo

    // ID báo cáo dưới dạng MongoDB ObjectId (chuỗi)
    const reportIds = {
        offensive: '671fb94c0c0eb452e36d56eb',
        untrue: '671fc69381e513ef5419685b',
        violent: '671fc6ae81e513ef5419685c',
        reactionary: '671fc6d281e513ef5419685d',
        racism: '671fc6e681e513ef5419685e',
    };

    const { user } = useContext(UserContext);
    if (user && user._id) {
        console.log('ID người dùng hiện tại:', user._id);
    }

    // Hàm gửi báo cáo
    const sendReport = async () => {
        if (reportSuccess) {
            return; // Không làm gì nếu báo cáo đã gửi thành công
        }
        try {
            if (!user._id || !postId || !reportType) {
                console.error('Thiếu thông tin để gửi báo cáo', user._id, postId, reportType);
                return;
            }
            const payload = {
                reported_by_user_id: user._id,  // Lấy ID người dùng từ context
                post_id: postId,
                report_type_id: reportType,
            };
            // Gửi yêu cầu báo cáo đến server
            const response = await fetch(ADD_REPORT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setReportSuccess(true);
                onReportSuccess(); // Gọi hàm callback khi báo cáo thành công
                setModalVisible(false); // Đóng modal sau khi báo cáo thành công
            } else {
                ToastAndroid.show( "Bạn đã báo cáo bài viết này rôi", ToastAndroid.SHORT);
                // throw new Error('Lỗi khi gửi báo cáo');
            }
        } catch (error) {
            console.error('Error sending report:', error);
        }
    };

    const handleConfirm = () => {
        if (!reportSuccess) {
            sendReport(); // Gửi báo cáo khi bấm Confirm
        } else {
            setModalVisible(false); // Nếu báo cáo đã thành công, chỉ đóng modal
        }
    };

    const handleCancel = () => {
        setModalVisible(false); // Đóng modal khi hủy
    };

    const handleReportPress = (reportId) => {
        setReportType(reportId);  // Lưu lại loại báo cáo người dùng chọn
        setPendingReportId(reportId); // Lưu lại báo cáo đang chờ gửi
        setModalVisible(true); // Hiển thị modal xác nhận
    };

    return (
        <View style={styles.inner}>
            {/* Hiển thị NotificationModal */}
            <NotificationModal
                visible={modalVisible}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                message="Bạn có chắc với lực chọn này không?"
            />

            {/* Các nút báo cáo */}
            <TouchableOpacity
                onPress={() => handleReportPress(reportIds.offensive)}
                style={styles.reporttextcontainer}>
                <Image
                    source={require('../../assets/images/report.png')}
                    style={{ marginTop: '5.5%', width: 20, height: 20, marginRight: 4 }}
                />
                <Text style={styles.textOne}>Bài viết xúc phạm người dùng khác</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => handleReportPress(reportIds.untrue)}
                style={styles.reporttextcontainer}>
                <Image
                    source={require('../../assets/images/untrue.png')}
                    style={{ marginTop: '5.5%', width: 20, height: 20, marginRight: 4 }}
                />
                <Text style={styles.textOne}>Bài viết sai sự thật</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => handleReportPress(reportIds.violent)}
                style={styles.reporttextcontainer}>
                <Image
                    source={require('../../assets/images/violet.png')}
                    style={{ marginTop: '5.5%', width: 20, height: 20, marginRight: 4 }}
                />
                <Text style={styles.textOne}>Bài viết mang tính bạo lực - kích động</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => handleReportPress(reportIds.reactionary)}
                style={styles.reporttextcontainer}>
                <Image
                    source={require('../../assets/images/rectionary.png')}
                    style={{ marginTop: '5.5%', width: 20, height: 20, marginRight: 4 }}
                />
                <Text style={styles.textOne}>Bài viết mang tính phản động</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => handleReportPress(reportIds.racism)}
                style={styles.reporttextcontainer}>
                <Image
                    source={require('../../assets/images/racsim.png')}
                    style={{ marginTop: '5.5%', width: 20, height: 20, marginRight: 4 }}
                />
                <Text style={styles.textOne}>Bài viết mang tính phân biệt chủng tộc</Text>
            </TouchableOpacity>

        </View>
    );
};

export default ReportComponent;

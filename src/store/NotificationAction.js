import { useSetRecoilState } from "recoil";
import { notificationListState } from "./NotificationState";

export const addToNotificationList = async (notification) => {
    console.log('notification', notification);
    const setNotificationList = useSetRecoilState(notificationListState);
    
    await setNotificationList((oldList) => [...oldList, notification]);
    console.log('notification2', notification);

  };
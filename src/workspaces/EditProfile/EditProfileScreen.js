import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import ProfileInput from '../../components/EditProfile/ProfileInput';
import ImageOptionsSheet from '../../components/EditProfile/ImageOptionsSheet';
import UnsavedChangesModal from '../../components/EditProfile/UnsavedChangesModal';
import GenderPicker from '../../components/EditProfile/GenderPicker';
import BirthdayPicker from '../../components/EditProfile/BirthdayPicker';
import styles from './styles';
import Screens from '../../navigation/Screens';
import ImageCropPicker from 'react-native-image-crop-picker';
import { PUT_UPDATE_USER } from '../../services/ApiConfig';
import { ThemeContext } from '../../services/provider/ThemeContext';
import Colors from '../../constants/Color';

const EditProfileScreen = () => {
  const { theme } = useContext(ThemeContext);
  const route = useRoute();
  const user = route?.params?.user;

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const profileSheetRef = useRef(null);
  const backgroundSheetRef = useRef(null);

  const [name, setName] = useState(user.full_name);
  const [bio, setBio] = useState(user.bio);
  const [gender, setGender] = useState(user.sex);
  const [birthday, setBirthday] = useState(user.birthday ? new Date(user.birthday) : null);
  // const defaultProfileImage = Image.resolveAssetSource(require('../../assets/images/default-profile.png')).uri;
  // const defaultBackgroundImage = Image.resolveAssetSource(require('../../assets/images/default-bg.png')).uri;
  const [loadImage, setLoadImage] = useState(false);

  const [profileImage, setProfileImage] = useState({
    uri: user.avatar
  });
  const [backgroundImage, setBackgroundImage] = useState({ uri: user.background });
  const [isProfileImageChanged, setIsProfileImageChanged] = useState(false);

  const [isChanged, setIsChanged] = useState(false);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const originalData = useRef({
    name: user.full_name,
    bio: user.bio,
    gender: user.sex,
    birthday: user.birthday ? new Date(user.birthday) : null,
    profileImage: profileImage.uri,
    backgroundImage: backgroundImage.uri,
  });

  useEffect(() => {
    // console.log(birthday);

    const hasChanges =
      name !== originalData.current.name ||
      bio !== originalData.current.bio ||
      gender !== originalData.current.gender ||
      (birthday && birthday.toISOString()) !== (originalData.current.birthday && originalData.current.birthday.toISOString());
    // profileImage.uri !== originalData.current.profileImage ||
    // backgroundImage.uri !== originalData.current.backgroundImage;

    setIsChanged(hasChanges);
  }, [name, bio, gender, birthday]);

  useEffect(() => {
    const backAction = e => {
      if (isChanged && !isSaved) {
        e.preventDefault();
        setShowUnsavedChangesModal(true);
      }
    };
    navigation.addListener('beforeRemove', backAction);
    return () => navigation.removeListener('beforeRemove', backAction);
  }, [isChanged, isSaved, navigation]);

  const handleDiscardChanges = () => {
    setShowUnsavedChangesModal(false);
    setIsChanged(false);
    setIsSaved(false);
    setTimeout(() => {
      navigation.goBack();
    }, 0);
  };

  const validateName = text => {
    if (!text) {
      setErrorMessage('Tên là bắt buộc.');
    } else {
      setErrorMessage('');
    }
  };

  // Điều kiện kiểm tra trước khi gửi ảnh đại diện lên API
  const handleSave = async () => {
    if (!name?.trim()) {
      setErrorMessage('Tên là bắt buộc.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('full_name', name);
    formData.append('bio', bio);
    formData.append('sex', gender);
    formData.append('birthday', birthday ? birthday.toISOString() : '');

    try {
      await FetchUpdateUser(formData);

      setIsSaved(true);
      setIsChanged(false); // Đặt lại isChanged về false khi lưu thành công

      navigation.navigate(Screens.Profile, { refresh: true });
    } catch (error) {
      console.error('Lỗi khi lưu hồ sơ:', error);
      setErrorMessage('Không lưu được hồ sơ.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearBio = () => setBio('');

  // Cập nhật profileImage khi người dùng chọn ảnh mới
  const handleProfileImageEdit = (type) => {
    if (type === 'upload') {
      ImageCropPicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
      })
        .then(async (image) => {
          setLoadImage(true); // Bắt đầu tải ảnh
          try {
            // Gọi uploadImage để mô phỏng việc tải ảnh lên máy chủ
            await uploadImage(image.path);

            // Tạo formData để gửi ảnh lên API
            const formData = new FormData();
            formData.append('avatar', {
              uri: image.path,
              name: 'avatar.jpg',
              type: 'image/jpeg',
            });

            // Gọi API để cập nhật ảnh đại diện
            await FetchUpdateUser(formData);

            // Cập nhật ảnh đại diện mới
            setProfileImage({ uri: image.path });
          } catch (error) {
            console.error('Lỗi khi tải ảnh lên:', error);
          } finally {
            setLoadImage(false); // Kết thúc tải ảnh
            profileSheetRef.current.close(); // Đóng action sheet
          }
        })
        .catch((error) => {
          if (error.code === 'E_PICKER_CANCELLED') {
            console.log('Người dùng đã hủy chọn ảnh');
          } else {
            console.error('Lỗi khi chọn ảnh:', error);
          }
        });
    } else {
      setDeleteTarget('profile');
      setShowDeleteModal(true);
    }
  };

  const handleBackgroundImageEdit = (type) => {
    if (type === 'upload') {
      ImageCropPicker.openPicker({
        width: 500,
        height: 300,
        cropping: true,
      })
        .then(async (image) => {
          setLoadImage(true); // Bắt đầu tải ảnh

          try {
            // Gọi uploadImage để mô phỏng việc tải ảnh lên máy chủ
            await uploadImage(image.path);

            // Tạo formData để gửi ảnh lên API
            const formData = new FormData();
            formData.append('avatar', {
              uri: image.path,
              name: 'background.jpg',
              type: 'image/jpeg',
            });
            // Gọi API để cập nhật ảnh đại diện
            await FetchUpdateUser(formData);

            // Cập nhật ảnh đại diện mới
            setBackgroundImage({ uri: image.path });
          } catch (error) {
            console.error('Lỗi khi tải ảnh lên:', error);
          } finally {
            setLoadImage(false); // Kết thúc tải ảnh
            backgroundSheetRef.current.close(); // Đóng action sheet
          }
        })
        .catch((error) => {
          if (error.code === 'E_PICKER_CANCELLED') {
            console.log('Người dùng đã hủy chọn ảnh');
          } else {
            console.error('Lỗi khi chọn ảnh:', error);
          }
        });
    } else {
      setDeleteTarget('background');
      setShowDeleteModal(true);
    }
  };


  const uploadImage = async (images) => {
    // Giả lập việc tải ảnh lên trong 2 giây
    setLoadImage(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Images load successfully!");
        setLoadImage(false);
        // setLengthImage(0);
        resolve();
      }, 2000); // Giả lập thời gian tải lên
    });
  };

  const FetchUpdateUser = async (formData) => {
    const response = await fetch(`${PUT_UPDATE_USER}${user._id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    return response.json();
  };

  return (
    <SafeAreaView style={[styles.container,{
      backgroundColor : theme? '#181A1C' : Colors.light
    }]}>
      {loadImage && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <View style={[styles.header,{
        backgroundColor : theme? '#181A1C' : '#fff'
      }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.headerButton,{
            color : theme? '#fff' : Colors.second
          }]}>✖</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle,{
          color : theme? '#fff' : '#000'
        }]}>Chỉnh sửa trang cá nhân</Text>

        <TouchableOpacity onPress={handleSave} disabled={!isChanged || !name?.trim() || isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={[styles.headerButton, isChanged && name?.trim() && styles.headerButtonActive]}>
              Lưu
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Background */}
      <View style={styles.backgroundContainer}>
        <Image source={backgroundImage} style={styles.backgroundImage} />
        <TouchableOpacity style={styles.iconEditBackground} onPress={() => backgroundSheetRef.current.open()}>
          <Icon name="pencil" size={20} color={theme? '#727477' : '#fff'} />
        </TouchableOpacity>
      </View>

      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image source={profileImage} style={styles.profileImage} />
        <TouchableOpacity style={styles.iconEditProfile} onPress={() => profileSheetRef.current.open()}>
          <Icon name="pencil" size={20} color={theme? '#727477' : '#fff'}  />
        </TouchableOpacity>
      </View>

      {/* Inputs */}
      <View style={[styles.inputWrapper,{
        backgroundColor : theme? '#000' : '#fff', elevation : theme?0:5
      }]}>
        <ProfileInput label="Tên hiển thị" value={name} onChangeText={text => {
          setName(text);
          validateName(text);
        }} clearText={() => { setName(''); validateName(''); }} maxLength={50} errorMessage={errorMessage} />
        <ProfileInput label="Tiểu sử" value={bio} onChangeText={setBio} clearText={clearBio} maxLength={50} />
        <GenderPicker label="Giới tính" selectedGender={gender} onGenderChange={setGender} />
        <BirthdayPicker
          label="Ngày sinh"
          selectedDate={birthday}
          onDateChange={(date) => setBirthday(date)}
        />
      </View>

      {/* Image Options */}
      <ImageOptionsSheet
        ref={profileSheetRef}
        onUpload={() => handleProfileImageEdit('upload')}
        onDelete={() => handleProfileImageEdit('delete')}
        canDelete={profileImage.uri} // Điều kiện cho ảnh đại diện
      />

      <ImageOptionsSheet
        ref={backgroundSheetRef}
        onUpload={() => handleBackgroundImageEdit('upload')}
        onDelete={() => handleBackgroundImageEdit('delete')}
        canDelete={backgroundImage.uri} // Điều kiện cho ảnh nền
      />

      <UnsavedChangesModal
        visible={showUnsavedChangesModal}
        onDiscard={handleDiscardChanges}
        onCancel={() => setShowUnsavedChangesModal(false)}
      />
    </SafeAreaView>
  );
};

export default EditProfileScreen;
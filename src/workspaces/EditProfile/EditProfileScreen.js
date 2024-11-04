import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import ProfileInput from '../../components/EditProfile/ProfileInput';
import ImageOptionsSheet from '../../components/EditProfile/ImageOptionsSheet';
import DeleteConfirmationModal from '../../components/EditProfile/DeleteConfirmationModal';
import UnsavedChangesModal from '../../components/EditProfile/UnsavedChangesModal';
import GenderPicker from '../../components/EditProfile/GenderPicker';
import BirthdayPicker from '../../components/EditProfile/BirthdayPicker';
import styles from './styles';
import Screens from '../../navigation/Screens';

const EditProfileScreen = () => {
  const route = useRoute();
  const user = route?.params?.user;

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const profileSheetRef = useRef(null);
  const backgroundSheetRef = useRef(null);

  const [name, setName] = useState(user.full_name);
  const [bio, setBio] = useState(user.bio);
  const [gender, setGender] = useState(user.sex);
  const [birthday, setBirthday] = useState(user.date_of_birth ? new Date(user.date_of_birth) : null);
  const defaultProfileImage = Image.resolveAssetSource(require('../../assets/images/default-profile.png')).uri;
  const defaultBackgroundImage = Image.resolveAssetSource(require('../../assets/images/default-bg.png')).uri;
  const [profileImage, setProfileImage] = useState({ uri: user.avatar ? user.avatar.replace('localhost', '10.0.2.2') : defaultProfileImage });
  const [backgroundImage, setBackgroundImage] = useState({ uri: user.background ? user.background.replace('localhost', '10.0.2.2') : defaultBackgroundImage });

  const [isProfileImageChanged, setIsProfileImageChanged] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const originalData = useRef({
    name: user.full_name,
    bio: user.bio,
    gender: user.sex,
    birthday: user.date_of_birth ? new Date(user.date_of_birth) : null,
    profileImage: profileImage.uri,
    backgroundImage: backgroundImage.uri,
  });

  useEffect(() => {
    const hasChanges =
      name !== originalData.current.name ||
      bio !== originalData.current.bio ||
      gender !== originalData.current.gender ||
      (birthday && birthday.toISOString()) !== (originalData.current.birthday && originalData.current.birthday.toISOString()) ||
      profileImage.uri !== originalData.current.profileImage ||
      backgroundImage.uri !== originalData.current.backgroundImage;

    setIsChanged(hasChanges);
  }, [name, bio, gender, birthday, profileImage, backgroundImage]);

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
      setErrorMessage('Name is required.');
    } else {
      setErrorMessage('');
    }
  };

  const handleSave = async () => {
    if (!name?.trim()) {
      setErrorMessage('Name is required!');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('full_name', name);
    formData.append('bio', bio);
    formData.append('sex', gender);
    formData.append('date_of_birth', birthday ? birthday.toISOString() : '');

    console.log('FormData', formData);

    // Append only if the profile image has changed and it's not the default image
    if (profileImage.uri !== defaultProfileImage) {
      formData.append('avatar', {
        uri: profileImage.uri,
        name: 'avatar.jpg',
        type: 'image/jpeg',
      });
    }

    try {
      const response = await fetch(`http://10.0.2.2:3000/api/v1/users/update-user/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      console.log('API response:', updatedUser);

      setIsLoading(false);
      setIsSaved(true);
      setErrorMessage('');

      // Gửi dữ liệu đã cập nhật trở lại ProfileScreen
      navigation.navigate(Screens.Profile, {
        userId: user._id,
        updatedUser: {
          ...user,
          full_name: name,
          bio,
          sex: gender,
          date_of_birth: birthday ? birthday.toISOString() : user.date_of_birth.toString(),
          avatar: profileImage.uri !== defaultProfileImage ? profileImage.uri.replace('localhost', '10.0.2.2') : '',
        },
      });

      setIsChanged(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrorMessage('Failed to save profile.');
      setIsLoading(false);
    }
  };


  const clearBio = () => setBio('');

  const handleProfileImageEdit = type => {
    if (type === 'upload') {
      launchImageLibrary({ mediaType: 'photo' }, response => {
        if (!response.didCancel && !response.error && response.assets) {
          const source = { uri: response.assets[0].uri };
          setProfileImage(source);
          profileSheetRef.current.close();
        }
      });
    } else {
      setDeleteTarget('profile');
      setShowDeleteModal(true);
    }
  };

  const handleBackgroundImageEdit = type => {
    if (type === 'upload') {
      launchImageLibrary({ mediaType: 'photo' }, response => {
        if (!response.didCancel && !response.error && response.assets) {
          const source = { uri: response.assets[0].uri };
          setBackgroundImage(source);
          backgroundSheetRef.current.close();
        }
      });
    } else {
      setDeleteTarget('background');
      setShowDeleteModal(true);
    }
  };

  const handleDeleteImage = () => {
    if (deleteTarget === 'profile') {
      setProfileImage({ uri: defaultProfileImage }); // Set the state with the default image URI
    } else if (deleteTarget === 'background') {
      setBackgroundImage({ uri: defaultBackgroundImage }); // Set the state with the default image URI
    }
    setShowDeleteModal(false);
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerButton}>✖</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>

        <TouchableOpacity onPress={handleSave} disabled={!isChanged || !name?.trim() || isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={[styles.headerButton, isChanged && name?.trim() && styles.headerButtonActive]}>
              Save
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Background */}
      <View style={styles.backgroundContainer}>
        <Image source={backgroundImage} style={styles.backgroundImage} />
        <TouchableOpacity style={styles.iconEditBackground} onPress={() => backgroundSheetRef.current.open()}>
          <Icon name="pencil" size={20} color="#727477" />
        </TouchableOpacity>
      </View>

      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image source={profileImage} style={styles.profileImage} />
        <TouchableOpacity style={styles.iconEditProfile} onPress={() => profileSheetRef.current.open()}>
          <Icon name="pencil" size={20} color="#727477" />
        </TouchableOpacity>
      </View>

      {/* Inputs */}
      <View style={styles.inputWrapper}>
        <ProfileInput label="Name" value={name} onChangeText={text => {
          setName(text);
          validateName(text);
        }} clearText={() => { setName(''); validateName(''); }} maxLength={50} errorMessage={errorMessage} />
        <ProfileInput label="Bio" value={bio} onChangeText={setBio} clearText={clearBio} maxLength={50} />
        <GenderPicker selectedGender={gender} onGenderChange={setGender} />
        <BirthdayPicker
          selectedDate={birthday}
          onDateChange={(date) => setBirthday(date)}
        />
      </View>

      {/* Image Options */}
      <ImageOptionsSheet
        ref={profileSheetRef}
        onUpload={() => handleProfileImageEdit('upload')}
        onDelete={() => handleProfileImageEdit('delete')}
        canDelete={profileImage.uri !== defaultProfileImage} // Điều kiện cho ảnh đại diện
      />

      <ImageOptionsSheet
        ref={backgroundSheetRef}
        onUpload={() => handleBackgroundImageEdit('upload')}
        onDelete={() => handleBackgroundImageEdit('delete')}
        canDelete={backgroundImage.uri !== defaultBackgroundImage} // Điều kiện cho ảnh nền
      />

      {/* Modals */}
      <DeleteConfirmationModal
        visible={showDeleteModal}
        onDelete={handleDeleteImage}
        onCancel={() => setShowDeleteModal(false)}
      />
      <UnsavedChangesModal
        visible={showUnsavedChangesModal}
        onDiscard={handleDiscardChanges}
        onCancel={() => setShowUnsavedChangesModal(false)}
      />
    </View>
  );
};

export default EditProfileScreen;
import React, {useRef, useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchImageLibrary} from 'react-native-image-picker';
import ProfileInput from '../../components/EditProfile/ProfileInput';
import ImageOptionsSheet from '../../components/EditProfile/ImageOptionsSheet';
import DeleteConfirmationModal from '../../components/EditProfile/DeleteConfirmationModal';
import UnsavedChangesModal from '../../components/EditProfile/UnsavedChangesModal';
import GenderPicker from '../../components/EditProfile/GenderPicker';
import BirthdayPicker from '../../components/EditProfile/BirthdayPicker';
import styles from './styles';

const EditProfileScreen = ({route, navigation}) => {
  const {user} = route.params || {};
  const profileSheetRef = useRef(null);
  const backgroundSheetRef = useRef(null);

  const [name, setName] = useState(user ? user.name : '');
  const [bio, setBio] = useState(user ? user.bio : '');
  const [gender, setGender] = useState(user ? user.gender : '');
  const [birthday, setBirthday] = useState(user ? user.birthday : null);
  const [profileImage, setProfileImage] = useState(
    user ? user.profileImage : require('../../assets/images/default-profile.png')
  );
  const [backgroundImage, setBackgroundImage] = useState(
    user ? user.backgroundImage : require('../../assets/images/default-bg.png')
  );
  const [isChanged, setIsChanged] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const originalData = {
    name: user ? user.name : '',
    bio: user ? user.bio : '',
    gender: user ? user.gender : '',
    birthday: user ? user.birthday : '',
    profileImage: user ? user.profileImage : require('../../assets/images/default-profile.png'),
    backgroundImage: user ? user.backgroundImage : require('../../assets/images/default-bg.png'),
  };

  useEffect(() => {
    const hasChanges =
      name !== originalData.name ||
      bio !== originalData.bio ||
      gender !== originalData.gender ||
      birthday !== originalData.birthday ||
      profileImage !== originalData.profileImage ||
      backgroundImage !== originalData.backgroundImage;
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

  const handleSave = () => {
    if (!name.trim()) {
      setErrorMessage('Name is required!');
      return;
    }
    console.log('Profile updated:', {
      name,
      bio,
      gender,
      birthday: birthday ? birthday.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }) : null,
      profileImage,
      backgroundImage,
    });
    setIsSaved(true);
    setErrorMessage('');
    setTimeout(() => {
      setIsChanged(false);
      navigation.goBack();
    }, 100);
  };

  const clearName = () => setName('');
  const clearBio = () => setBio('');

  const handleProfileImageEdit = type => {
    if (type === 'upload') {
      launchImageLibrary({mediaType: 'photo'}, response => {
        if (!response.didCancel && !response.error) {
          const source = {uri: response.assets[0].uri};
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
      launchImageLibrary({mediaType: 'photo'}, response => {
        if (!response.didCancel && !response.error) {
          const source = {uri: response.assets[0].uri};
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
      setProfileImage(require('../../assets/images/default-profile.png'));
    } else if (deleteTarget === 'background') {
      setBackgroundImage(require('../../assets/images/default-bg.png'));
    }
    setShowDeleteModal(false);
    if (deleteTarget === 'profile') {
      profileSheetRef.current.close();
    } else if (deleteTarget === 'background') {
      backgroundSheetRef.current.close();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerButton}>✖</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity
          onPress={handleSave}
          disabled={!isChanged || !name.trim()}>
          <Text style={[styles.headerButton, isChanged && name.trim() && styles.headerButtonActive]}>
            Save
          </Text>
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
        }} clearText={() => {setName(''); validateName('');}} maxLength={50} errorMessage={errorMessage} />
        <ProfileInput label="Bio" value={bio} onChangeText={setBio} clearText={clearBio} maxLength={50} />
        <GenderPicker selectedGender={gender} onGenderChange={setGender} />
        <BirthdayPicker selectedDate={birthday} onDateChange={setBirthday} />
      </View>

      {/* Image Options */}
      <ImageOptionsSheet ref={profileSheetRef} onUpload={() => handleProfileImageEdit('upload')}
        onDelete={() => handleProfileImageEdit('delete')}
        canDelete={profileImage !== require('../../assets/images/default-profile.png')} />
      <ImageOptionsSheet ref={backgroundSheetRef} onUpload={() => handleBackgroundImageEdit('upload')}
        onDelete={() => handleBackgroundImageEdit('delete')}
        canDelete={backgroundImage !== require('../../assets/images/default-bg.png')} />

      {/* Modals */}
      <DeleteConfirmationModal visible={showDeleteModal} onCancel={() => setShowDeleteModal(false)} onDelete={handleDeleteImage} />
      <UnsavedChangesModal visible={showUnsavedChangesModal} onCancel={() => setShowUnsavedChangesModal(false)} onDiscard={handleDiscardChanges} />
    </View>
  );
};

export default EditProfileScreen;

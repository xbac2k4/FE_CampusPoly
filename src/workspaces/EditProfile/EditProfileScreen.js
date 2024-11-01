import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
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

const EditProfileScreen = () => {
  const route = useRoute();
  const user = route?.params?.user;

  const navigation = useNavigation();

  const profileSheetRef = useRef(null);
  const backgroundSheetRef = useRef(null);

  const [name, setName] = useState(user.full_name || '');
  const [bio, setBio] = useState(user.bio || '');
  const [gender, setGender] = useState(user.sex || '');
  const [birthday, setBirthday] = useState(user.date_of_birth ? new Date(user.date_of_birth) : null);
  const [profileImage, setProfileImage] = useState(require('../../assets/images/default-profile.png'));
  const [backgroundImage, setBackgroundImage] = useState(require('../../assets/images/default-bg.png'));
  const [isChanged, setIsChanged] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const originalData = useRef({
    name: '',
    bio: '',
    gender: '',
    profileImage: require('../../assets/images/default-profile.png'),
    backgroundImage: require('../../assets/images/default-bg.png'),
  });

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch(`${process.env.GET_USER_ID}${userId}`);
  //       if (response.ok) {
  //         const result = await response.json();
  //         const user = result.data; // Access the user data under "data"

  //         console.log('Fetched user data:', user);

  //         // Ensure correct value assignment
  //         setName(user.full_name || ''); // Set name
  //         setBio(user.bio || ''); // Set bio
  //         setGender(user.sex || ''); // Set gender
  //         setBirthday(user.date_of_birth ? new Date(user.date_of_birth) : null); // Set birthday
  //         setProfileImage(
  //           user.avatar ? { uri: user.avatar.replace('localhost', '10.0.2.2') } : require('../../assets/images/default-profile.png')
  //         );
  //         setBackgroundImage(
  //           user.background ? { uri: user.background.replace('localhost', '10.0.2.2') } : require('../../assets/images/default-bg.png')
  //         );

  //         // Store initial data for unsaved changes modal
  //         originalData.current = {
  //           name: user.full_name || '',
  //           bio: user.bio || '',
  //           gender: user.sex || '',
  //           birthday: user.date_of_birth ? new Date(user.date_of_birth) : null, // Add this line
  //           profileImage: user.avatar ? { uri: user.avatar.replace('localhost', '10.0.2.2') } : require('../../assets/images/default-profile.png'),
  //           backgroundImage: user.background ? { uri: user.background.replace('localhost', '10.0.2.2') } : require('../../assets/images/default-bg.png'),
  //         };


  //         console.log('Set state values:', {
  //           name: user.full_name || '',
  //           bio: user.bio || '',
  //           gender: user.sex || '',
  //           birthday: user.date_of_birth ? new Date(user.date_of_birth) : null, // Add this line
  //           profileImage: user.avatar
  //             ? { uri: user.avatar }
  //             : require('../../assets/images/default-profile.png'),
  //           backgroundImage: user.backgroundImage
  //             ? { uri: user.backgroundImage }
  //             : require('../../assets/images/default-bg.png'),
  //         });
  //       } else {
  //         throw new Error('Failed to fetch user data');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //       setErrorMessage('Unable to load user data.');
  //     }
  //   };

  //   if (userId) {
  //     fetchUserData();
  //   }
  // }, [userId]);


  useEffect(() => {
    const hasChanges =
      name !== originalData.current.name ||
      bio !== originalData.current.bio ||
      gender !== originalData.current.gender ||
      birthday?.toISOString() !== originalData.current.birthday?.toISOString() || // Add this line
      profileImage !== originalData.current.profileImage ||
      backgroundImage !== originalData.current.backgroundImage;
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
    if (!name?.trim()) { // Safe-check with optional chaining
      setErrorMessage('Name is required!');
      return;
    }

    try {
      const response = await fetch(`http://10.0.2.2:3000/api/v1/users/update-user/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: name,
          bio,
          sex: gender,
          birthday: birthday,
          avatar: profileImage,
          background: backgroundImage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setIsSaved(true);
      setErrorMessage('');
      setTimeout(() => {
        setIsChanged(false);
        navigation.goBack();
      }, 100);
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrorMessage('Failed to save profile.');
    }
  };

  const clearBio = () => setBio('');

  const handleProfileImageEdit = type => {
    if (type === 'upload') {
      launchImageLibrary({ mediaType: 'photo' }, response => {
        if (!response.didCancel && !response.error) {
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
        if (!response.didCancel && !response.error) {
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
          disabled={!isChanged || !name?.trim()}>
          <Text style={[styles.headerButton, isChanged && name?.trim() && styles.headerButtonActive]}>
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
        }} clearText={() => { setName(''); validateName(''); }} maxLength={50} errorMessage={errorMessage} />
        <ProfileInput label="Bio" value={bio} onChangeText={setBio} clearText={clearBio} maxLength={50} />
        <GenderPicker selectedGender={gender} onGenderChange={setGender} />
        <BirthdayPicker
          selectedDate={birthday}
          onDateChange={(date) => setBirthday(date)}
        />
      </View>

      {/* Image Options */}
      <ImageOptionsSheet ref={profileSheetRef} onUpload={() => handleProfileImageEdit('upload')}
        onDelete={() => handleProfileImageEdit('delete')}
        canDelete={profileImage !== require('../../assets/images/default-profile.png')} />
      <ImageOptionsSheet ref={backgroundSheetRef} onUpload={() => handleBackgroundImageEdit('upload')}
        onDelete={() => handleBackgroundImageEdit('delete')}
        canDelete={backgroundImage !== require('../../assets/images/default-bg.png')} />

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
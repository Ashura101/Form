import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
  ScrollView,
  Alert,
  Image,
  LogBox,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { CommonTextInput } from '../components/commonTextInput';
import { CommonButton } from '../components/commonButton';
import COLORS from '../constants/colors';
import RadioButtonRN from 'radio-buttons-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from '../components/Icon';
import { Dropdown } from 'react-native-element-dropdown';
import Icons from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { checkGalleryPermission, checkCameraPermission } from '../utils/permission';
import CheckBox from 'react-native-check-box';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import MultiSelect from 'react-native-multiple-select';
import { emailValidation, passwordValidation, letterValidation } from '../utils/validations';
import Slider from '@react-native-community/slider';
import ImagePicker from 'react-native-image-crop-picker';
import { StatusBar } from 'expo-status-bar';
import Video from 'react-native-video';

const { width } = Dimensions.get('window');

export default Form = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const [showData, setShowData] = useState(false);
  const [formData, setFormData] = useState({
    profileImage: '',
    slider: 0,
    fName: '',
    lName: '',
    email: '',
    password: '',
    phone: '',
    fatherName: '',
    motherName: '',
    emergencyContact: '',
    gender: '',
    dob: new Date(0),
    state: '',
    hobbies: [{ hobbyName: '', isHobbyAdded: false }],
    education: [{ eduName: '', isEduAdded: false }],
    height: '',
    weight: '',
    feature: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: '',
    pin: '',
    occupation: '',
    company: '',
    jobTitle: '',
    knownLanguages: { hindi: false, english: false, french: false, spanish: false },
    technologies: [],
  });

  /*----------Validation----------*/
  const onSubmit = () => {
    if (formData.fName == '') {
      alert('First name cannot be empty');
    } else if (letterValidation(formData.fName)) {
      alert('First name can only be letters');
    } else if (formData.lName == '') {
      alert('Last name cannot be empty');
    } else if (letterValidation(formData.lName)) {
      alert('Last name can only be letters');
    } else if (formData.email == '') {
      alert('Email cannot be empty');
    } else if (!emailValidation(formData.email)) {
      alert('Incorrect email format');
    } else if (formData.password == '') {
      alert('Password cannot be empty');
    } else if (!passwordValidation(formData.password)) {
      alert('Incorrect password format');
    } else if (formData.phone == '') {
      alert('Phone number cannot be empty');
    } else if (formData.fatherName == '') {
      alert("Father's Name cannot be empty");
    } else if (formData.motherName == '') {
      alert("Father's Name cannot be empty");
    } else if (formData.emergencyContact == '') {
      alert('Emergency contact cannot be empty');
    } else if (formData.gender == '') {
      alert('Gender cannot be empty');
    } else if (formData.addressLine1 == '') {
      alert('Address Line 1 cannot be empty');
    } else if (formData.city == '') {
      alert('City cannot be empty');
    } else if (formData.state == '') {
      alert('State cannot be empty');
    } else if (formData.pin == '') {
      alert('PIN code cannot be empty');
    } else if (formData.education[0].eduName == '') {
      alert('Education cannot be empty');
    } else if (formData.occupation == '') {
      alert('Occupation cannot be empty');
    } else if (formData.company == '') {
      alert('Company cannot be empty');
    } else if (formData.jobTitle == '') {
      alert('Job title cannot be empty');
    } else if (formData.height == '') {
      alert('Height cannot be empty');
    } else if (formData.weight == '') {
      alert('Weight cannot be empty');
    } else if (formData.feature == '') {
      alert('Identifying feature cannot be empty');
    } else if (
      formData.knownLanguages.hindi == false &&
      formData.knownLanguages.english == false &&
      formData.knownLanguages.french == false &&
      formData.knownLanguages.spanish == false
    ) {
      alert('Must select atleast one language');
    } else if (formData.technologies.length == 0) {
      alert('You have to select atleast one technology');
    } else {
      setShowData(!showData);
    }
  };
  /*----------Validation end----------*/

  /*----------Password----------*/
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);
  /*----------Password end----------*/

  /*----------Gender----------*/
  const radio_props = [
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 },
  ];
  const [genderValue, setGenderValue] = useState(0);

  const handleGender = (gender, index, item) => {
    if (gender == 0) {
      setFormData(Object.assign([], formData, { [index]: { ...item, gender: 'Male' } }));
    } else {
      setFormData(Object.assign([], formData, { [index]: { ...item, gender: 'Female' } }));
    }
  };
  /*----------Gender end----------*/

  /*----------Date picker-----------*/
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setFormData(Object.assign({}, formData, { dob: currentDate.toLocaleDateString() }));
  };
  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    if (show == true) {
      setShow(false);
    } else {
      setShow(true);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  /*----------Date picker end-----------*/

  /*----------State dropdown-----------*/
  const [stateValue, setStateValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const statedrop = [
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Hyderabad', label: 'Hyderabad' },
    { value: 'Chandigarh', label: 'Chandigarh' },
    { value: 'Mohali', label: 'Mohali' },
    { value: 'Pune', label: 'Pune' },
    { value: 'Chennai', label: 'Chennai' },
  ];
  const handleState = (outerIndex, outerItem) => {
    setFormData(Object.assign([], formData, { [outerIndex]: { ...outerItem, state: stateValue } }));
  };

  /*----------State dropdown end-----------*/

  /*----------Hobby-----------*/
  function handleHobbyChange(text, index, item) {
    let customHobby = formData.hobbies;
    customHobby[index].hobbyName = text;
    setFormData(Object.assign({}, formData, { hobbies: customHobby }));
  }

  const addHobby = (item, index) => {
    let hobby = formData.hobbies;
    hobby[index].isHobbyAdded = true;
    hobby.push({ hobbyName: '', isHobbyAdded: false });
    setFormData(Object.assign({}, formData, { hobbies: hobby }));
  };
  const removeHobby = (item, index) => {
    let hobby = formData.hobbies;
    hobby.splice(index, 1);
    setFormData(Object.assign({}, formData, { hobbies: hobby }));
  };
  /*----------Hobby end-----------*/

  /*----------Education-----------*/
  function handleEduChange(text, index, item) {
    let customEdu = formData.education;
    customEdu[index].eduName = text;
    setFormData(Object.assign({}, formData, { education: customEdu }));
  }

  const addEdu = (item, index) => {
    let edu = formData.education;
    edu[index].isEduAdded = true;
    edu.push({ eduName: '', isEduAdded: false });
    setFormData(Object.assign({}, formData, { education: edu }));
  };
  const removeEdu = (item, index) => {
    let edu = formData.education;
    edu.splice(index, 1);
    setFormData(Object.assign({}, formData, { education: edu }));
  };
  /*----------Education end-----------*/

  /*----------Image-----------*/
  const [picture, setPicture] = useState({ uri: '' });
  const [imageUri, setImageUri] = useState('');
  const handlecamerapermission = () => {
    if (checkCameraPermission) {
      openCamera();
    }
  };

  const handleGalleryPermission = () => {
    if (checkGalleryPermission) {
      openGallery();
    }
  };

  const createThreeButtonAlert = () => {
    Alert.alert('Upload profile', 'Complete action using', [
      {
        text: 'Open Camera',
        onPress: () => handlecamerapermission(),
      },
      {
        text: 'Open Gallery',
        onPress: () => handleGalleryPermission(),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };
  const pictureData = (str) => {
    return str.slice(str.lastIndexOf('/') + 1);
  };
  const openGallery = () => {
    // const options = {
    //   storageoptions: {
    //     path: 'images',
    //     mediaType: 'photo',
    //   },
    //   includeBase64: true,
    // };
    // launchImageLibrary(options, (res) => {
    //   if (res.didCancel) {
    //   } else if (res.errorCode) {
    //   } else if (res.assets[0].fileSize < 10000000) {
    //     // setFilePath(res.assets[0]);
    //     // setPicture({ uri: res.assets[0].uri });
    //     const source = { uri: res.assets[0].uri };
    //     setImageUri(source);
    //     setFormData(Object.assign({}, formData, { profileImage: source }));
    //   } else {
    //     Alert.alert('Image size should be less than 10 MB');
    //   }
    // });
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      let source = { uri: image.path };
      setFormData(Object.assign({}, formData, { profileImage: source }));
    });
  };
  const openCamera = () => {
    // const options = {
    //   storageoptions: {
    //     path: 'images',
    //     mediaType: 'photo',
    //   },
    //   includeBase64: true,
    // };

    // launchCamera(options, (res) => {
    //   if (res.didCancel) {
    //   } else if (res.errorCode) {
    //   } else if (res.assets[0].fileSize < 10000000) {
    //     // setFilePath(res.assets[0]);
    //     // setPicture({ uri: res.assets[0].uri });
    //     const source = { uri: res.assets[0].uri };
    //     setImageUri(source);
    //     setFormData(Object.assign({}, formData, { profileImage: source }));
    //   } else {
    //     Alert.alert('Image size should be less than 10 MB');
    //   }
    // });
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      let source = { uri: image.path };
      setFormData(Object.assign({}, formData, { profileImage: source }));
    });
  };
  /*----------Image end-----------*/

  /*----------Multi Select List-----------*/
  // const [selected, setSelected] = useState([]);
  // const multiItems = [
  //   { key: 1, value: 'Java' },
  //   { key: 2, value: 'JavaScript' },
  //   { key: 3, value: 'Python' },
  //   { key: 4, value: 'C' },
  //   { key: 5, value: 'C++' },
  //   { key: 6, value: 'CSharp' },
  // ];
  const [selectedlang, setSelectedlang] = useState([]);
  const languages = [
    { id: '1', name: 'Java' },
    { id: '2', name: 'JavaScript' },
    { id: '3', name: 'Python ' },
    { id: '4', name: 'C' },
    { id: '5', name: 'C++' },
  ];
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedlang(selectedItems);
    setFormData(Object.assign({}, formData, { technologies: selectedItems }));
  };
  /*----------Multi Select List end-----------*/
  // const videoUrl = '../assets/videos/testVid.mov';
  const videoUrl = '../assets/videos/bunny.mp4';
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="skyblue" /> */}
      <ScrollView bounces={false} style={styles.formView}>
        <View style={styles.imageView}>
          {formData.profileImage ? (
            <View>
              <TouchableOpacity onPress={createThreeButtonAlert}>
                <Image
                  source={formData.profileImage}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: 'black',
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.profileiconStyle}>
              <TouchableOpacity onPress={createThreeButtonAlert}>
                <Icons
                  name="person-add-outline"
                  size={40}
                  color={'grey'}
                  style={{ alignSelf: 'center' }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={createThreeButtonAlert}>
          <Icons name="camera-outline" size={30} style={{ alignSelf: 'center' }} />
        </TouchableOpacity>

        <Video
          source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }} // Can be a URL or a local file.
          style={{
            flex: 1,
            height: 200,
            width: '90%',
            // marginHorizontal: 20,
            borderWidth: 1,
            alignSelf: 'center',
          }}
          resizeMode={'cover'}
        />
        <Text style={styles.titleText}>Salary range(p.a)</Text>
        <View
          style={{
            marginHorizontal: 20,
            alignItems: 'center',
            borderRadius: 10,
            borderWidth: StyleSheet.hairlineWidth,
          }}
        >
          <Text>{formData.slider} Lakh</Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            value={formData.slider}
            tapToSeek
            minimumValue={1}
            maximumValue={10}
            minimumTrackTintColor="skyblue"
            maximumTrackTintColor="skyblue"
            step={1}
            onValueChange={(s) => {
              setFormData(Object.assign({}, formData, { slider: s }));
            }}
          />
        </View>
        <CommonTextInput
          label={'First name'}
          value={formData.fName}
          onChangeText={(text) => {
            setFormData(Object.assign({}, formData, { fName: text.trim() }));
          }}
        />
        <CommonTextInput
          label={'Last name'}
          value={formData.lName}
          onChangeText={(text) => {
            setFormData(Object.assign({}, formData, { lName: text.trim() }));
          }}
        />
        <CommonTextInput
          label={'Email'}
          value={formData.email}
          onChangeText={(text) => {
            setFormData(Object.assign({}, formData, { email: text }));
          }}
        />
        <Text style={styles.titleText}>Password</Text>
        <View style={styles.passwordBoxView}>
          <TextInput
            style={styles.passwordInput}
            value={formData.password}
            onChangeText={(text) => {
              setFormData(Object.assign({}, formData, { password: text }));
            }}
            secureTextEntry={seePassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setSeePassword(!seePassword)}>
            <Icons
              name={seePassword ? 'eye-off-outline' : 'eye-outline'}
              size={25}
              style={{ paddingRight: 10 }}
            />
          </TouchableOpacity>
        </View>
        <CommonTextInput
          label={'Phone'}
          keyboardType="numeric"
          value={formData.phone}
          onChangeText={(text) => {
            setFormData(Object.assign({}, formData, { phone: text }));
          }}
        />
        <CommonTextInput
          label={"Father's name"}
          value={formData.fatherName}
          onChangeText={(text) => {
            setFormData(Object.assign({}, formData, { fatherName: text }));
          }}
        />
        <CommonTextInput
          label={"Mother's name"}
          value={formData.motherName}
          onChangeText={(text) => {
            setFormData(Object.assign({}, formData, { motherName: text }));
          }}
        />
        <CommonTextInput
          label={'Emergency Contact'}
          keyboardType="numeric"
          value={formData.emergencyContact}
          onChangeText={(text) => {
            setFormData(Object.assign({}, formData, { emergencyContact: text }));
          }}
        />
        <Text style={styles.genderLabel}>Gender</Text>
        <View style={styles.genderView}>
          <RadioButtonRN
            data={radio_props}
            selectedBtn={(e) => setFormData(Object.assign({}, formData, { gender: e.label }))}
            activeColor={COLORS.PLACEHOLDER}
            deactiveColor={COLORS.PLACEHOLDER}
          />
        </View>
        <Text style={styles.dob}>DOB</Text>
        <TouchableOpacity style={styles.calendarView} onPress={showDatepicker}>
          <View style={styles.calendarInput}>
            <Text style={styles.textStyle}>{date.toLocaleDateString()}</Text>
            <Icon
              name="calendar-602x"
              family="NowExtra"
              size={18}
              //   color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
              style={{ opacity: 0.5 }}
            />
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              maximumDate={new Date()}
              dateFormat={'day month year'}
              onChange={onChange}
            />
          )}
        </TouchableOpacity>
        <CommonTextInput
          label={'Address Line 1'}
          value={formData.addressLine1}
          onChangeText={(text) => {
            setFormData(Object.assign({}, formData, { addressLine1: text }));
          }}
        />
        <CommonTextInput
          label={'Address Line 2'}
          value={formData.addressLine2}
          onChangeText={(text) => {
            setFormData(Object.assign({}, formData, { addressLine2: text }));
          }}
        />
        <CommonTextInput
          label={'Landmark'}
          value={formData.landmark}
          onChangeText={(text) => {
            setFormData(Object.assign({}, formData, { landmark: text }));
          }}
        />
        <CommonTextInput
          label={'City'}
          value={formData.city}
          onChangeText={(text) => {
            setFormData(Object.assign({}, formData, { city: text }));
          }}
        />
        <Text style={styles.stateLabel}>State</Text>
        <View style={styles.stateView}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            // selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={statedrop}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={formData.state}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(i) => {
              setIsFocus(false);
              setFormData(Object.assign({}, formData, { state: i.value }));
            }}
          />
        </View>
        <CommonTextInput
          label={'PIN code'}
          value={formData.pin}
          keyboardType="numeric"
          onChangeText={(text) => {
            setFormData(Object.assign({}, formData, { pin: text }));
          }}
        />
        <Text style={styles.titleText}>Hobbies</Text>
        <FlatList
          data={formData.hobbies}
          renderItem={({ item, index }) => {
            return (
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={styles.hobbyBoxView}>
                    <TextInput
                      style={styles.hobbyInput}
                      label="Hobby"
                      value={item.hobbyName}
                      onChangeText={(text) => handleHobbyChange(text, index, item)}
                    />
                  </View>
                  {item.isHobbyAdded ? (
                    <TouchableOpacity
                      style={styles.addHobbyButton}
                      onPress={() => removeHobby(item, index)}
                    >
                      <Text style={{ padding: 10, fontWeight: 'bold' }}>Remove hobby</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.addHobbyButton}
                      onPress={() => addHobby(item, index)}
                    >
                      <Text style={{ padding: 10, fontWeight: 'bold' }}>Add more</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          }}
        />
        <Text style={styles.titleText}>Education</Text>
        <FlatList
          data={formData.education}
          renderItem={({ item, index }) => {
            return (
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={styles.hobbyBoxView}>
                    <TextInput
                      style={styles.hobbyInput}
                      label="Hobby"
                      value={item.eduName}
                      onChangeText={(text) => handleEduChange(text, index, item)}
                    />
                  </View>
                  {item.isEduAdded ? (
                    <TouchableOpacity
                      style={styles.addHobbyButton}
                      onPress={() => removeEdu(item, index)}
                    >
                      <Text style={{ padding: 10, fontWeight: 'bold' }}>Remove education</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.addHobbyButton}
                      onPress={() => addEdu(item, index)}
                    >
                      <Text style={{ padding: 10, fontWeight: 'bold' }}>Add more</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          }}
        />
        <CommonTextInput
          label={'Occupation'}
          value={formData.occupation}
          onChangeText={(text) => {
            setFormData(Object.assign({}, formData, { occupation: text }));
          }}
        />
        <CommonTextInput
          label={'Company'}
          value={formData.company}
          onChangeText={(text) => {
            setFormData(Object.assign({}, formData, { company: text }));
          }}
        />
        <CommonTextInput
          label={'Job Title'}
          value={formData.jobTitle}
          onChangeText={(text) => {
            setFormData(Object.assign({}, formData, { jobTitle: text }));
          }}
        />
        <CommonTextInput
          label={'Height(cm)'}
          keyboardType="numeric"
          value={formData.height}
          onChangeText={(text) => {
            setFormData(Object.assign({}, formData, { height: text }));
          }}
        />
        <CommonTextInput
          label={'Weight(kg)'}
          keyboardType="numeric"
          value={formData.weight}
          onChangeText={(text) => {
            setFormData(Object.assign({}, formData, { weight: text }));
          }}
        />
        <CommonTextInput
          label={'Identifying feature'}
          value={formData.feature}
          onChangeText={(text) => {
            setFormData(Object.assign({}, formData, { feature: text }));
          }}
        />
        <Text style={styles.titleText}>Known Languages</Text>
        <View style={styles.genderView}>
          <CheckBox
            isChecked={formData.knownLanguages.hindi}
            onClick={() => {
              let temp = formData.knownLanguages;
              temp.hindi = !temp.hindi;
              setFormData(Object.assign({}, formData, { knownLanguages: temp }));
            }}
            rightText={'Hindi'}
            rightTextStyle={{
              fontSize: 15,
              color: formData.knownLanguages.hindi ? 'skyblue' : 'black',
            }}
            checkedCheckBoxColor="skyblue"
          />
          <CheckBox
            isChecked={formData.knownLanguages.english}
            onClick={() => {
              let temp = formData.knownLanguages;
              temp.english = !temp.english;
              setFormData(Object.assign({}, formData, { knownLanguages: temp }));
            }}
            rightText={'English'}
            rightTextStyle={{
              fontSize: 15,
              color: formData.knownLanguages.english ? 'skyblue' : 'black',
            }}
            checkedCheckBoxColor="skyblue"
          />
          <CheckBox
            isChecked={formData.knownLanguages.french}
            onClick={() => {
              let temp = formData.knownLanguages;
              temp.french = !temp.french;
              setFormData(Object.assign({}, formData, { knownLanguages: temp }));
            }}
            rightText={'French'}
            rightTextStyle={{
              fontSize: 15,
              color: formData.knownLanguages.french ? 'skyblue' : 'black',
            }}
            checkedCheckBoxColor="skyblue"
          />
          <CheckBox
            isChecked={formData.knownLanguages.spanish}
            onClick={() => {
              let temp = formData.knownLanguages;
              temp.spanish = !temp.spanish;
              setFormData(Object.assign({}, formData, { knownLanguages: temp }));
            }}
            rightText={'Spanish'}
            rightTextStyle={{
              fontSize: 15,
              color: formData.knownLanguages.spanish ? 'skyblue' : 'black',
            }}
            checkedCheckBoxColor="skyblue"
          />
        </View>
        {/* <View style={styles.stateView}> */}
        <Text style={styles.titleText}>Technologies</Text>
        {/* <MultipleSelectList
          setSelected={(val) => {
            setSelected(val);
          }}
          data={multiItems}
          save="value"
          onSelect={() => setFormData(Object.assign({}, formData, { technologies: selected }))}
          label="Categories"
          boxStyles={{ marginHorizontal: 20 }}
          dropdownStyles={{ marginHorizontal: 20 }}
        /> */}
        <View
          style={{
            marginHorizontal: 20,
            borderRadius: 10,
            borderWidth: StyleSheet.hairlineWidth,
            padding: 5,
          }}
        >
          <MultiSelect
            items={languages}
            uniqueKey="name"
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedlang}
            selectText="Select..."
            searchInputPlaceholderText="Search Items..."
            submitButtonColor="blue"
            submitButtonText="Submit"
            styleDropdownMenu={styles.dropdown}
            styleTextDropdown={{ fontSize: 15 }}
            styleSelectorContainer={{ marginHorizontal: 20 }}
            searchInputStyle={{ height: 40 }}
            styleItemsContainer={{ marginHorizontal: 20 }}
            tagRemoveIconColor="red"
            tagBorderColor="#CCC"
            tagTextColor="black"
          />
        </View>
        {/* </View> */}
        <CommonButton title={'Submit'} onPress={() => onSubmit()} />
        {showData ? <Text>{JSON.stringify(formData)}</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  formView: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    borderRadius: 20,
    // marginHorizontal: 5,
    width: width,
  },
  imageView: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    backgroundColor: 'pink',
    borderRadius: 50,
  },
  imageloadStyle: {
    flex: 1,
    borderRadius: 50,
    overflow: 'hidden',
    height: 100,
    width: 100,
    position: 'absolute',
  },
  profileiconimage: {
    height: 30,
    width: 30,
    marginTop: 60,
    marginStart: 65,
  },
  profileiconStyle: {
    borderRadius: 50,
    height: 100,
    width: 100,
    backgroundColor: COLORS.GRAY,
    justifyContent: 'center',
  },
  titleText: {
    paddingLeft: 20,
    paddingTop: 15,
    fontSize: 18,
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  passwordBoxView: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    height: 40,
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  genderLabel: {
    color: COLORS.BLACK,
    fontSize: 18,
    marginTop: 15,
    fontWeight: '400',
    fontStyle: 'normal',
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
  genderView: {
    // borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    marginHorizontal: 20,
    padding: 5,
  },
  calendarView: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.PRIMARY,
    height: 40,
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    marginHorizontal: 20,
  },
  calendarInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  textStyle: {
    fontSize: 16,
  },
  dob: {
    color: COLORS.BLACK,
    fontSize: 18,
    marginTop: 15,
    fontWeight: 'bold',
    fontStyle: 'normal',
    marginHorizontal: 20,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  stateLabel: {
    color: COLORS.BLACK,
    fontSize: 18,
    marginTop: 15,
    fontWeight: 'bold',
    fontStyle: 'normal',
    marginHorizontal: 20,
  },
  stateView: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.PRIMARY,
    height: 40,
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    marginHorizontal: 20,
  },
  placeholderStyle: {
    color: COLORS.PLACEHOLDER,
  },
  hobbyView: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    height: 40,
    alignItems: 'center',
  },
  hobbyBoxView: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    height: 40,
    alignItems: 'center',
    width: width / 2,
  },
  hobbyInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  addHobbyButton: {
    backgroundColor: COLORS.SUCCESS,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

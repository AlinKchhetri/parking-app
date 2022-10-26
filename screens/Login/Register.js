import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  COLORS,
  lightFONTS,
  SIZES,
  darkFONTS,
  images,
  icons,
} from '../../constants';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Avatar } from 'react-native-paper';
import { register } from '../../redux/action';
import { useDispatch, useSelector } from'react-redux';
import mime from 'mime';

const Register = ({ navigation, route }) => {

  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  
  useEffect(() => {
    if (route.params) {
      if(route.params.image){
        setAvatar(route.params.image)
      }
    }

    setName(firstName + ' ' + lastName)

  }, [route, firstName, lastName])
  

  const handleImage = () => {
    navigation.navigate('camera');
  }

  const handleRegister = () => {
    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('phoneNumber', phoneNumber);
    myForm.append('password', password);
    myForm.append('avatar', { uri: avatar, type: mime.getType(avatar), name: avatar.split("/").pop() });

    dispatch(register(myForm));
  }

  const InputFields = props => {
    return (
      <TextInput style={styles.inputField} placeholder={props.placeholder} defaultValue={props.defaultValue} onChange={props.onChangeText}/>
    );
  };

  //   const LoginCheckbox = () => {
  //     return (
  //       <View style={styles.checkbox}>
  //         <CheckBox
  //           disabled={false}
  //           value={toggleCheckBox}
  //           onValueChange={newValue => setToggleCheckBox(newValue)}
  //         />
  //       </View>
  //     );
  //   };

  const LoginButton = () => {
    return (
      <TouchableOpacity
        onPress={handleRegister}
        style={styles.next}>
        <Text style={styles.buttonStyle}>Sign in</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.login}>
      <StatusBar barStyle="dark-content" />
      <View>
        <Avatar.Image
          size={100}
          source={{ uri: avatar ? avatar : null }}
          style={{ backgroundColor: '#1ab65c', alignSelf: 'center' }}
        />
        <Text
          onPress={handleImage}
          style={{ ...lightFONTS.body4, color: COLORS.green, alignSelf: 'center' }}>
          Change photo
        </Text>
        <TextInput style={styles.inputField} placeholder="First Name" onChangeText={setFirstName} clearButtonMode='while-editing' />
        <TextInput style={styles.inputField} placeholder="Last Name" onChangeText={setLastName} clearButtonMode='while-editing' />
        <TextInput style={styles.inputField} placeholder="Email" onChangeText={setEmail} clearButtonMode='while-editing' />
        <TextInput style={styles.inputField} placeholder="Phone Number" onChangeText={setPhoneNumber} clearButtonMode='while-editing' />
        <TextInput style={styles.inputField} placeholder="Password" onChangeText={setPassword} secureTextEntry clearButtonMode='while-editing' />
        <TextInput style={styles.inputField} placeholder="Confirm Password" onChangeText={setConfirmPassword} secureTextEntry clearButtonMode='while-editing' />
        <BouncyCheckbox
          size={25}
          fillColor='#1ab65c'
          unfillColor="#FFFFFF"
          text="I agree to T&C"
          iconStyle={{ borderColor: "red" }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{ ...lightFONTS.body3 }}
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            margin: SIZES.padding2
          }}
        />
        <LoginButton />
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
  },
  loginHeader: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  loginText: {
    ...lightFONTS.h1,
    fontWeight: 'bold',
    textAlign: 'left',
    padding: SIZES.padding,
  },
  inputField: {
    backgroundColor: '#FAFAFA',
    margin: SIZES.padding2,
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: SIZES.base,
    borderRadius: SIZES.padding,
  },
  next: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: SIZES.padding,
    backgroundColor: COLORS.green,
    height: 55,
    borderRadius: SIZES.padding * 2,
  },

  buttonStyle: {
    ...darkFONTS.h4,
  },
  forgotText: {
    ...lightFONTS.body4,
    textAlign: 'center',
    marginTop: SIZES.padding,
    color: COLORS.green,
  },
  socialButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 40,
    margin: SIZES.padding,
  },
  iconStyle: {
    width: 45,
    height: 45,
  },
  socialText: {
    ...lightFONTS.body3,
    textAlign: 'center',
  },
  dontText: {
    ...lightFONTS.body3,
    textAlign: 'center',
  },
  singnupText: {
    ...lightFONTS.body3,
    color: COLORS.green,
  },
});
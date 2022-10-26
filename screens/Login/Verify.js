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
  import { changePassword, loadUser, register, verify } from '../../redux/action';
  import { useDispatch, useSelector } from'react-redux';
  import mime from 'mime';
  
  const Verify = ({ navigation, route }) => {
  
    const dispatch = useDispatch();
  
    const [otp, setOtp] = useState('');
  
    
    const handleVerify = async () => {
      await dispatch(verify(otp));
      dispatch(loadUser());
    }

  
    const LoginTitle = () => {
      return (
        <View style={styles.loginHeader}>
          <Text style={styles.loginText}>Verify Your Account</Text>
        </View>
      );
    };

    const LoginButton = () => {
      return (
        <TouchableOpacity
          onPress={handleVerify}
          style={styles.next}>
          <Text style={styles.buttonStyle}>Verify</Text>
        </TouchableOpacity>
      );
    };
  
    return (
      <SafeAreaView style={styles.login}>
        <StatusBar barStyle="dark-content" />
        <View>
          <LoginTitle />
          <TextInput style={styles.inputField} placeholder="OTP" keyboardType='number-pad' onChangeText={setOtp}/>
          <LoginButton />
        </View>
      </SafeAreaView>
    );
  };
  
  export default Verify;
  
  const styles = StyleSheet.create({
    login: {
      flex: 1,
      flexDirection: 'column',
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
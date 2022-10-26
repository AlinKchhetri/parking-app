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
import React, {useState, useEffect} from 'react';
import {
  COLORS,
  lightFONTS,
  SIZES,
  darkFONTS,
  images,
  icons,
} from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/action'
import Toast from 'react-native-toast-message'
// import CheckBox from '@react-native-community/checkbox';

const Login = ({navigation}) => {
  const { error} = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const [email, setEmail ] = useState('');
  const [password, setPassword] = useState('');


  const loginHandler = () => {
    dispatch(login(email, password));
  }
  const handleForgotPassword = () => {
    navigation.navigate('forgotPassword');
  }



  useEffect(() => {
    // console.log(isAuthenticated);
    if (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        bottomOffset:50,
        text1: error,
      })
        dispatch({ type: "clearError" })
    }

}, [error, dispatch, alert])

const { isAuthenticated, loading } = useSelector(state => state.auth)
    console.log(isAuthenticated, loading);

  const InputFields = props => {
    return (
      <TextInput style={styles.inputField} placeholder={props.placeholder} value={props.value} onChange={props.onChangeText}/>
    );
  };

  const LoginTitle = () => {
    return (
      <View style={styles.loginHeader}>
        <Text style={styles.loginText}>Login to your account</Text>
      </View>
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
        onPress={loginHandler}
        style={styles.next}>
        <Text style={styles.buttonStyle}>Sign in</Text>
      </TouchableOpacity>
    );
  };

  const SocialLogin = () => {
    return (
      <View style={styles.socialContainer}>
        <Text style={styles.socialText}>or continue with</Text>
        <View style={styles.socialButton}>
          <TouchableOpacity>
            <Icon name='facebook' size={30} style={styles.iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name='google' size={28} style={styles.iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name='apple' size={30} style={styles.iconStyle} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.login}>
      <StatusBar barStyle="dark-content" />
      <View>
        <LoginTitle />
        <TextInput style={styles.inputField} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.inputField} placeholder="Password" value={password} onChangeText={setPassword} />
        <LoginButton />
        <Text onPress={handleForgotPassword} style={styles.forgotText}>Forgot the password?</Text>
      </View>
      <SocialLogin />
      <Text style={styles.dontText}>
        Don't have an account yet?{' '}
        <Text onPress={() => navigation.navigate('register')} style={styles.singnupText}>Sign up</Text>
      </Text>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
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
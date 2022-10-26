import { View, Text, TextInput, TouchableOpacity, Linking, StyleSheet, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES, lightFONTS, darkFONTS } from '../constants'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../redux/action'
import QRCode from 'react-native-qrcode-svg'



const History = ({ route }) => {

  const dispatch = useDispatch();
  const { userDetails } = useSelector(state => state.parking);
  const [userID, setUserID] = useState('hello');

  useEffect(() => {
    console.log('error')
    Toast.show({
      type: 'error',
      position: 'bottom',
      bottomOffset: 100,
      text1: 'hello',
    })
  }, []);

  const handleGetUser = () => {
    // dispatch(getUser(userID));
    // Linking.openURL("imepay://");
    // Linking.openURL("instagram://user?_alinkc_=instagram");
    Linking.openURL("esewa://");
  };

  console.log(userDetails);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white }}>
      <TextInput style={styles.inputField} placeholder="ID" value={setUserID} clearButtonMode='while-editing' />
      <TouchableOpacity
        onPress={handleGetUser}
        style={styles.next}>
        <Text style={styles.buttonStyle}>Add</Text>
      </TouchableOpacity>
      <QRCode value='hfeifnienf'/>
    </View>
  )
}

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: '#FAFAFA',
    margin: SIZES.padding2,
    height: 50,
    width: '80%',
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
    width: '80%',
    height: 55,
    borderRadius: SIZES.padding * 2,
  },
});

export default History
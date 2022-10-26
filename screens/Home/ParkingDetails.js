import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { COLORS, darkFONTS } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { bookParking } from '../../redux/action';

const ParkingDetails = ({navigation,route}) => {
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.auth);
    const [details, setDetails] = useState({});

    useEffect(() => {
        if (route.params) {
            setDetails(route.params.space)
        }
    }, [route])

    console.log(details)
    console.log(user)

    const handleBooking = async() =>{
        await dispatch(bookParking(details._id, user._id, user.name, user.email, user.phoneNumber, 3, 60));

        navigation.navigate('Home');
    }
    
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={handleBooking} style={{backgroundColor: COLORS.green, justifyContent: 'center', alignItems: 'center', width: '80%', height: 50}}>
        <Text style={{...darkFONTS.h4}}>Book</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ParkingDetails
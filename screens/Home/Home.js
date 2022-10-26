import { ScrollView, SafeAreaView, StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, SIZES, lightFONTS, darkFONTS, icons } from '../../constants'
import { Avatar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'
import { useSelector, useDispatch } from 'react-redux'
import { getAllParking } from '../../redux/action'

const Home = ({ navigation }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { parkingSpace, error, message } = useSelector(state => state.parking);

    useEffect(() => {
        dispatch(getAllParking());
    }, []);

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch({ type: "clearError" });
        }
        if (message) {
            alert(message);
            dispatch({ type: "clearMessage" });
        }
    }, [alert, error, message, dispatch])


    const AvailableParking = (props) => {
        return (
            <TouchableOpacity key={props.key} onPress={() => navigation.navigate('parkingDetails', { space: props.space })} style={{ flexDirection: 'row', padding: SIZES.padding, margin: SIZES.padding2, justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.lightGray, width: '80%', height: 60 }}>
                <Image resizeMode='contain' source={icons.setMarker} style={{ width: 50, height: 50 }} />
                <Text>{props.rate}</Text>
            </TouchableOpacity>
        );
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.homeHeader}>
                <View style={styles.headerComponent}>
                    <Icon
                        name='menu'
                        color='#FFF'
                        size={25}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
                        <Avatar.Image
                            size={40}
                            source={{ uri: user.avatarUrl.url }}
                            style={{ backgroundColor: 'grey', alignSelf: 'center' }}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerText}>
                    Hi, {user.name}!
                </Text>
            </View>
            <ScrollView style={{ position: 'relative', top: 100 }}>
                <View style={{ padding: SIZES.padding2, justifyContent: 'center', alignItems: 'center' }}>

                    {
                        parkingSpace &&
                        parkingSpace.map((item) => {
                            return (
                                <AvailableParking key={item._id} rate={item.rate} space={item} />
                            )
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    homeHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.green,
        height: 140,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        zIndex: 1
    },
    headerComponent: {
        position: 'relative',
        top: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: SIZES.padding2
    },
    headerText: {
        ...darkFONTS.h3,
        margin: SIZES.padding2,
        top: 10,
    },

})
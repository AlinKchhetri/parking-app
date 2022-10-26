import { View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const ParkingCard = (props) => {
    return (
        <View style={{
            backgroundColor: COLORS.gray, width: '90%', height: 60, borderRadius: 10, shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        }}>

        </View>
    )
}

export default ParkingCard
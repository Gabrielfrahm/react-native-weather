import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../utils/index';
import { useNavigation } from '@react-navigation/native';

export default function Previous({name, uf, country,  lat, lng }) {
    const navigation = useNavigation();
    return (
        <View  style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.textInfoCity} >
                    {name}{"\n"}<Text style={styles.subTextInfoCity}>{uf}, {country}
                </Text></Text>
                <AntDesign
                    onPress={() =>  navigation.navigate('Weather', {  lat, lng })}
                    style={styles.arrow} 
                    name="arrowright" 
                    size={30} 
                    color={colors.PRIMARY_COLOR} 
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        margin: 10,
        backgroundColor: colors.BORDER_COLOR,
        borderRadius: 10,
        
    },
    main : {
        flexDirection: 'row',
        justifyContent:'space-between',
        margin: 20,
        borderLeftWidth: 2,
        borderLeftColor: colors.PRIMARY_COLOR
    },
    textInfoCity: {
        margin: 5,
        fontSize: 20,
        fontWeight: '700'
    },
    subTextInfoCity:{
        fontSize: 15,
        fontWeight: '500'
    },
    arrow : {
        marginTop: 15,
    }
})
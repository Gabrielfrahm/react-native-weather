import React from 'react'
import { View, Text, TextInput ,StyleSheet } from 'react-native'

export default function Search() {
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.textHeader} >Type your location here:</Text>
                <TextInput style={styles.inputCity} placeholder="digite sua cidade" />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    main: {
        flex: 1,
    },
    textHeader: {
        fontSize: 22,
        margin: 8,
    },
    inputCity: {
        margin: 10,
        borderWidth: 1,
        borderColor: 'red' ,
        borderRadius: 10,
        height: 50,
        fontSize: 20,
    }
});

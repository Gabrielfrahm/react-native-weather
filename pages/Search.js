import React, { useState, useCallback } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../utils/index';
import Previous from '../components/Previous';

export default function Search() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [currentCity, setCurrentCity] = useState(null);
    const [unitsSystem, setUnitsSystem] = useState('metric');
    const [cityName, setCityName] = useState('');

    const handleSubmit = (async () => {
        try {
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=e85809527b0341b18712ec1bacc3aab9&q=${cityName}`);
            const result = await response.json();
            if (response) {
                setCurrentCity(result);
                
            } else {
                setErrorMessage(result.message);
            }
        } catch (err) {
            setErrorMessage(err.message);
        }

    });
    // console.log(currentCity);
    const {results: [{components}] } = currentCity;
    console.log(components.state);


    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.textHeader} >Type your location here:</Text>
                <TextInput
                    onChangeText={cityName => setCityName(cityName)}
                    name="city"
                    value={cityName}
                    style={styles.inputCity}
                    placeholder="digite sua cidade"
                />
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={styles.textButton}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text><MaterialIcons name="my-location" size={30} color="black" /></Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.textPrevious} >Previous Searches</Text>
                <Previous name="indaiatuba" uf="SP" country="Brasil" />
                <Previous name="indaiatuba" uf="SP" country="Brasil" />
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
        borderWidth: 2,
        borderColor: colors.BORDER_COLOR,
        borderRadius: 10,
        height: 70,
        fontSize: 20,
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        margin: 10,
        backgroundColor: colors.PRIMARY_COLOR,
        padding: 10,
        width: 120,
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        fontSize: 18,
        fontWeight: '700',
    },
    textPrevious: {
        fontSize: 25,
        margin: 10,
        fontWeight: '700',
    }
});

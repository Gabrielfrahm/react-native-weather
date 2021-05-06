import React, { useState, useEffect,  } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../utils/index';
import Previous from '../components/Previous';
import { useDispatch, useSelector } from 'react-redux';
import { cityRequest } from '../store/modules/city/action';
import * as Location from 'expo-location';
import { WEATHER_API_KEY } from 'react-native-dotenv';
import { useNavigation } from '@react-navigation/native';


const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';
export default function Search() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [currentCity, setCurrentCity] = useState({});
    const [unitsSystem, setUnitsSystem] = useState('metric');
    const [cityName, setCityName] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const cities = useSelector(state => {
        return state.city.cities;
    });

    const error = useSelector(state => {
        return state.city.error;
    });

    const handleSubmit = async () => {
        setErrorMessage(null);
        try {
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=e85809527b0341b18712ec1bacc3aab9&q=${cityName}`);
            const result = await response.json();
            if (response.ok) {
                const {
                    results: [{
                        components: { state_code, city, country },
                        geometry: { lat, lng },
                    }]
                } = result;

                dispatch(cityRequest({
                    state_code,
                    city,
                    country,
                    lat,
                    lng,
                }));
            } else {
                setErrorMessage(result.message);
            }
        } catch (err) {
            setErrorMessage(err.message);
        }

    };

    const handleGetLocation = async () => {
        setErrorMessage(null);
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMessage('Access to location is needed to run the app');
                return;
            }
            const location = await Location.getCurrentPositionAsync();

            const { latitude, longitude } = location.coords;
            const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;

            const response = await fetch(weatherUrl);
            const result = await response.json();
            
            if (response.ok) {
                // setCurrentCity(result);
                const {
                    name,
                } = result;
                // console.log(name);
                navigation.navigate('Weather',  {result} )
                
            } else {
                setErrorMessage(result.message);
            }

        } catch (err) {
            setErrorMessage(err.message)
        }
    }
    // console.log(currentCity);

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
                {error && <Text style={{ color: 'red', textAlign: 'center' }}>voce ja tem essa cidade pesquisada recentemente</Text>}
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={handleSubmit } style={styles.button}>
                        <Text style={styles.textButton}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleGetLocation} style={styles.button}>
                        <Text><MaterialIcons name="my-location" size={30} color="black" /></Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.textPrevious} >Previous Searches</Text>
                {
                    cities.length !== 0
                        ?
                        cities.map(item => (
                            <Previous key={item.city} name={item.city} uf={item.state_code} country={item.country} />
                        ))
                        : <Text style={styles.textEmpty}>Empty 😢</Text>
                }
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
    },
    textEmpty: {
        color: colors.BORDER_COLOR,
        // margin: '',
        textAlign: 'center',
        fontSize: 20,
    }
});

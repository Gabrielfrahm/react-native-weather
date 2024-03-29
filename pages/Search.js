import React, { useState, } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../utils/index';
import Previous from '../components/Previous';
import { useDispatch, useSelector } from 'react-redux';
import { cityRequest } from '../store/modules/city/action';
import * as Location from 'expo-location';
import { WEATHER_API_KEY } from 'react-native-dotenv';
import { useNavigation } from '@react-navigation/native';
import ReloadICon from '../components/ReloadIcon';


const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';
export default function Search() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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

    const load = () => {
        setErrorMessage('');
        setLoading(false);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=e85809527b0341b18712ec1bacc3aab9&q=${cityName}`);
            const result1 = await response.json();

            if (cityName === '') {
                return setLoading(false);
            }

            if (response.ok) {

                const {
                    results: [{
                        components: { state_code, city, country },
                        geometry: { lat, lng },
                    }]
                } = result1;

                const weatherUrl = `${BASE_WEATHER_URL}lat=${lat}&lon=${lng}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;

                const response2 = await fetch(weatherUrl);
                const result = await response2.json();

                dispatch(cityRequest({
                    state_code,
                    city,
                    country,
                    lat,
                    lng,
                    result
                }));
                navigation.navigate('Weather', { lat, lng },);
                setCityName('');
                setLoading(false);
            } else {
                setErrorMessage(result.message);
            }
        } catch (err) {
            setErrorMessage(err.message);
        }

    };

    const handleGetLocation = async () => {
        try {
            setLoading(true);
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log(status)
            if (status !== 'granted') {
                setErrorMessage('Access to location is needed to run the app');
                return;
            }
            const location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High});

            const { latitude, longitude } = location.coords;
            console.log(latitude, longitude)
            const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;

            const response = await fetch(weatherUrl);
            const result = await response.json();

            const response1 = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=e85809527b0341b18712ec1bacc3aab9&q=${result.name}`);
            const result1 = await response1.json();

            if (response.ok) {
                const {
                    results: [{
                        geometry: { lat, lng },
                    }]
                } = result1;

                navigation.navigate('Weather', { lat, lng });
                setLoading(false);
            } else {
                setErrorMessage(result.message);
            }

        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    if (!errorMessage) {
        return (
            <View style={styles.container}>
                {loading && <View style={styles.loading}>
                    <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
                </View>}
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
                        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                            <Text style={styles.textButton}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleGetLocation} style={styles.button}>
                            <Text><MaterialIcons name="my-location" size={30} color="white" /></Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textPrevious} >Previous Searches</Text>
                    {
                        cities.length !== 0
                            ?
                            cities.map(item => (
                                <Previous key={item.city} name={item.city} uf={item.state_code} country={item.country} lat={item.lat} lng={item.lng} />
                            ))
                            : <View style={styles.textEmpty}><Text style={{ fontSize: 20, }} >Empty 😢</Text></View>
                    }
                </View>
            </View>
        )
    }else {
        return (
            <View style={styles.container}>
                <ReloadICon load={load} />
                <Text style={{textAlign: 'center'}}>{errorMessage}</Text>
            </View>
        )
    }
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
        padding: 10,

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
        color: 'white'
    },
    textPrevious: {
        fontSize: 25,
        margin: 10,
        fontWeight: '700',
        
    },
    textEmpty: {
        color: colors.BORDER_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    loading: {
        justifyContent: 'center',
        zIndex: 500,
        position: 'absolute',
        backgroundColor: colors.BORDER_COLOR,
        opacity: 0.7,
        height: '100%',
        width: '100%',
        flex: 1,
    }
});

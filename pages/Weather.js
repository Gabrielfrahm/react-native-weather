import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from '../components/WeatherInfo';
import UnitsPicker from '../components/UnitsPicker';
import ReloadICon from '../components/ReloadIcon';
import { colors } from '../utils/index';
import WeatherDetails from '../components/WeatherDetails';
import { WEATHER_API_KEY } from 'react-native-dotenv';

const { PRIMARY_COLOR } = colors;
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

export default function Weather({ route }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric'); //imperial f

  useEffect(() => {
    load();
  }, [unitsSystem])

  async function load() {
    const weatherUrl = `${BASE_WEATHER_URL}lat=${route.params.lat}&lon=${route.params.lng}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;
    const response = await fetch(weatherUrl);
    const result = await response.json();
    setCurrentWeather(result);
  }

  if (currentWeather) {

    return (

      <View style={styles.container}>

        <StatusBar style="light" backgroundColor="#ff304f" />
        <View style={styles.main}>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
          <ReloadICon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} />

      </View >

    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <ReloadICon load={load} />
        <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        <StatusBar style="auto" />
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
    justifyContent: 'center',
  },
});

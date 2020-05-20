import React from 'react';
import { StyleSheet, Text, View, SafeAreaView,Button } from 'react-native';
import EntryFormik from './Components/EntryFormik';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Components/HomeScreen'

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="ホーム" component={HomeScreen} />
      <Drawer.Screen name="エントリー" component={EntryFormik} />
    </Drawer.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:20,
  },
});

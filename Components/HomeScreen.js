import React from 'react';
import { StyleSheet, Text, View,Button, SafeAreaView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

class HomeScreen extends React.Component{
    render(){
    return (
        <SafeAreaView style={{margin:10, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{margin:10, flex: 1,alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home</Text>
            <Button
            onPress={() => this.props.navigation.openDrawer()}
            title="Open Navigation"/>
            </View>
            <View style={{margin:10, flex: 3,alignItems: 'center', justifyContent: 'center' }}>
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Vivamus sodales cursus ex at aliquam. Etiam ullamcorper facilisis viverra. 
                    Duis id sollicitudin nisi. Donec imperdiet accumsan nulla luctus egestas. Mauris
                     suscipit bibendum diam. Quisque tincidunt, tellus a mattis imperdiet, tortor augue
                      porta felis, eu dignissim purus sem vitae enim. Donec massa dolor, venenatis sed 
                      tristique sit amet, viverra id est. Interdum et malesuada fames ac ante ipsum primis
                       in faucibus. Curabitur lacus lorem, tincidunt ut consectetur sed, luctus porttitor quam. </Text>
        <Button
            onPress={() => this.props.navigation.navigate('エントリー')}
            title="エントリーへ"
        />
        </View>
        </SafeAreaView>    
    );
    }
}

export default HomeScreen

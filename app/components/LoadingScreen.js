import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';

import Spinner from 'react-native-spinkit';

export default class LoadingScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.isTokenValid();
    }

    isTokenValid = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');

        const redirectTo = accessToken ? 'App' : 'Auth';

        this.props.navigation.navigate(redirectTo);
    };

    render() {
        return (
            <View style={loadingScreenStyles.container}>
                <Spinner isVisible={true} size={100} type="9CubeGrid" color="#841584" />
            </View>
        );
    }
}

const loadingScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
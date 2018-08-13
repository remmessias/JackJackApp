import React, { Component } from 'react';
import { Image, ScrollView, View, Text, StyleSheet } from 'react-native';

import HeaderTitle from '../components/HeaderTitle';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class Info extends Component {
    static navigationOptions = () => {
        return {
            headerTitle: (
                <HeaderTitle icon='information-outline' title='Info' />
            ),
            headerRight: <View></View>
        };
    };

    render() {
        return (
            <ScrollView contentContainerStyle={infoStyles.container}>
                <View style={infoStyles.appLogoView} >
                    <Image style={infoStyles.appLogo} source={require('../assets/img/jackjack1.png')} />
                    <Text style={infoStyles.title}>Jack Jack App</Text>
                </View>
                <View style={infoStyles.footer}>
                    <Text>Version: 1.0.0</Text>
                    <View style={infoStyles.love}>
                        <Text>Made with </Text>
                        <Icon name="heart" />
                        <Text> in Campinas</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const infoStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    appLogoView: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 50
    },
    appLogo: {
        resizeMode: 'contain',
    },
    title: {
        marginTop: 10,
        fontFamily: 'sans-serif-thin',
        fontSize: 30,
    },
    footer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 30
    },
    love: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    companyLogo: {
        height: 50,
        resizeMode: 'contain'
    }
});
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, Image, TouchableHighlight, StyleSheet, Platform } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MyStorage from '../libs/Storage';

export default class SideMenu extends Component {

    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    async onLogout() {
        await new MyStorage().deleteAccess();
        this.props.navigation.navigate('Auth');
    }

    render() {
        return (
            <ScrollView contentContainerStyle={sideMenuStyles.container}>
                <View style={sideMenuStyles.header}>
                    <Image style={sideMenuStyles.image} source={require('../assets/img/jackjack1.png')} />
                    <Text style={sideMenuStyles.title}>Jack Jack App</Text>
                </View>
                <View style={sideMenuStyles.content}>
                    <TouchableHighlight underlayColor="rgba(0,0,0,0.05)" onPress={this.navigateToScreen('Main')}>
                        <View style={[sideMenuStyles.row]}>
                            <Icon style={sideMenuStyles.rowIcon} name="home-outline" size={24} color='#9ea0a3' />
                            <Text style={sideMenuStyles.text}>Home</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={sideMenuStyles.lineContainer}>
                    <View style={sideMenuStyles.line} />
                </View>
                <View style={sideMenuStyles.footer}>
                    <TouchableHighlight underlayColor="rgba(0,0,0,0.05)" onPress={this.navigateToScreen('Info')}>
                        <View style={sideMenuStyles.rowIcon} style={sideMenuStyles.row}>
                            <Icon style={sideMenuStyles.rowIcon} name="information-outline" size={24} color='#9ea0a3' />
                            <Text style={sideMenuStyles.text}>Info</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="rgba(0,0,0,0.05)" onPress={() => { this.onLogout() }}>
                        <View style={sideMenuStyles.rowIcon} style={sideMenuStyles.row}>
                            <Icon style={sideMenuStyles.rowIcon} name="close" size={24} color='#9ea0a3' />
                            <Text style={sideMenuStyles.text}>Logout</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }
}

export const sideMenuStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexGrow: 0.3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#252b32'
    },
    content: {
        backgroundColor: '#ffffff',
    },
    footer: {
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },
    image: {
        borderRadius: 64,
        width: 250,
        resizeMode: 'contain'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        paddingLeft: 35
    },
    rowIcon: {
        paddingRight: 20
    },
    text: {
        fontSize: 14,
        color: '#9ea0a3',
        fontWeight: '100',
        fontFamily: !Platform.OS === 'android' ? 'Helvetica' : 'sans-serif-condensed'
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#edeff2'
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 25,
        marginRight: 25,
    },
    title: {
        marginTop: 10,
        fontFamily: 'sans-serif-thin',
        fontSize: 30,
        color: '#9ea0a3'
    }
});

SideMenu.propTypes = {
    navigation: PropTypes.object
};
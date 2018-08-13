import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HeaderTitle extends Component {
    render() {
        const { title, icon } = this.props;
        return (
            <View style={headerTitleStyles.headerTitle}>
                <Icon name={icon} size={25} color="#6d6d6d" />
                <Text style={headerTitleStyles.headerTitleStyle}>{title}</Text>
            </View>
        );
    }
}

const headerTitleStyles = StyleSheet.create({
    headerTitle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitleStyle: {
        fontFamily: 'sans-serif-thin',
        fontSize: 20,
        color: '#6d6d6d'
    }
});
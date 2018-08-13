import React from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import MyStorage from '../libs/Storage';

import HeaderTitle from '../components/HeaderTitle';

export default class Filter extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <HeaderTitle icon='filter' title='Filter' />
            ),
            headerRight: (<View></View>)
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            filterByTitle: this.props.navigation.getParam('filterByTitle')
        }
    }

    applyFilters() {
        const applyFilters = this.props.navigation.getParam('applyFilters');
        applyFilters(this.state.filterByTitle)
        this.props.navigation.goBack();
    }

    clearFilters() {
        const applyFilters = this.props.navigation.getParam('applyFilters');
        applyFilters('')
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={{ fontSize: 20 }}>Filter by Title</Text>
                    <TextInput style={styles.input} placeholder="Filter by title" value={this.state.filterByTitle} onChangeText={(filterByTitle) => this.setState({ filterByTitle })} />
                </View>
                <View style={styles.buttons}>
                    <View>
                        <Button
                            onPress={() => { this.applyFilters() }}
                            title="Apply Filters"
                            color="#841584"
                            accessibilityLabel="Apply Filters"
                        />
                    </View>
                    <View style={{ marginTop: 10}}>
                        <Button
                            onPress={() => { this.clearFilters() }}
                            title="Clear Filters"
                            color="#841584"
                            accessibilityLabel="Clear Filters"
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        padding: 5,
        marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd'
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between'
    },
    buttons: {

    }
})
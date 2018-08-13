import React from 'react';

import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

import Rating from '../components/Rating';
import HeaderTitle from '../components/HeaderTitle';

import MyStorage from '../libs/Storage';

export default class NewTask extends React.Component {
    state = {
        title: '',
        description: '',
        rating: 1
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <HeaderTitle icon='notebook' title='New Task' />
            ),
            headerRight: (
                <View></View>
            )
        };
    };

    saveTask = async () => {
        const appendToTasks = this.props.navigation.getParam('appendToTasks');
        const task = this.state;

        const savedTask = await new MyStorage().add(task);

        appendToTasks(savedTask);

        this.props.navigation.goBack();
    }

    render() {
        return (
            <View>
                <View style={{ padding: 20 }}>
                    <TextInput style={styles.input} placeholder="Title" onChangeText={(text) => this.setState({ title: text })} />
                    <TextInput style={styles.input} placeholder="Description" onChangeText={(text) => this.setState({ description: text })} />
                    <View style={styles.rating}>
                        <Text style={styles.textRating}>Rating</Text>
                        <Rating ratValue={this.state.rating} onPressRating={(index, value) => this.setState({ rating: value })} />
                    </View>
                    <Button
                        onPress={this.saveTask}
                        title="Save"
                        color="#841584"
                        accessibilityLabel="Save"
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        padding: 5,
        marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd'
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    textRating: {
        marginRight: 5
    }
});
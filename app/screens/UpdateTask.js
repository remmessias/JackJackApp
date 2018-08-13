import React from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import MyStorage from '../libs/Storage';

import HeaderTitle from '../components/HeaderTitle';
import Rating from '../components/Rating';

export default class UpdateTask extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <HeaderTitle icon='pencil' title='Edit Task' />
            ),
            headerRight: (<View></View>)
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.navigation.getParam('task').title,
            description: this.props.navigation.getParam('task').description,
            rating: this.props.navigation.getParam('task').rating
        }
    }

    updateTask = async () => {
        const updateTasks = this.props.navigation.getParam('updateTasks');
        const task = this.state;

        const updatedTask = await new MyStorage().update(this.props.navigation.getParam('task').id, task);

        updateTasks(updatedTask);

        this.props.navigation.goBack();
    }

    render() {
        return (
            <View>
                <View style={{ padding: 20 }}>
                    <TextInput style={styles.input} placeholder="Title" value={this.state.title} onChangeText={(text) => this.setState({ title: text })} />
                    <TextInput style={styles.input} placeholder="Description" value={this.state.description} onChangeText={(text) => this.setState({ description: text })} />
                    <View style={styles.rating}>
                        <Text style={styles.textRating}>Rating</Text>
                        <Rating ratValue={this.state.rating} onPressRating={(index, value) => this.setState({ rating: value })} />
                    </View>
                    <Button
                        onPress={this.updateTask}
                        title="Edit"
                        color="#841584"
                        accessibilityLabel="Edit"
                    />
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
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    textRating: {
        marginRight: 5
    }

})
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MyStorage from '../libs/Storage';

import HeaderTitle from '../components/HeaderTitle';

export default class TaskDetails extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <HeaderTitle icon='magnify' title='Task Details' />
            ),
            headerRight: (<View></View>)
        };
    };

    deleteTask = async () => {
        const updateTasks = this.props.navigation.getParam('updateTasks');
        const task = this.props.navigation.getParam('task', {});

        const tasks = await new MyStorage().destroy(task.id);

        updateTasks(tasks);

        this.props.navigation.goBack();
    }

    render() {
        const task = this.props.navigation.getParam('task', {});
        return (
            <View style={styles.container}>
                <View style={styles.details}>
                    <Text style={{ fontSize: 30 }}>{task.title}</Text>
                    <Text style={{ fontSize: 18 }}>{task.description}</Text>
                </View>
                <Button
                    onPress={this.deleteTask}
                    title="Delete"
                    color="#841584"
                    accessibilityLabel="Delete"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent:"space-between"
    },
    details: {
        marginBottom: 20
    }
})